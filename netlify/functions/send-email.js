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

function createSimplePdfBase64({ title = "PayDay Tradie document", businessName = "", text = "" }) {
  const lines = [
    businessName,
    title,
    "",
    ...String(text || "").split(/\r?\n|(?<=\.)\s+/),
  ]
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 46);

  const streamLines = ["BT", "/F1 12 Tf", "50 790 Td", "14 TL"];
  lines.forEach((line, index) => {
    const safeLine = escapePdfText(line.slice(0, 95));
    streamLines.push(index === 0 ? `/F1 16 Tf (${safeLine}) Tj` : `(${safeLine}) Tj`);
    streamLines.push("T*");
    if (index === 0) streamLines.push("/F1 12 Tf");
  });
  streamLines.push("ET");
  const stream = streamLines.join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
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
  const pdfBase64 = createSimplePdfBase64({
    title: `${documentType.toUpperCase()} ${documentNumber}`,
    businessName,
    text: documentText || text,
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
