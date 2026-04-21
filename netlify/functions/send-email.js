const RESEND_ENDPOINT = "https://api.resend.com/emails";

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "content-type",
      "access-control-allow-methods": "POST, OPTIONS",
    },
    body: JSON.stringify(body),
  };
}

function escapePdfText(value = "") {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "");
}

function formatMoney(value = 0) {
  const number = Number(value || 0);
  return `$${number.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(value = "") {
  if (!value) return "To confirm";
  const date = new Date(`${String(value).slice(0, 10)}T12:00:00`);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" });
}

function wrapText(value = "", maxLength = 58) {
  const words = String(value || "").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function htmlToText(html = "") {
  return String(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h1|h2|h3|li|tr)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .trim();
}

function createPdfBase64(stream) {
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return Buffer.from(pdf).toString("base64");
}

function createDocumentPdfBase64({ documentType = "document", documentNumber = "", documentData = {}, business = {}, fallbackText = "" }) {
  const isInvoice = documentType === "invoice";
  const businessName = String(business.name || "PayDay Tradie").trim();
  const businessLines = [
    business.abn ? `ABN ${business.abn}` : "",
    business.address || "",
    business.email || "",
    business.phone || "",
  ].filter(Boolean);
  const clientName = documentData.client || documentData.clientName || "Client";
  const clientLines = [
    documentData.clientEmail || "",
    documentData.clientPhone || "",
    documentData.siteAddress || "",
  ].filter(Boolean);
  const jobName = documentData.job || documentData.jobName || `${isInvoice ? "Invoice" : "Quote"} works`;
  const issueDate = documentData.issueDate || documentData.createdAt || new Date().toISOString();
  const dueOrExpiryDate = isInvoice ? documentData.dueDate : documentData.expiryDate;
  const lineItems = (documentData.lineItems || []).length
    ? documentData.lineItems
    : [
      { description: documentData.labourItems || "Labour", qty: 1, rate: Number(documentData.labourAmount || 0), total: Number(documentData.labourAmount || 0) },
      { description: documentData.materialItems || "Materials", qty: 1, rate: Number(documentData.materialAmount || documentData.materialsAmount || 0), total: Number(documentData.materialAmount || documentData.materialsAmount || 0) },
    ].filter((item) => Number(item.total || item.rate || 0) > 0 || item.description);
  const subtotal = lineItems.reduce((sum, item) => sum + Number(item.total || Number(item.qty || 0) * Number(item.rate || 0)), 0);
  const gst = Number(documentData.gst || 0);
  const total = Number(documentData.amount || documentData.total || subtotal + gst);
  const title = isInvoice ? "INVOICE" : "QUOTE";

  const commands = [
    "1 1 1 rg 0 0 612 842 re f",
    "0.05 0.24 0.17 rg 0 772 612 70 re f",
    "0.92 0.98 0.94 rg 390 772 172 70 re f",
    "0.05 0.24 0.17 rg 390 752 172 20 re f",
  ];

  const text = (value, x, y, size = 10, font = "F1", color = "0.08 0.10 0.12") => {
    commands.push(`BT /${font} ${size} Tf ${color} rg ${x} ${y} Td (${escapePdfText(value)}) Tj ET`);
  };
  const line = (x1, y1, x2, y2, color = "0.83 0.88 0.85", width = 1) => {
    commands.push(`${color} RG ${width} w ${x1} ${y1} m ${x2} ${y2} l S`);
  };
  const box = (x, y, w, h, fill = "0.98 0.99 0.98", stroke = "0.83 0.88 0.85") => {
    commands.push(`${fill} rg ${x} ${y} ${w} ${h} re f ${stroke} RG 1 w ${x} ${y} ${w} ${h} re S`);
  };

  text(businessName, 50, 812, 18, "F2", "1 1 1");
  text(businessLines[0] || "Business details", 50, 792, 9, "F1", "0.82 0.92 0.86");
  text(title, 410, 812, 22, "F2", "0.05 0.24 0.17");
  text(documentNumber, 410, 792, 11, "F2", "0.05 0.24 0.17");

  box(50, 650, 235, 88);
  text("FROM", 66, 716, 8, "F2", "0.35 0.43 0.39");
  text(businessName, 66, 700, 12, "F2");
  businessLines.slice(0, 4).forEach((item, index) => text(item, 66, 684 - index * 13, 9, "F1", "0.25 0.31 0.28"));

  box(327, 650, 235, 88);
  text("BILL TO", 343, 716, 8, "F2", "0.35 0.43 0.39");
  text(clientName, 343, 700, 12, "F2");
  clientLines.slice(0, 4).forEach((item, index) => text(item, 343, 684 - index * 13, 9, "F1", "0.25 0.31 0.28"));

  box(50, 575, 512, 50, "0.94 0.97 0.95");
  text("JOB / DESCRIPTION", 66, 604, 8, "F2", "0.35 0.43 0.39");
  text(jobName, 66, 587, 13, "F2");
  text(isInvoice ? "Issued" : "Created", 355, 604, 8, "F2", "0.35 0.43 0.39");
  text(formatDate(issueDate), 355, 587, 10);
  text(isInvoice ? "Due" : "Valid until", 452, 604, 8, "F2", "0.35 0.43 0.39");
  text(formatDate(dueOrExpiryDate), 452, 587, 10);

  commands.push("0.05 0.24 0.17 rg 50 532 512 28 re f");
  text("Description", 66, 542, 9, "F2", "1 1 1");
  text("Qty", 365, 542, 9, "F2", "1 1 1");
  text("Rate", 420, 542, 9, "F2", "1 1 1");
  text("Total", 500, 542, 9, "F2", "1 1 1");

  let y = 504;
  lineItems.slice(0, 8).forEach((item, index) => {
    const totalLine = Number(item.total || Number(item.qty || 0) * Number(item.rate || 0));
    if (index % 2 === 0) commands.push("0.98 0.99 0.98 rg 50 " + (y - 10) + " 512 34 re f");
    const descriptionLines = wrapText(item.description || "Item", 44).slice(0, 2);
    text(descriptionLines[0], 66, y, 9, "F1");
    if (descriptionLines[1]) text(descriptionLines[1], 66, y - 12, 8, "F1", "0.35 0.43 0.39");
    text(String(item.qty || 1), 365, y, 9);
    text(formatMoney(item.rate || totalLine), 420, y, 9);
    text(formatMoney(totalLine), 500, y, 9, "F2");
    line(50, y - 18, 562, y - 18);
    y -= 38;
  });

  const totalsX = 360;
  const totalsY = Math.max(150, y - 18);
  box(totalsX, totalsY, 202, 94, "0.98 0.99 0.98");
  text("Subtotal", totalsX + 16, totalsY + 68, 10);
  text(formatMoney(subtotal), totalsX + 122, totalsY + 68, 10, "F2");
  text("GST", totalsX + 16, totalsY + 44, 10);
  text(formatMoney(gst), totalsX + 122, totalsY + 44, 10, "F2");
  commands.push("0.05 0.24 0.17 rg " + totalsX + " " + totalsY + " 202 28 re f");
  text("Total", totalsX + 16, totalsY + 9, 11, "F2", "1 1 1");
  text(formatMoney(total), totalsX + 122, totalsY + 9, 11, "F2", "1 1 1");

  const notes = documentData.notes || documentData.description || fallbackText;
  if (notes) {
    text("Notes", 50, 166, 10, "F2", "0.05 0.24 0.17");
    wrapText(notes, 74).slice(0, 4).forEach((noteLine, index) => text(noteLine, 50, 148 - index * 13, 9, "F1", "0.25 0.31 0.28"));
  }

  text("Payment", 50, 91, 10, "F2", "0.05 0.24 0.17");
  text(`${documentData.paymentMethod || "Bank transfer"} / ${documentData.paymentTerms || business.paymentTerms || "Payment terms as agreed"}`, 50, 75, 9, "F1", "0.25 0.31 0.28");
  text("Thank you for your business.", 50, 45, 10, "F2", "0.05 0.24 0.17");

  return createPdfBase64(commands.join("\n"));
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(204, {});
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Use POST to send email." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    return json(503, { error: "Email service is not configured. Add RESEND_API_KEY and EMAIL_FROM in Netlify." });
  }

  let payload = {};
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    return json(400, { error: "Invalid email payload." });
  }

  const to = String(payload.to || "").trim();
  const subject = String(payload.subject || "").trim();
  const text = String(payload.text || "").trim();
  const html = String(payload.html || "").trim();
  const documentType = String(payload.documentType || "document").trim();
  const documentNumber = String(payload.documentNumber || "document").trim();
  const attachmentName = String(payload.attachmentName || `${documentNumber}.pdf`).replace(/[^\w.\- ]/g, "");
  const business = payload.business || {};
  const businessName = String(business.name || "PayDay Tradie").trim();
  const replyTo = String(business.email || "").trim();

  if (!to || !subject || (!text && !html)) {
    return json(400, { error: "Missing recipient, subject, or message body." });
  }

  const documentText = String(payload.documentText || "").trim() || htmlToText(payload.documentHtml || "");
  const pdfBase64 = createDocumentPdfBase64({
    documentType,
    documentNumber,
    documentData: payload.documentData || {},
    business,
    fallbackText: documentText || text,
  });

  const resendPayload = {
    from,
    to: [to],
    subject,
    text,
    html: html || `<p>${text.replace(/\n/g, "<br>")}</p>`,
    attachments: [
      {
        filename: attachmentName.endsWith(".pdf") ? attachmentName : `${attachmentName}.pdf`,
        content: pdfBase64,
      },
    ],
  };

  if (replyTo) {
    resendPayload.reply_to = replyTo;
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(resendPayload),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.error) {
    return json(response.status || 502, { error: result.error?.message || result.message || "Email provider rejected the message." });
  }

  return json(200, {
    id: result.id,
    status: "sent",
  });
};
