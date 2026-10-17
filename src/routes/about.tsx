import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/site";
import { authorLd } from "@/lib/author";
import { AuthorCard } from "@/components/AuthorCard";

export const Route = createFileRoute("/about")({
  head: () => {
    const meta = pageMeta({
      title: "About & comparison methodology — Israel Taxi & Travel",
      description: "Who publishes Israel Taxi & Travel, how booking options are selected and compared, and how affiliate links and our local operator are disclosed.",
      path: "/about/",
    });
    return { ...meta, scripts: [...meta.scripts, { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", ...authorLd() }).replaceAll("<", "\\u003c") }] };
  },
  component: About,
});

function About() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-4 py-14">
        <p className="eyebrow">About</p>
        <h1 className="mt-3 text-4xl md:text-5xl">How we choose and compare options</h1>
        <AuthorCard introduction />
        <div className="prose-guide mt-6">
          <h2 className="mt-10 text-2xl">Who we are</h2>
          <p>Israel Taxi &amp; Travel helps international visitors plan trips in Israel, with local guides to accommodation, transfers, tours, attractions, tickets and car rental. Moshe Barak shares practical knowledge built over more than 20 years of helping travelers with private transportation and tailored journeys. Each page gives useful planning information, followed by relevant booking options.</p>
          <h2 id="moshe-barak" className="mt-10 scroll-mt-24 text-2xl">Moshe Barak: local knowledge and personal service</h2>
          <p>Moshe was born and raised in Israel and specializes in private airport transfers, day trips and customized itineraries. His background in logistics informs his attention to routes, timing and individual travel needs. His writing focuses on helping visitors make informed, practical choices for their own trip.</p>
          <p>Moshe Barak's transfers are operated by the publisher's own local transport business. Wherever his service appears, it is labeled with that relationship. His reviews, prices and cancellation terms apply only to his own services — we never use them to rate this directory or other providers.</p>
          <h2 className="mt-10 text-2xl">How options are selected</h2>
          <ul>
            <li>We include providers that clearly serve the route or product a page covers, including official information such as licensed airport taxis.</li>
            <li>We keep the actual operator separate from booking platforms that resell many operators' services.</li>
            <li>We use official destination and operator information, identify source limitations and show when guides were updated. Facts we haven't checked are not presented as verified.</li>
            <li>We show a price only when a provider publishes one, and we say what it covers. We don't rank unlike prices against each other or call a price “total” when charges are unknown.</li>
            <li>We don't invent ratings, availability, discounts or vehicle capacity. Where capacity is unknown we say “confirm with provider”.</li>
          </ul>
          <h2 className="mt-10 text-2xl">How booking links work</h2>
          <ul>
            <li><strong>Provider links:</strong> open the hotel platform, transfer company, tour operator or rental site, where you enter your own dates and see their current prices.</li>
            <li><strong>Quote requests:</strong> you contact the provider on their own site. Nothing is sent from our pages.</li>
            <li><strong>Official sites:</strong> national parks and airport information link to the official source.</li>
            <li>We don't currently show live prices or availability. We will only do so when a provider returns a quote for your exact date and party, with its time and expiry.</li>
            <li>The Jerusalem, Tel Aviv, Haifa, Dead Sea and Tiberias accommodation guides include editorial hotel shortlists based on location, travel style and the hotels' own information. The destination comparisons also distinguish beach access, spa entry, family facilities, age policies and meal plans. Date-specific operator notices and limits to source verification are identified separately. These are not reviews of personal stays at every property, and they do not establish current room availability.</li>
          </ul>
          <h2 className="mt-10 text-2xl">Affiliate links</h2>
          <p>Some links on this site may earn us a commission at no extra cost to you. Only links from partners with a configured affiliate agreement are labeled “Sponsored link”. Links without that label are regular links. Bookings are always made on the provider's own website; we don't take payments or make reservations.</p>
          <h2 className="mt-10 text-2xl">Privacy</h2>
          <p>We don't attach your personal details or flight information to outbound links. Journey details you enter in our planners stay on the page.</p>
        </div>
      </main>
    </>
  );
}
