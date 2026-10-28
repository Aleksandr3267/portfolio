import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

export function initSmoothScroll() {
  if (lenis) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  lenis = new Lenis({
    lerp: 0.1, 
    anchors: true, 
    autoRaf: false, 
  });

  lenis.on("scroll", ScrollTrigger.update); 
  gsap.ticker.add((time) => lenis.raf(time * 1000)); 
  gsap.ticker.lagSmoothing(0); 
}


export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
