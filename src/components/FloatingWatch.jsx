import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import device from "../assets/device.png";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export default function FloatingWatch() {
  const outerRef = useRef(null);
  const { isCute } = useTheme();

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    let ctx = null;

    const init = () => {
      const circleEl  = document.getElementById("watch-circle");
      const landingEl = document.getElementById("watch-landing");
      if (!circleEl || !landingEl) return;

      const cRect = circleEl.getBoundingClientRect();
      const lRect = landingEl.getBoundingClientRect();

      const halfW = outer.offsetWidth  / 2;
      const halfH = outer.offsetHeight / 2;

      const startX = cRect.left + cRect.width  / 2 - halfW;
      const startY = cRect.top  + cRect.height / 2 - halfH;

      const endX = lRect.left + lRect.width  / 2 - halfW;
      const endY = window.innerHeight / 2 - halfH + 20;

      const arcPush = (endX - startX) * 0.45 + 140;
      const midX    = endX + arcPush;
      const midY    = startY + (endY - startY) * 0.48;

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
        const tl = gsap.timeline();

        tl.to(outer, {
          x: midX,
          y: midY,
          rotation: 16,
          scale: 0.93,
          ease: "power2.in",
          duration: 0.44,
        });

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
          scrub: 0.8,
          invalidateOnRefresh: true,
        });
      });
    };

    const timer = setTimeout(init, 80);

    // Re-initialize on viewport resize
    const handleResize = () => {
      ctx?.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      setTimeout(init, 100);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
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
      <div className="watch-float">
        <img
          src={device}
          alt="PRAESIDIUM Watch"
          style={{ display: "block" }}
          className={`w-[160px] sm:w-[250px] md:w-[280px] lg:w-[300px] transition-all duration-500 ${
            isCute 
              ? "drop-shadow-[0_0_45px_rgba(244,63,94,0.55)]" 
              : "drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] filter brightness-105"
          }`}
        />
      </div>
    </div>
  );
}