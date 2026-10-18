import { HeroCarousel, type HeroSlide } from "@/components/HeroCarousel";
import hJer from "@/assets/home/hero-jerusalem.webp";
import hJerSm from "@/assets/home/hero-jerusalem-sm.webp";
import hTa from "@/assets/home/hero-tel-aviv.webp";
import hTaSm from "@/assets/home/hero-tel-aviv-sm.webp";
import hHf from "@/assets/home/hero-haifa.webp";
import hHfSm from "@/assets/home/hero-haifa-sm.webp";
import hMs from "@/assets/home/hero-masada.webp";
import hMsSm from "@/assets/home/hero-masada-sm.webp";
import hCs from "@/assets/home/hero-caesarea.webp";
import hCsSm from "@/assets/home/hero-caesarea-sm.webp";
import hGl from "@/assets/home/hero-galilee.webp";
import hGlSm from "@/assets/home/hero-galilee-sm.webp";

const heroSlides: HeroSlide[] = [
  { src: hJer, srcSm: hJerSm, caption: "Jerusalem Old City from the Mount of Olives", alt: "Jerusalem's Old City and the Dome of the Rock seen from the Mount of Olives", pos: "55% center" },
  { src: hTa, srcSm: hTaSm, caption: "Tel Aviv beach promenade", alt: "The seafront promenade beside the beach in Tel Aviv", pos: "40% center" },
  { src: hHf, srcSm: hHfSm, caption: "Haifa Bay from the Carmel, Bahá'í Gardens below", alt: "Haifa and Haifa Bay seen from Mount Carmel above the Bahá'í Gardens", pos: "center" },
  { src: hMs, srcSm: hMsSm, caption: "Masada above the Dead Sea", alt: "The Masada plateau from the air with the Dead Sea behind", pos: "center" },
  { src: hCs, srcSm: hCsSm, caption: "Caesarea National Park on the coast", alt: "Ancient ruins on the shore at Caesarea at dusk", pos: "65% center" },
  { src: hGl, srcSm: hGlSm, caption: "Tiberias and the Sea of Galilee", alt: "Tiberias on the hillside above the Sea of Galilee, seen from the water", pos: "center" },
];

/** Rendered by the root layout above the shared sidebar/content columns. */
export function HomeHero() {
  return (
    <section aria-labelledby="home-title">
      <HeroCarousel slides={heroSlides}>
        <div className="max-w-3xl px-6 pb-8 pt-16 text-navy-foreground md:px-12 md:pb-10 md:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.17em] opacity-90">Your Israel journey starts here</p>
          <h1 id="home-title" className="mt-4 max-w-2xl text-4xl leading-[1.08] md:text-6xl">Explore Israel with confidence.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed opacity-95 md:text-xl">
            From airport arrivals and private day trips to beautiful places to stay and unforgettable sights, discover local insights that make every journey easier and more rewarding.
          </p>
        </div>
        </div>
      </HeroCarousel>
    </section>
  );
}
