import { HeroCarousel, type HeroSlide } from "@/components/HeroCarousel";
import hJerSm from "@/assets/home/hero-jerusalem-sm-optimized.webp";
import hJerMedium from "@/assets/home/hero-jerusalem-medium.webp";
import hJerLarge from "@/assets/home/hero-jerusalem-large.webp";
import hTaSm from "@/assets/home/hero-tel-aviv-sm-optimized.webp";
import hTaMedium from "@/assets/home/hero-tel-aviv-medium.webp";
import hTaLarge from "@/assets/home/hero-tel-aviv-large.webp";
import pAkkoDesktop from "@/assets/home/hero-akko-aerial-large.webp";
import pAkkoMobile from "@/assets/home/hero-akko-aerial-sm.webp";
import pHaifaGardensLarge from "@/assets/home/hero-refresh-haifa-gardens-large.webp";
import pHaifaGardensMedium from "@/assets/home/hero-refresh-haifa-gardens-medium.webp";
import pHaifaGardensMobile from "@/assets/home/hero-refresh-haifa-gardens-mobile.webp";
import pMasadaDeadSeaLarge from "@/assets/home/hero-refresh-masada-dead-sea-large.webp";
import pMasadaDeadSeaMedium from "@/assets/home/hero-refresh-masada-dead-sea-medium.webp";
import pMasadaDeadSeaMobile from "@/assets/home/hero-refresh-masada-dead-sea-mobile.webp";
import pCaesareaCoastLarge from "@/assets/home/hero-refresh-caesarea-coast-large.webp";
import pCaesareaCoastMedium from "@/assets/home/hero-refresh-caesarea-coast-medium.webp";
import pCaesareaCoastMobile from "@/assets/home/hero-refresh-caesarea-coast-mobile.webp";
import pDeadSeaSaltLarge from "@/assets/home/hero-refresh-dead-sea-salt-large.webp";
import pDeadSeaSaltMedium from "@/assets/home/hero-refresh-dead-sea-salt-medium.webp";
import pDeadSeaSaltMobile from "@/assets/home/hero-refresh-dead-sea-salt-mobile.webp";
import pJaffaPortLarge from "@/assets/home/hero-refresh-jaffa-port-large.webp";
import pJaffaPortMedium from "@/assets/home/hero-refresh-jaffa-port-medium.webp";
import pJaffaPortMobile from "@/assets/home/hero-refresh-jaffa-port-mobile.webp";
import pEilatMountainsLarge from "@/assets/home/hero-refresh-eilat-mountains-large.webp";
import pEilatMountainsMedium from "@/assets/home/hero-refresh-eilat-mountains-medium.webp";
import pEilatMountainsMobile from "@/assets/home/hero-refresh-eilat-mountains-mobile.webp";
import pRamonCraterLarge from "@/assets/home/hero-refresh-ramon-crater-large.webp";
import pRamonCraterMedium from "@/assets/home/hero-refresh-ramon-crater-medium.webp";
import pRamonCraterMobile from "@/assets/home/hero-refresh-ramon-crater-mobile.webp";
import pTelAvivSaronaLarge from "@/assets/home/hero-refresh-tel-aviv-sarona-large.webp";
import pTelAvivSaronaMedium from "@/assets/home/hero-refresh-tel-aviv-sarona-medium.webp";
import pTelAvivSaronaMobile from "@/assets/home/hero-refresh-tel-aviv-sarona-mobile.webp";
import pJerusalemJaffaGateLarge from "@/assets/home/hero-refresh-jerusalem-jaffa-gate-large.webp";
import pJerusalemJaffaGateMedium from "@/assets/home/hero-refresh-jerusalem-jaffa-gate-medium.webp";
import pJerusalemJaffaGateMobile from "@/assets/home/hero-refresh-jerusalem-jaffa-gate-mobile.webp";

export const heroSlides: HeroSlide[] = [
  { src: hJerLarge, srcSm: hJerSm, srcMedium: hJerMedium, caption: "Jerusalem Old City from the Mount of Olives", alt: "Jerusalem's Old City and the Dome of the Rock seen from the Mount of Olives", pos: "55% center" },
  { src: hTaLarge, srcSm: hTaSm, srcMedium: hTaMedium, caption: "Tel Aviv beach promenade", alt: "The seafront promenade beside the beach in Tel Aviv", pos: "40% center" },
  { src: pHaifaGardensLarge, srcSm: pHaifaGardensMobile, srcMedium: pHaifaGardensMedium, caption: "Haifa and the Bahá’í Gardens", alt: "The Bahá’í Gardens, Haifa city and the Mediterranean port seen from Mount Carmel", pos: "center", width: 1680, height: 840 },
  { src: pMasadaDeadSeaLarge, srcSm: pMasadaDeadSeaMobile, srcMedium: pMasadaDeadSeaMedium, caption: "Masada above the Dead Sea", alt: "Aerial view of Masada's ancient fortress on a sunlit cliff overlooking the Dead Sea", pos: "center", width: 1680, height: 840 },
  { src: pCaesareaCoastLarge, srcSm: pCaesareaCoastMobile, srcMedium: pCaesareaCoastMedium, caption: "Caesarea’s ancient harbour", alt: "Aerial view of the ancient harbour, turquoise Mediterranean water and shoreline near Caesarea", pos: "center", width: 1680, height: 840 },
  { src: pDeadSeaSaltLarge, srcSm: pDeadSeaSaltMobile, srcMedium: pDeadSeaSaltMedium, caption: "Dead Sea salt formations at sunrise", alt: "White salt formations in shallow turquoise Dead Sea water under an orange sunrise sky", pos: "center", width: 1680, height: 840 },
  { src: pJaffaPortLarge, srcSm: pJaffaPortMobile, srcMedium: pJaffaPortMedium, caption: "Old Jaffa and its harbour", alt: "Aerial view of historic Old Jaffa stone buildings, the harbour and the Mediterranean shoreline", pos: "center", width: 1680, height: 840 },
  { src: pAkkoDesktop, srcSm: pAkkoMobile, srcMedium: pAkkoDesktop, caption: "Akko Old City and harbour", alt: "Aerial view of Akko’s historic walled city, sea wall and marina along the Mediterranean coast", pos: "center 68%", width: 2048, height: 848 },
  { src: pEilatMountainsLarge, srcSm: pEilatMountainsMobile, srcMedium: pEilatMountainsMedium, caption: "Eilat Mountains and the Gulf of Aqaba", alt: "Rocky Eilat Mountains overlooking the city of Eilat and the blue Gulf of Aqaba", pos: "center", width: 1680, height: 840 },
  { src: pRamonCraterLarge, srcSm: pRamonCraterMobile, srcMedium: pRamonCraterMedium, caption: "Sunrise over Makhtesh Ramon", alt: "Sun rising over the edge of Makhtesh Ramon beside Camel Hill near Mitzpe Ramon", pos: "center", width: 1680, height: 840 },
  { src: pTelAvivSaronaLarge, srcSm: pTelAvivSaronaMobile, srcMedium: pTelAvivSaronaMedium, caption: "Tel Aviv’s modern skyline", alt: "High-rise towers in Tel Aviv's Sarona business district with the Mediterranean Sea in the distance", pos: "center", width: 1680, height: 840 },
  { src: pJerusalemJaffaGateLarge, srcSm: pJerusalemJaffaGateMobile, srcMedium: pJerusalemJaffaGateMedium, caption: "Jerusalem Old City walls at Jaffa Gate", alt: "Visitors walking beside Jerusalem's old city walls near Jaffa Gate and the Tower of David", pos: "center", width: 1680, height: 840 },
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
