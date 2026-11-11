"use client";

import Gate from "./Gate";
import Hero from "./Hero";
import Invitation from "./Invitation";
import Events from "./Events";
import Venue from "./Venue";
import Families from "./Families";
import Moments from "./Moments";
import ShareJoy from "./ShareJoy";
import Footer from "./Footer";
import { useSide } from "@/lib/SideContext";

/** Every section, filled from the card of the side picked in the navbar. */
export default function Site() {
  const { data: d } = useSide();
  return (
    <>
      <Gate data={d} />
      <Hero data={d} />
      <main className="wrap">
        <Invitation data={d} />
        <Events days={d.days} events={d.events} />
        <Families data={d} />
        <Moments moments={d.moments} />
        <Venue data={d} />
        <ShareJoy data={d} />
      </main>
      <Footer data={d} />
    </>
  );
}
