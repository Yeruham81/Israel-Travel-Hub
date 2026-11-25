import { HeroCarousel, type HeroSlide } from "@/components/HeroCarousel";
import hJerSm from "@/assets/home/hero-jerusalem-psi-mobile.webp";
import hJerMedium from "@/assets/home/hero-jerusalem-medium.webp";
import hJerLarge from "@/assets/home/hero-jerusalem-large.webp";
import hTaSm from "@/assets/home/hero-refresh-tel-aviv-coastline-v3-mobile.webp";
import hTaMedium from "@/assets/home/hero-refresh-tel-aviv-coastline-v2-medium.webp";
import hTaLarge from "@/assets/home/hero-refresh-tel-aviv-coastline-v2-large.webp";
import pAkkoDesktop from "@/assets/home/hero-akko-aerial-large.webp";
import pAkkoMobile from "@/assets/home/hero-akko-aerial-sm.webp";
import pHaifaGardensLarge from "@/assets/home/hero-refresh-haifa-gardens-v4-large.webp";
import pHaifaGardensMedium from "@/assets/home/hero-refresh-haifa-gardens-v4-medium.webp";
import pHaifaGardensMobile from "@/assets/home/hero-refresh-haifa-gardens-v4-mobile.webp";
import pMasadaDeadSeaLarge from "@/assets/home/hero-refresh-masada-dead-sea-v4-large.webp";
import pMasadaDeadSeaMedium from "@/assets/home/hero-refresh-masada-dead-sea-v4-medium.webp";
import pMasadaDeadSeaMobile from "@/assets/home/hero-refresh-masada-dead-sea-v4-mobile.webp";
import pCaesareaCoastLarge from "@/assets/home/hero-refresh-caesarea-coast-v4-large.webp";
import pCaesareaCoastMedium from "@/assets/home/hero-refresh-caesarea-coast-v4-medium.webp";
import pCaesareaCoastMobile from "@/assets/home/hero-refresh-caesarea-coast-v4-mobile.webp";
import pDeadSeaSaltLarge from "@/assets/home/hero-refresh-dead-sea-salt-v4-large.webp";
import pDeadSeaSaltMedium from "@/assets/home/hero-refresh-dead-sea-salt-v4-medium.webp";
import pDeadSeaSaltMobile from "@/assets/home/hero-refresh-dead-sea-salt-v4-mobile.webp";
import pJaffaPortLarge from "@/assets/home/hero-refresh-jaffa-port-v4-large.webp";
import pJaffaPortMedium from "@/assets/home/hero-refresh-jaffa-port-v4-medium.webp";
import pJaffaPortMobile from "@/assets/home/hero-refresh-jaffa-port-v5-mobile.webp";
import pEilatMountainsLarge from "@/assets/home/hero-refresh-eilat-mountains-v4-large.webp";
import pEilatMountainsMedium from "@/assets/home/hero-refresh-eilat-mountains-v4-medium.webp";
import pEilatMountainsMobile from "@/assets/home/hero-refresh-eilat-mountains-v4-mobile.webp";
import pRamonCraterLarge from "@/assets/home/hero-refresh-ramon-crater-v4-large.webp";
import pRamonCraterMedium from "@/assets/home/hero-refresh-ramon-crater-v4-medium.webp";
import pRamonCraterMobile from "@/assets/home/hero-refresh-ramon-crater-v4-mobile.webp";
import pTelAvivSaronaLarge from "@/assets/home/hero-refresh-tel-aviv-sarona-v4-large.webp";
import pTelAvivSaronaMedium from "@/assets/home/hero-refresh-tel-aviv-sarona-v4-medium.webp";
import pTelAvivSaronaMobile from "@/assets/home/hero-refresh-tel-aviv-sarona-v5-mobile.webp";
import pJerusalemJaffaGateLarge from "@/assets/home/hero-refresh-jerusalem-jaffa-gate-v4-large.webp";
import pJerusalemJaffaGateMedium from "@/assets/home/hero-refresh-jerusalem-jaffa-gate-v4-medium.webp";
import pJerusalemJaffaGateMobile from "@/assets/home/hero-refresh-jerusalem-jaffa-gate-v5-mobile.webp";

