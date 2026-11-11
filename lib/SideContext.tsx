"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { sides } from "@/data/wedding";
import { SIDE_PARAM } from "@/lib/utils";
import type { Side, WeddingData } from "@/types/wedding";

interface SideContextType {
  side: Side;
  setSide: (side: Side) => void;
  /** The invitation card for the current side */
  data: WeddingData;
}

const STORAGE_KEY = "wedding-side";

const SideContext = createContext<SideContextType>({ side: "groom", setSide: () => {}, data: sides.groom });

/**
 * Which family's card is shown: वर पक्ष (groom) or वधू पक्ष (bride).
 * A link with ?side=bride / ?side=groom wins; otherwise the guest's last choice; otherwise the groom's card.
 */
export function SideProvider({ children }: { children: React.ReactNode }) {
  const [side, setSideState] = useState<Side>("groom");

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get(SIDE_PARAM);
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage blocked */
    }
    const initial = fromUrl === "bride" || fromUrl === "groom" ? fromUrl : saved === "bride" ? "bride" : "groom";
    setSideState(initial);
  }, []);

  const setSide = (next: Side) => {
    setSideState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage blocked */
    }
    // Keep the address bar in step so a copied link opens the same card
    const url = new URL(window.location.href);
    if (next === "bride") url.searchParams.set(SIDE_PARAM, "bride");
    else url.searchParams.delete(SIDE_PARAM);
    window.history.replaceState(null, "", url);
  };

  return <SideContext.Provider value={{ side, setSide, data: sides[side] }}>{children}</SideContext.Provider>;
}

export const useSide = () => useContext(SideContext);
