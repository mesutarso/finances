import "server-only";

import { randomBytes, timingSafeEqual } from "node:crypto";
import { CSRF_COOKIE_NAME, CSRF_FORM_FIELD_NAME } from "./csrf-constants";

export function generateCsrfToken(): string {
  return randomBytes(32).toString("hex");
}

export async function validateCsrfToken(formData: FormData): Promise<boolean> {
  const { cookies } = await import("next/headers");
  const submittedToken = formData.get(CSRF_FORM_FIELD_NAME);

  if (typeof submittedToken !== "string" || !submittedToken) {
    return false;
  }

  const cookieStore = await cookies();
  const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;

  if (!cookieToken || cookieToken.length !== submittedToken.length) {
    return false;
  }

  return timingSafeEqual(
    Buffer.from(cookieToken, "utf8"),
    Buffer.from(submittedToken, "utf8")
  );
}