export const heroSlides: HeroSlide[] = [
  { src: hJerLarge, srcSm: hJerSm, srcMedium: hJerMedium, caption: "Jerusalem Old City from the Mount of Olives", alt: "Jerusalem's Old City and the Dome of the Rock seen from the Mount of Olives", pos: "55% 60%" },
  { src: hTaLarge, srcSm: hTaSm, srcMedium: hTaMedium, caption: "Tel Aviv beachfront skyline", alt: "Tel Aviv beaches, Mediterranean coastline and high-rise skyline along the seafront promenade", pos: "center 60%", width: 1800, height: 600 },
  { src: pHaifaGardensLarge, srcSm: pHaifaGardensMobile, srcMedium: pHaifaGardensMedium, caption: "Haifa and the Bahá’í Gardens", alt: "The Bahá’í Gardens, Haifa city and the Mediterranean port seen from Mount Carmel", pos: "center 60%", width: 2048, height: 1024, highDensity: true },
  { src: pMasadaDeadSeaLarge, srcSm: pMasadaDeadSeaMobile, srcMedium: pMasadaDeadSeaMedium, caption: "Masada above the Dead Sea", alt: "Aerial view of Masada's ancient fortress on a sunlit cliff overlooking the Dead Sea", pos: "center", width: 2048, height: 1024, highDensity: true },
  { src: pCaesareaCoastLarge, srcSm: pCaesareaCoastMobile, srcMedium: pCaesareaCoastMedium, caption: "Caesarea’s ancient harbour", alt: "Aerial view of the ancient harbour, turquoise Mediterranean water and shoreline near Caesarea", pos: "center", width: 2048, height: 1024, highDensity: true },
  { src: pJerusalemJaffaGateLarge, srcSm: pJerusalemJaffaGateMobile, srcMedium: pJerusalemJaffaGateMedium, caption: "Jerusalem Old City walls at Jaffa Gate", alt: "Visitors walking beside Jerusalem's old city walls near Jaffa Gate and the Tower of David", pos: "center", width: 2048, height: 1024, highDensity: true },
  { src: pDeadSeaSaltLarge, srcSm: pDeadSeaSaltMobile, srcMedium: pDeadSeaSaltMedium, caption: "Dead Sea salt formations at sunrise", alt: "White salt formations in shallow turquoise Dead Sea water under an orange sunrise sky", pos: "center 25%", width: 1600, height: 800, highDensity: true },
  { src: pAkkoDesktop, srcSm: pAkkoMobile, srcMedium: pAkkoDesktop, caption: "Akko Old City and harbour", alt: "Aerial view of Akko’s historic walled city, sea wall and marina along the Mediterranean coast", pos: "center 68%", width: 2048, height: 848 },
  { src: pEilatMountainsLarge, srcSm: pEilatMountainsMobile, srcMedium: pEilatMountainsMedium, caption: "Eilat Mountains and the Gulf of Aqaba", alt: "Rocky Eilat Mountains overlooking the city of Eilat and the blue Gulf of Aqaba", pos: "center", width: 2048, height: 1024, highDensity: true },
  { src: pJaffaPortLarge, srcSm: pJaffaPortMobile, srcMedium: pJaffaPortMedium, caption: "Old Jaffa and its harbour", alt: "Aerial view of Old Jaffa stone buildings, waterfront, marina and the stone breakwater", pos: "center 18%", width: 2048, height: 1024, highDensity: true },
  { src: pRamonCraterLarge, srcSm: pRamonCraterMobile, srcMedium: pRamonCraterMedium, caption: "Sunrise over Makhtesh Ramon", alt: "Sun rising over the edge of Makhtesh Ramon beside Camel Hill near Mitzpe Ramon", pos: "center", width: 2048, height: 1024, highDensity: true },
  { src: pTelAvivSaronaLarge, srcSm: pTelAvivSaronaMobile, srcMedium: pTelAvivSaronaMedium, caption: "Tel Aviv’s modern skyline", alt: "High-rise towers in Tel Aviv's Sarona business district with the Mediterranean Sea in the distance", pos: "center", width: 2048, height: 1024, highDensity: true },
];

/** Rendered by the root layout above the shared sidebar/content columns. */
export function HomeHero() {
  return (
    <section aria-labelledby="home-title">
      <HeroCarousel slides={heroSlides}>
        <div className="max-w-5xl px-6 pb-8 pt-16 text-white md:px-12 md:pb-8 md:pt-16" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.76), 0 4px 18px rgba(0,0,0,0.45)" }}>
          <p className="text-xs font-semibold uppercase tracking-[0.17em] opacity-95">Local advice & private transport</p>
          <h1 id="home-title" className="mt-4 max-w-2xl text-4xl leading-[1.08] md:text-5xl lg:max-w-none lg:whitespace-nowrap lg:text-[clamp(3rem,3.65vw,3.25rem)]">Plan Your Trip to Israel</h1>
          <p className="mt-3 max-w-2xl text-lg font-medium leading-relaxed opacity-100 md:text-xl">
            Find out how to get from Ben Gurion Airport to your hotel, where to stay, and how to visit Jerusalem, the Dead Sea and the Galilee.
          </p>
        </div>
      </HeroCarousel>
    </section>
  );
}
