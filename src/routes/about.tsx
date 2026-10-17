import { createFileRoute } from "@tanstack/react-router";
import { pageMeta } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta({
      title: "About & comparison methodology — Israel Taxi & Travel",
      description: "Who publishes Israel Taxi & Travel, how booking options are selected and compared, and how affiliate links and our local operator are disclosed.",
      path: "/about/",
    }),
  component: About,
});

function About() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-4 py-14">
        <p className="eyebrow">About</p>
        <h1 className="mt-3 text-4xl md:text-5xl">How we choose and compare options</h1>
        <div className="prose-guide mt-6">
          <h2 className="mt-10 text-2xl">Who we are</h2>
          <p>Israel Taxi &amp; Travel is the travel-information evolution of israel-taxi.com, written for international visitors planning trips in Israel. It covers accommodation, transfers, tours, attractions, tickets and car rental. Each page gives practical information first, then links to continue with a provider. Its local contributor, Moshe Barak, runs a private transport business that appears on some pages as one of several options.</p>
          <h2 className="mt-10 text-2xl">Our relationship with Moshe Barak</h2>
          <p>Moshe Barak's transfers are operated by the publisher's own local transport business. Wherever his service appears, it is labeled with that relationship. His reviews, prices and cancellation terms apply only to his own services — we never use them to rate this directory or other providers.</p>
          <h2 className="mt-10 text-2xl">How options are selected</h2>
          <ul>
            <li>We include providers that clearly serve the route or product a page covers, including official information such as licensed airport taxis.</li>
            <li>We keep the actual operator separate from booking platforms that resell many operators' services.</li>
            <li>Every important fact links to its source and shows when we checked it. Facts we haven't checked are not presented as verified.</li>
            <li>We show a price only when a provider publishes one, and we say what it covers. We don't rank unlike prices against each other or call a price “total” when charges are unknown.</li>
            <li>We don't invent ratings, availability, discounts or vehicle capacity. Where capacity is unknown we say “confirm with provider”.</li>
          </ul>
          <h2 className="mt-10 text-2xl">How booking links work</h2>
          <ul>
            <li><strong>Provider links:</strong> open the hotel platform, transfer company, tour operator or rental site, where you enter your own dates and see their current prices.</li>
            <li><strong>Quote requests:</strong> you contact the provider on their own site. Nothing is sent from our pages.</li>
            <li><strong>Official sites:</strong> national parks and airport information link to the official source.</li>
            <li>We don't currently show live prices or availability. We will only do so when a provider returns a quote for your exact date and party, with its time and expiry.</li>
            <li>The Jerusalem and Tel Aviv neighborhood guides include editorial hotel shortlists based on location, travel style and the hotels' own information. They are not reviews of personal stays at every property, and they do not establish current room availability.</li>
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
