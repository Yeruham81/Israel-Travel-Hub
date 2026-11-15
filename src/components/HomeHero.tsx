import { HeroCarousel, type HeroSlide } from "@/components/HeroCarousel";
import hJerSm from "@/assets/home/hero-jerusalem-sm-optimized.webp";
import hJerMedium from "@/assets/home/hero-jerusalem-medium.webp";
import hJerLarge from "@/assets/home/hero-jerusalem-large.webp";
import hTaSm from "@/assets/home/hero-tel-aviv-sm-optimized.webp";
import hTaMedium from "@/assets/home/hero-tel-aviv-medium.webp";
import hTaLarge from "@/assets/home/hero-tel-aviv-large.webp";
import hHfSm from "@/assets/home/hero-haifa-sm-optimized.webp";
import hHfMedium from "@/assets/home/hero-haifa-medium.webp";
import hHfLarge from "@/assets/home/hero-haifa-large.webp";
import hMsSm from "@/assets/home/hero-masada-plateau-mobile.webp";
import hMsLarge from "@/assets/home/hero-masada-plateau-desktop.jpg";
import hCsSm from "@/assets/home/hero-caesarea-coast-mobile.webp";
import hCsLarge from "@/assets/home/hero-caesarea-coast-desktop.jpg";
import hGlSm from "@/assets/home/hero-galilee-sm-optimized.webp";
import hGlMedium from "@/assets/home/hero-galilee-medium.webp";
import hGlLarge from "@/assets/home/hero-galilee-large.webp";
import pJaffaDesktop from "@/assets/home/hero-jaffa-harbor-desktop.jpg";
import pJaffaMobile from "@/assets/home/hero-jaffa-harbor-mobile.webp";
import pAkkoDesktop from "@/assets/home/hero-akko-aerial-large.webp";
import pAkkoMobile from "@/assets/home/hero-akko-aerial-sm.webp";
import pEilatDesktop from "@/assets/home/hero-eilat-mountains-large.webp";
import pEilatMobile from "@/assets/home/hero-eilat-mountains-sm.webp";

const heroSlides: HeroSlide[] = [
  { src: hJerLarge, srcSm: hJerSm, srcMedium: hJerMedium, caption: "Jerusalem Old City from the Mount of Olives", alt: "Jerusalem's Old City and the Dome of the Rock seen from the Mount of Olives", pos: "55% center" },
  { src: hTaLarge, srcSm: hTaSm, srcMedium: hTaMedium, caption: "Tel Aviv beach promenade", alt: "The seafront promenade beside the beach in Tel Aviv", pos: "40% center" },
  { src: hHfLarge, srcSm: hHfSm, srcMedium: hHfMedium, caption: "Haifa Bay from the Carmel, Bahá'í Gardens below", alt: "Haifa and Haifa Bay seen from Mount Carmel above the Bahá'í Gardens", pos: "center" },
  { src: hMsLarge, srcSm: hMsSm, srcMedium: hMsLarge, caption: "Masada above the Dead Sea", alt: "Masada’s sunlit desert plateau and ancient fortress high above the Dead Sea", pos: "center", width: 1200, height: 675 },
  { src: hCsLarge, srcSm: hCsSm, srcMedium: hCsLarge, caption: "Caesarea’s Mediterranean coast", alt: "Aerial view of Caesarea’s turquoise Mediterranean coastline and historic coastal landscape", pos: "center", width: 1200, height: 675 },
  { src: hGlLarge, srcSm: hGlSm, srcMedium: hGlMedium, caption: "Tiberias and the Sea of Galilee", alt: "Tiberias on the hillside above the Sea of Galilee, seen from the water", pos: "center" },
  // High-resolution Google Drive sources, recompressed as distinct desktop/mobile WebP variants.
  { src: pJaffaDesktop, srcSm: pJaffaMobile, srcMedium: pJaffaDesktop, caption: "Old Jaffa harbour", alt: "Fishing boats in the historic harbour below Old Jaffa’s stone waterfront and skyline", pos: "center", width: 1200, height: 675 },
  { src: pAkkoDesktop, srcSm: pAkkoMobile, srcMedium: pAkkoDesktop, caption: "Akko Old City and harbour", alt: "Aerial view of Akko’s historic walled city, sea wall and marina along the Mediterranean coast", pos: "center 68%", width: 2048, height: 848 },
  { src: pEilatDesktop, srcSm: pEilatMobile, srcMedium: pEilatDesktop, caption: "Eilat Mountains and the gulf", alt: "Rocky mountains around Eilat overlooking the Gulf of Aqaba", pos: "center", width: 1536, height: 432 },
];

/** Rendered by the root layout above the shared sidebar/content columns. */
export function HomeHero() {
  return (
    <section aria-labelledby="home-title">
      <HeroCarousel slides={heroSlides}>
        <div className="max-w-5xl px-6 pb-8 pt-16 text-white md:px-12 md:pb-8 md:pt-16" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.76), 0 4px 18px rgba(0,0,0,0.45)" }}>
          <p className="text-xs font-semibold uppercase tracking-[0.17em] opacity-95">Your journey starts here</p>
          <h1 id="home-title" className="mt-4 max-w-2xl text-4xl leading-[1.08] md:text-5xl lg:max-w-none lg:whitespace-nowrap lg:text-[clamp(3rem,3.65vw,3.25rem)]">Discover Israel, Travel Smarter</h1>
          <p className="mt-3 max-w-2xl text-lg font-medium leading-relaxed opacity-100 md:text-xl">
            From airport arrivals and getting around to memorable day trips, places to stay and must-see sights, find practical local advice to make the most of your time in Israel.
          </p>
        </div>
      </HeroCarousel>
    </section>
  );
}
