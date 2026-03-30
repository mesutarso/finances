"use client";

import { useEffect, useRef, useState } from "react";
import {
  CSRF_COOKIE_NAME,
  CSRF_FORM_FIELD_NAME,
} from "@/lib/security/csrf-constants";

function readCookie(name: string): string {
  if (typeof document === "undefined") {
    return "";
  }

  const target = `${name}=`;
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(target));

  return cookie ? decodeURIComponent(cookie.slice(target.length)) : "";
}

interface FormGuardFieldsProps {
  honeypotName: string;
  onTokenChange?: (token: string) => void;
}

export default function FormGuardFields({
  honeypotName,
  onTokenChange,
}: FormGuardFieldsProps) {
  const [csrfToken, setCsrfToken] = useState("");
  const onTokenChangeRef = useRef(onTokenChange);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    const token = readCookie(CSRF_COOKIE_NAME);
    setCsrfToken(token);
    onTokenChangeRef.current?.(token);
  }, []);

  return (
    <>
      <input
        type="hidden"
        name={CSRF_FORM_FIELD_NAME}
        value={csrfToken}
        readOnly
      />
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={honeypotName}>Ne pas remplir ce champ</label>
        <input
          id={honeypotName}
          name={honeypotName}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
    </>
  );
}
