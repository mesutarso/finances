const DISPOSABLE_EMAIL_DOMAINS = [
  "10minutemail.com",
  "dispostable.com",
  "fakeinbox.com",
  "guerrillamail.com",
  "maildrop.cc",
  "mailinator.com",
  "sharklasers.com",
  "temp-mail.org",
  "tempmail.com",
  "throwawaymail.com",
  "yopmail.com",
];

const RESERVED_EMAIL_DOMAINS = [
  "example.com",
  "example.net",
  "example.org",
  "invalid",
  "localhost",
  "test.com",
];

const BLOCKED_EMAIL_DOMAINS = new Set([
  ...DISPOSABLE_EMAIL_DOMAINS,
  ...RESERVED_EMAIL_DOMAINS,
]);

function sanitizeRawString(value: unknown): string {
  return typeof value === "string" ? value.normalize("NFKC") : "";
}

export function sanitizeSingleLineText(value: unknown): string {
  return sanitizeRawString(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function sanitizeMultilineText(value: unknown): string {
  return sanitizeRawString(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function sanitizePhoneNumber(value: unknown): string {
  return sanitizeRawString(value)
    .replace(/[^\d+()\-\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeEmail(value: unknown): string {
  return sanitizeSingleLineText(value).toLowerCase();
}

export function getEmailDomain(email: string): string {
  return email.split("@")[1]?.toLowerCase() || "";
}

export function isBlockedEmailDomain(email: string): boolean {
  const domain = getEmailDomain(email);

  if (!domain) {
    return true;
  }

  if (
    domain.endsWith(".example") ||
    domain.endsWith(".invalid") ||
    domain.endsWith(".localhost") ||
    domain.endsWith(".local") ||
    domain.endsWith(".test")
  ) {
    return true;
  }

  return Array.from(BLOCKED_EMAIL_DOMAINS).some(
    (blockedDomain) =>
      domain === blockedDomain || domain.endsWith(`.${blockedDomain}`)
  );
}

export function hasFilledHoneypot(
  formData: FormData,
  fieldName: string
): boolean {
  return sanitizeSingleLineText(formData.get(fieldName)).length > 0;
}
