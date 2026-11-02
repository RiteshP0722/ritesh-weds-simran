"use client";

import { useEffect, useState } from "react";
import { GUEST_PARAM } from "./utils";

/** The guest's name from a personalised link (?to=Name), or "" on the plain link. */
export function useGuestName(): string {
  const [name, setName] = useState("");

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get(GUEST_PARAM) ?? "";
    setName(raw.replace(/\s+/g, " ").trim().slice(0, 60));
  }, []);

  return name;
}
