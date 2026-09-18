import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import device from "../assets/device.png";

gsap.registerPlugin(ScrollTrigger);

export default function FloatingWatch() {
  const outerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    let ctx = null;

    const init = () => {
      const circleEl  = document.getElementById("watch-circle");
      const landingEl = document.getElementById("watch-landing");
      if (!circleEl || !landingEl) return;

      /* ──────────────────────────────────────────────────────────────
         Measure both anchors in VIEWPORT space at scroll = 0.
         Since watch is position:fixed, x/y are viewport coordinates.
      ────────────────────────────────────────────────────────────── */
      const cRect = circleEl.getBoundingClientRect();
      const lRect = landingEl.getBoundingClientRect();

      const halfW = outer.offsetWidth  / 2;
      const halfH = outer.offsetHeight / 2;

      // ── START: center of hero "PRAESIDIUM SMART BAND" circle ──
      const startX = cRect.left + cRect.width  / 2 - halfW;
      const startY = cRect.top  + cRect.height / 2 - halfH;

      // ── END: center of "DEVICE IN-FIELD VIEW" landing zone ──
      // When safety section's center hits viewport center, landing's
      // viewport y = window.innerHeight / 2.
      // x never changes with vertical scroll.
      const endX = lRect.left + lRect.width  / 2 - halfW;
      const endY = window.innerHeight / 2 - halfH + 20;

      /* ── Curve control: arc sweeps RIGHT then curves back to land ──
         The arc midpoint goes to the RIGHT of the end position so
         the path feels like a natural flowing right-to-land curve.  */
      const arcPush = (endX - startX) * 0.45 + 140;
      const midX    = endX + arcPush;
      const midY    = startY + (endY - startY) * 0.48;

      /* ── Snap watch to hero circle ── */
      gsap.set(outer, {
        position: "fixed",
        top:  0,
        left: 0,
        x: startX,
        y: startY,
        rotation: 0,
        scale: 1,
        zIndex: 45,
        force3D: true,
      });

      ctx = gsap.context(() => {
        /* ── Scroll-linked curved timeline ──────────────────────────
           scrub: 0.8 → watch moves in near-real-time with scroll.
           The timeline has 2 phases forming the arc curve.

           trigger range:
             start  = very top of page (#home top)
             end    = when safety section center hits viewport center

           Beyond the end point: watch stays at endX/endY (locked).
           Scrolling back into the range: watch reverses the curve.
        ─────────────────────────────────────────────────────────── */
        const tl = gsap.timeline();

        // Phase 1 — sweep RIGHT (power2.in = natural acceleration outward)
        tl.to(outer, {
          x: midX,
          y: midY,
          rotation: 16,
          scale: 0.93,
          ease: "power2.in",
          duration: 0.44,
        });

        // Phase 2 — curve back LEFT + DOWN into landing ring (power3.out = smooth decelerate)
        tl.to(outer, {
          x: endX,
          y: endY,
          rotation: -4,
          scale: 0.88,
          ease: "power3.out",
          duration: 0.56,
        });

        ScrollTrigger.create({
          animation: tl,
          trigger: "#home",
          start: "top top",
          endTrigger: "#safety",
          end: "center center",
          scrub: 0.8,               // smooth scroll-sync, nearly no lag
          invalidateOnRefresh: true, // recalculate on window resize
        });
      });
    };

    const timer = setTimeout(init, 80);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    /* Outer: GSAP scroll-controls x/y/rotation/scale via ScrollTrigger */
    <div
      ref={outerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 45,
        willChange: "transform",
      }}
    >
      {/*
        Inner: pure CSS float animation.
        Uses its OWN transform (translateY only) on a CHILD element.
        Completely separate from GSAP — zero interference.
      */}
      <div className="watch-float">
        <img
          src={device}
          alt="PRAESIDIUM Watch"
          style={{ display: "block" }}
          className="w-[250px] md:w-[280px] lg:w-[300px] drop-shadow-[0_0_50px_rgba(6,182,212,0.6)]"
        />
      </div>
    </div>
  );
}