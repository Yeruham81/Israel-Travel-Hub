import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { CarFront, Check, CreditCard, Luggage, MapPin } from "lucide-react";
import { GuideHeader, OnThisPage, FaqList, RelatedLinks, SourceList } from "@/components/Guide";
import { DiscoverCarsSearchWidget, RentalComparisonLink } from "@/components/DiscoverCarsSearchWidget";
import { CAR_RENTAL_UPDATED, carRentalHero, carRentalTitle, rentalDecisionRows, rentalCostRows, rentalChecklists, carRentalFaqs, carRentalSources } from "@/data/carRentalGuide";

const inline = "font-semibold text-primary underline underline-offset-4 hover:text-primary/80";
const sections = [
  ["car-needed", "Do you need a car?"], ["compare-rentals", "Compare rental cars"],
  ["pickup", "Airport or city pickup"], ["documents", "Documents & drivers"],
  ["costs", "Rental costs"], ["insurance", "Insurance & deposit"],
  ["vehicle-driving", "Choosing & driving"], ["road-trip-ideas", "Road trip ideas"],
  ["checklists", "Pickup & return"], ["faq", "Common questions"],
] as const;

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} aria-labelledby={`${id}-h`} className="mt-12 scroll-mt-24">
    <h2 id={`${id}-h`} className="text-2xl font-bold leading-tight sm:text-3xl">{title}</h2>
    <div className="mt-4 space-y-4 leading-relaxed">{children}</div>
  </section>;
}

function RentalTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: string[][] }) {
  return <div className="overflow-x-auto rounded-xl border" role="region" aria-label={caption} tabIndex={0}>
    <table className="min-w-[640px] w-full text-left text-base leading-relaxed">
      <caption className="sr-only">{caption}</caption>
      <thead className="bg-secondary/70"><tr>{headers.map(h => <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
      <tbody className="divide-y">{rows.map(row => <tr key={row[0]} className="align-top odd:bg-card">{row.map((cell, i) => i === 0
        ? <th key={i} scope="row" className="w-[25%] px-4 py-3 font-semibold">{cell}</th>
        : <td key={i} className="px-4 py-3">{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

export function CarRentalGuide() {
  return <main className="pb-12" data-testid="car-rental-guide">
    <GuideHeader crumbs={[{ name: "Home", to: "/" }, { name: "Car rental", to: "/car-rental/" }]}
      eyebrow="Planning your trip" title={carRentalTitle} image={carRentalHero} checkedAt={CAR_RENTAL_UPDATED}
      intro="A rental car gives you freedom to explore Israel at your own pace. Drawing on my years helping visitors travel around the country, I explain when to rent, where to collect your car and what to check before booking." />
    <div className="mx-auto max-w-5xl px-4">
      <aside className="mt-7 rounded-xl border border-primary/20 bg-secondary/40 p-5 leading-relaxed" aria-label="My quick recommendation">
        <p><strong>My quick recommendation:</strong> Rent for the days you will explore the Galilee, the Negev or several regional stops. For time in central Jerusalem or Tel Aviv, walking and public transport often work well. Match the rental period to your route, then <a href="#compare-rentals" className={inline}>compare cars for your dates</a>.</p>
      </aside>
      <OnThisPage sections={sections} />

      <Section id="car-needed" title="When is renting a car in Israel worth it?">
        <p>I start with the places you want to visit and how much flexibility you enjoy. A car is particularly useful for rural accommodation, viewpoints and a series of stops spread across a region. In the main cities, parking and traffic can take up time you would rather spend sightseeing.</p>
        <RentalTable caption="Choosing transport for your Israel trip" headers={["Your trip", "A practical choice", "My planning tip"]} rows={rentalDecisionRows} />
        <p>A mixed plan can work especially well: take an <Link to="/airport-transfers/" className={inline}>airport transfer</Link>, enjoy your first city, then collect a car for the next part of the trip. My <Link to="/travel-blog/getting-around-israel/" className={inline}>guide to getting around Israel</Link> compares the transport options.</p>
      </Section>

      <Section id="compare-rentals" title="Compare car rental prices in Israel">
        <p>Search DiscoverCars for your pickup location, travel dates and return point. Ben Gurion Airport is selected to start; you can choose another location. Compare the complete rental price alongside the supplier, fuel policy, deposit and cancellation terms.</p>
        <DiscoverCarsSearchWidget />
      </Section>

      <Section id="pickup" title="Airport or city pickup: choose what fits your itinerary">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-5">
            <h3 className="flex items-center gap-2 text-xl font-semibold"><MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden />Ben Gurion Airport</h3>
            <p className="mt-3">Airport collection suits an onward road trip. Add your flight number to the booking and allow time for passport control, luggage, paperwork and reaching the vehicle.</p>
            <p className="mt-3">The Airports Authority lists several counters in Terminal 3’s Eastern Gallery. Collection and return locations vary by company; use the instructions for your supplier and check the <a href="https://www.iaa.gov.il/en/airports/ben-gurion/car-rental-companies/" target="_blank" rel="noopener noreferrer" className={inline}>official airport rental-company information</a>. Include any shuttle ride in your return-day plan.</p>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <h3 className="flex items-center gap-2 text-xl font-semibold"><CarFront className="h-5 w-5 shrink-0 text-primary" aria-hidden />A branch in the city</h3>
            <p className="mt-3">A Tel Aviv, Jerusalem or other city branch can suit a later start after sightseeing. Check the branch address, opening hours and how you will reach it with your luggage.</p>
            <p className="mt-3">For Shabbat, holidays, early departures and late arrivals, confirm the exact collection and return arrangements. If you finish in another city, compare the one-way fee and the available return hours.</p>
          </div>
        </div>
        <p>Before booking, check parking at your accommodation. These guides can help you choose a convenient base in <Link to="/travel-blog/where-to-stay-in-tel-aviv/" className={inline}>Tel Aviv</Link> or <Link to="/travel-blog/where-to-stay-in-jerusalem/" className={inline}>Jerusalem</Link>.</p>
      </Section>

      <Section id="documents" title="Documents, payment cards and driver requirements">
        <p>Prepare the documents for the main driver and check the conditions for every additional driver. Age limits, licence experience and eligible vehicle groups vary between suppliers.</p>
        <ul className="list-disc space-y-2 pl-5">
          <li><strong>Original driving licence:</strong> bring the valid licence for the vehicle category you are hiring, plus an international driving permit when your supplier requires it.</li>
          <li><strong>Passport and entry permit:</strong> keep the permit issued on arrival. Suppliers use the relevant documents to assess tourist VAT eligibility.</li>
          <li><strong>Payment card:</strong> check the card type, whose name must appear on it and the available credit needed for the deposit. A physical credit card in the main driver’s name is commonly required.</li>
          <li><strong>Booking voucher:</strong> save the collection instructions, supplier contact details and the terms you agreed to.</li>
        </ul>
        <p>For example, <strong>Hertz Israel</strong> requires an international permit for a licence written in a non-Latin script, while <strong>Eldan</strong>’s terms ask for one when the licence is not in English. Check your selected supplier’s requirements before paying.</p>
      </Section>

      <Section id="costs" title="Compare the whole rental cost">
        <p>Use the total for your actual trip when comparing offers. A lower daily rate can come with a different mileage allowance, excess, fuel policy or collection fee.</p>
        <RentalTable caption="Car rental costs to compare before booking" headers={["Cost or condition", "What to compare", "Before you book"]} rows={rentalCostRows} />
        <p>The security deposit is a separate card hold or payment under the rental agreement. Budget for it alongside the rental charge. For taxes, have the supplier confirm your eligibility and the items included in any exemption.</p>
        <p><RentalComparisonLink placement="cost-comparison" className={inline}>Compare rental offers for your route and dates</RentalComparisonLink>.</p>
      </Section>

      <Section id="insurance" title="Insurance, excess and deposit: understand the difference">
        <div className="grid gap-4 lg:grid-cols-3">
          {[
            ["Included protection", "Read the damage, theft and third-party cover included in the offer, together with its exclusions. Ask how any credit-card protection you plan to use fits the supplier’s requirements."],
            ["Excess or deductible", "This is the amount you may have to pay toward a covered claim under the rental agreement. Check the amount and which types of damage the cover includes."],
            ["Security deposit", "The supplier holds or collects this amount under its payment conditions. Check the required card, available limit and release procedure before collection."],
          ].map(([title, text]) => <div key={title} className="rounded-xl border bg-card p-5"><h3 className="flex items-center gap-2 text-xl font-semibold">{title === "Security deposit" && <CreditCard className="h-5 w-5 shrink-0 text-primary" aria-hidden />}{title}</h3><p className="mt-3">{text}</p></div>)}
        </div>
        <p>DiscoverCars describes its optional <a href="https://www.discovercars.com/help/articles/protection-coverage/discovercars-full-coverage/do-i-need-to-leave-a-security-deposit-if-i-purchase-full-coverage-online" target="_blank" rel="noopener noreferrer" className={inline}>Full Coverage as reimbursement protection</a>: eligible charges are paid to the supplier first and then claimed back under the product’s terms. The supplier’s deposit still applies. Compare this with any excess-reduction option offered at the rental desk, including the price, exclusions and documents needed for a claim.</p>
      </Section>

      <Section id="vehicle-driving" title="Choose a suitable car and plan the driving">
        <div className="rounded-xl border bg-secondary/30 p-5">
          <h3 className="flex items-center gap-2 text-xl font-semibold"><Luggage className="h-5 w-5 shrink-0 text-primary" aria-hidden />Leave room for people and luggage</h3>
          <p className="mt-3">Choose by passenger numbers and suitcase space, then check the transmission, air conditioning and requested child seats. A compact car is convenient for urban parking; more luggage or a family trip may justify a larger category. Read how the supplier defines “or similar” when choosing a vehicle group.</p>
        </div>
        <p><strong>Parking:</strong> check hotel parking before arrival, then follow local signs and the payment instructions at each street or car park. A booked parking space can make a city stay much easier.</p>
        <p><strong>Navigation and fuel:</strong> use your preferred navigation app, save key addresses and keep a charging cable handy. Check the fuel type and return policy at collection; plan fuel stops before longer desert journeys. My <Link to="/travel-blog/best-esim-for-israel/" className={inline}>Israel eSIM guide</Link> can help you arrange mobile data.</p>
        <p><strong>Tolls:</strong> Highway 6 uses electronic billing. Its operator explains that rental-vehicle invoices go to the registered owner, and rental companies may add handling fees. Ask your supplier how it manages <a href="https://www.kvish6.co.il/Info.aspx" target="_blank" rel="noopener noreferrer" className={inline}>Highway 6 tolls</a> and any other toll roads on your route.</p>
        <p><strong>Permitted routes:</strong> have your supplier confirm the territory and roads covered by the agreement. <strong>Hertz Israel</strong>’s contract, for example, excludes Area A, including Bethlehem. For a Bethlehem visit, use my <Link to="/travel-blog/jerusalem-to-bethlehem/" className={inline}>Jerusalem–Bethlehem transport guide</Link> to plan suitable transport.</p>
      </Section>

      <Section id="road-trip-ideas" title="Where a rental car can add flexibility">
        <p>I recommend choosing a comfortable base and exploring nearby places together. Leave time for stops, meals and the journey back to your accommodation.</p>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl border bg-card p-5"><h3 className="text-xl font-semibold">Galilee and the lake</h3><p className="mt-3">Use the <Link to="/attractions/sea-of-galilee/" className={inline}>Sea of Galilee guide</Link> to group lakeside visits, then choose stops such as <Link to="/attractions/capernaum/" className={inline}>Capernaum</Link> and <Link to="/attractions/magdala/" className={inline}>Magdala</Link> according to your interests.</p></div>
          <div className="rounded-xl border bg-card p-5"><h3 className="text-xl font-semibold">Dead Sea and the Negev</h3><p className="mt-3">Plan a <Link to="/attractions/dead-sea/" className={inline}>Dead Sea stay</Link> with time for <Link to="/attractions/masada/" className={inline}>Masada</Link>. For a separate desert base, explore <Link to="/attractions/mitzpe-ramon-crater/" className={inline}>Mitzpe Ramon and the crater</Link>.</p></div>
          <div className="rounded-xl border bg-card p-5"><h3 className="text-xl font-semibold">The Mediterranean coast</h3><p className="mt-3">Consider <Link to="/attractions/caesarea/" className={inline}>Caesarea</Link> on a journey north, followed by time in <Link to="/attractions/haifa/" className={inline}>Haifa</Link> or <Link to="/attractions/akko-acre/" className={inline}>Akko</Link>. Choose your stops to suit the available days.</p></div>
        </div>
      </Section>

      <Section id="checklists" title="Collecting and returning your rental car">
        <div className="grid gap-5 md:grid-cols-2">{[{ title: "At collection", items: rentalChecklists.collect }, { title: "At return", items: rentalChecklists.return }].map(({ title, items }) => <div key={title} className="rounded-xl border bg-card p-5">
          <h3 className="text-xl font-semibold">{title}</h3>
          <ul className="mt-4 space-y-3">{items.map(item => <li key={item} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden /><span>{item}</span></li>)}</ul>
        </div>)}</div>
      </Section>
      <FaqList faqs={carRentalFaqs} />
      <aside className="mt-10 rounded-xl border border-primary/20 bg-secondary/40 p-5 leading-relaxed" aria-label="A private driver alternative">
        <h2 className="text-xl font-semibold">Prefer to leave the driving to me?</h2>
        <p className="mt-3">I can help you plan a private journey with a route and pace that suit your group. See my <Link to="/private-driver-in-israel/" className={inline}>private driver service</Link> and send your plans through the form there.</p>
      </aside>
      <RelatedLinks title="Plan your trip around Israel" currentPath="/car-rental/" illustrated maxPhotoCards={6} descriptionLines={2} items={[
        { label: "Getting around Israel", to: "/travel-blog/getting-around-israel/", note: "Compare trains, buses, taxis and driving for travel around Israel." },
        { label: "Israel travel tips", to: "/travel-blog/israel-travel-tips/", note: "Plan entry requirements, money, Shabbat travel and everyday essentials." },
        { label: "Ben Gurion Airport arrivals", to: "/travel-blog/ben-gurion-airport-arrival-tips/", note: "Plan passport control, baggage collection and your onward journey." },
        { label: "Sea of Galilee", to: "/attractions/sea-of-galilee/", note: "Explore lakeside towns, historic sites and places to stop around the lake." },
        { label: "The Dead Sea", to: "/attractions/dead-sea/", note: "Choose beaches, plan a floating stop and explore nearby desert sights." },
        { label: "Mitzpe Ramon and the crater", to: "/attractions/mitzpe-ramon-crater/", note: "Find crater viewpoints, short walks and practical tips for a desert visit." },
      ]} />
      <SourceList ids={carRentalSources.map(source => source.id)} compact intro="Official airport information and supplier terms used for this guide. Check the Rental Conditions attached to the vehicle you choose." />
    </div>
  </main>;
}
