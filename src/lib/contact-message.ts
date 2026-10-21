export type ContactMessageFields = {
  name: string; email: string; subject: string; message: string; consent: boolean;
};

export const emptyContactMessage: ContactMessageFields = { name: "", email: "", subject: "", message: "", consent: false };

export function validateContactMessage(fields: ContactMessageFields) {
  const errors: string[] = [];
  if (!fields.name.trim() || fields.name.length > 120) errors.push("Enter your name (up to 120 characters).");
  if (!/^[^\s@<>,;\r\n]+@[^\s@<>,;\r\n]+\.[^\s@<>,;\r\n]+$/.test(fields.email.trim()) || fields.email.length > 254) errors.push("Enter a valid email address.");
  if (!fields.subject.trim() || fields.subject.length > 160) errors.push("Enter a subject (up to 160 characters).");
  if (!fields.message.trim() || fields.message.length > 4000) errors.push("Enter your message (up to 4,000 characters).");
  if (!fields.consent) errors.push("Confirm that you agree to share your details with Moshe for this enquiry.");
  return errors;
}

export function buildContactMessage(fields: ContactMessageFields) {
  const line = (value: string) => value.trim().replace(/[\r\n]+/g, " ");
  return {
    subject: `Moshe Barak - Taxi & Travel in Israel / ${line(fields.name)}`,
    body: [
      `Name: ${line(fields.name)}`, `Email: ${line(fields.email)}`, `Subject: ${line(fields.subject)}`,
      "", "Message:", fields.message.trim(), "", "I consent to sharing these details with Moshe Barak for this inquiry.",
    ].join("\n"),
  };
}
