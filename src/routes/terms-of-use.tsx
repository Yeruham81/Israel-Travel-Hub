import { Link, createFileRoute } from "@tanstack/react-router";
import { LegalPage, legalPageMeta, type LegalSection } from "@/components/LegalPage";
import { airportTransferContact } from "@/data/registry";

export const Route = createFileRoute("/terms-of-use")({
  head: () => legalPageMeta("Terms of Use", "/terms-of-use/", "Terms for using Israel Taxi & Travel, requesting transport from Moshe Barak, understanding prices and cancellation, and using external booking, advertising and payment services."),
  component: TermsOfUse,
});

const email = <a href={`mailto:${airportTransferContact.email}`}>{airportTransferContact.email}</a>;

const sections: LegalSection[] = [
  { id: "scope", title: "The website and its operator", content: <>
    <p>I am Moshe Barak, the operator of Israel Taxi &amp; Travel. The website combines travel information with information about my own private transport service and links to independent providers. These roles are identified separately.</p>
    <p>These terms govern use of this website and explain how direct-service enquiries are handled. A confirmed booking also has its accepted written quote and booking conditions. Mandatory legal rights take priority over a conflicting term. My <Link to="/privacy-policy/">Privacy Policy</Link> explains the handling of information, and <Link to="/about-moshe-barak/" hash="methodology">About Moshe Barak</Link> explains my editorial and commercial approach.</p>
  </> },
  { id: "enquiries-confirmation", title: "Enquiries and booking confirmation", content: <>
    <p>An adult with authority to make the arrangements should submit an enquiry or book for a group. Please supply accurate contact, pickup, destination, date, passenger and luggage details, and tell me about material changes.</p>
    <p>Pressing a form's Send button submits your details directly through the website for email delivery. Wait for the on-page confirmation; if sending is unavailable or cannot be confirmed, the form displays an error. Neither a submitted enquiry nor an automatic receipt acknowledgement is by itself a confirmed booking.</p>
    <p>Before accepting a direct-service booking, agree the supplier and contact details, itinerary, vehicle requirements, price, inclusions, payment arrangements and relevant cancellation terms in writing. Availability is subject to confirmation. Keep the confirmation and ask me to correct any discrepancy before travel.</p>
  </> },
  { id: "prices-payments", title: "Prices, currency and payment", content: <>
    <p>My published starting rates are indicative and subject to the stated route, passenger, vehicle, time and other conditions. They are not a live availability check or a final quote for every journey. The written offer should set out the total payable, applicable taxes and unavoidable charges before you accept it, including any agreed additional waiting, overtime or optional stops.</p>
    <p>Prices and charges for services I provide are in Israeli shekels (ILS). Any displayed equivalent of my prices in another currency is an approximate reference estimate only; it does not change the amount or currency charged. If your bank or card issuer converts an ILS charge into your account's currency, its own exchange rate and disclosed fees may apply.</p>
    <p>Prices for services offered by external providers may be displayed in foreign currencies, including in advertisements, banners, links or widgets on this website. The external provider presenting a price is solely responsible for that price and its own payment terms. Check the provider's final total, currency, taxes, charges and cancellation conditions before booking.</p>
    <p>If a deposit is required, its amount, due date and effect on confirmation must be stated in the booking offer. There is no online checkout on this website at present. Payment instructions for an agreed service are provided separately; do not send card numbers, security codes or banking passwords in an enquiry.</p>
    <p>If online checkout or payment facilities are introduced for my services, my service charges will remain in ILS. The merchant, payment provider, total, applicable taxes and charges, and booking or cancellation conditions will be shown before you confirm payment. The process will explain whether the payment requests a new booking or pays for an existing one. The payment provider's terms also apply to its service, without replacing my own obligations or your statutory rights.</p>
  </> },
  { id: "cancellations", title: "Cancellation, changes and refunds", content: <>
    <p>For transport booked directly with me, cancellation received <strong>12 hours or more before the scheduled pickup</strong> qualifies for a full refund of the deposit and other advance payments. For cancellation received less than 12 hours before pickup, the deposit is not refundable and other advance payments are refundable. Use the pickup time in Israel. A more favourable agreed condition or mandatory statutory right takes priority.</p>
    <p>You can <a href={`mailto:${airportTransferContact.email}?subject=Booking%20cancellation`}>email a cancellation request</a> with your name and booking or journey details. You must send the email; preparing a message on this site does not deliver it. Keep a copy and ask for an acknowledgement. Lack of a reply does not by itself invalidate a cancellation notice given in time. This contact option does not restrict any other cancellation method available to you by law.</p>
    <p>Tell me promptly about a changed flight, ship call or itinerary. A requested change depends on availability and may require a revised quote; it is not automatically agreed by sending a message. Ask about the effect on timing, price and any deposit before accepting the change.</p>
    <p>If I cannot provide an agreed service, I will contact you about an acceptable alternative or a refund for the service I cannot provide, subject to your legal rights. A private transport arrangement is not a guarantee against every road, flight or cruise disruption.</p>
    <p>The commercial cancellation conditions above do not replace any cancellation or refund right that applies by law. Refund deadlines and other mandatory requirements apply where relevant. Bookings made with an independent provider follow that provider's applicable terms and the law governing the booking.</p>
  </> },
  { id: "journey-arrangements", title: "Your journey and special requirements", content: <>
    <p>Tell me the total number of passengers, including children, and the amount and size of luggage. Confirm the vehicle, child seats, accessibility arrangements and pickup instructions in advance. A photograph or vehicle description is not a promise that every vehicle can meet every requirement.</p>
    <p>A driver is not automatically a licensed tour guide. Guiding, admissions, meals, parking, tolls and other extras are included only where the accepted offer says so. Waiting allowances, additional-time charges and how a delayed arrival will be handled should be agreed before booking.</p>
    <p>Travel times depend on traffic, weather, road access and security restrictions. Site opening hours, border or checkpoint access and port arrangements can change. Confirm the important details for your travel date and allow sensible time for flights, ship departures and appointments. A route described on the site does not establish that every driver or vehicle may enter every area.</p>
    <p>Passengers must follow lawful safety instructions and use appropriate restraints. Threatening or unsafe conduct may require a journey to be stopped or refused, subject to the circumstances and applicable law. Report a service issue promptly so I have a reasonable opportunity to help.</p>
  </> },
  { id: "external-providers", title: "Independent providers and referrals", content: <>
    <p>Hotel, tour, attraction and transport providers reached through this website may be independent operators or booking platforms. Check which business performs the service, which business takes the booking, the full price, availability, inclusions, accessibility and cancellation terms before committing.</p>
    <p>Entering information in my enquiry form does not automatically pass it to an independent booking platform. Following a referral link or entering information in a provider widget is a separate interaction. The relevant provider's contract and privacy notice apply to that interaction, alongside any mandatory legal protections.</p>
    <p>Information about my own transport prices, reviews or cancellation terms should not be assumed to apply to a different operator. I remain responsible for my own statements and legal obligations; describing another business as independent does not remove obligations the law places on me.</p>
  </> },
  { id: "commercial-features", title: "Advertising, affiliate links and widgets", content: <>
    <p>The website may include affiliate links, sponsored banners, advertisements and third-party booking or information widgets. I may receive a commission or other compensation from a qualifying referral or advertisement. Relevant commercial relationships will be identified, including sponsored-link labels where applicable.</p>
    <p>A commercial placement does not promise the lowest price, availability, a particular result or independent endorsement. Confirm the actual offer with the identified provider. An advertisement or widget may load resources from an outside provider before you click; the <Link to="/privacy-policy/" hash="analytics-advertising">Privacy Policy</Link> explains tracking and consent choices for these features.</p>
    <p>Google Analytics and additional commercial integrations are planned or optional. Their mention in these terms is not a statement that they are all currently active. Any required notices and consent controls must be in place when the relevant features are enabled.</p>
  </> },
  { id: "travel-information", title: "Using the travel information", content: <>
    <p>I aim to provide useful local context, identify sources and distinguish confirmed information from estimates or uncertainty. Guides are general planning information. Operating schedules, fares, access conditions and entry or safety requirements may change after a page is reviewed.</p>
    <p>Check the appropriate official authority or operator for your date and circumstances. A guide does not replace personalised legal, medical, immigration or other professional advice. Hotel shortlists are editorial selections; they are not claims that I have personally stayed at every property. Tell me if you find an error so it can be reviewed.</p>
  </> },
  { id: "content-and-conduct", title: "Content, photographs and acceptable use", content: <>
    <p>Content and images belong to their respective rights holders. Some photographs and other material are used under third-party licences described in the credits. Nothing in these terms removes a permission available under an applicable licence or law. For reuse beyond those permissions, obtain the appropriate rights holder's consent.</p>
    <p>You are welcome to link to a page without falsely suggesting endorsement or a business relationship. Do not impersonate another person, submit information without authority, interfere with the website's security, distribute malicious code or unlawfully collect other people's information.</p>
    <p>A booking does not give automatic permission to publish an identifiable guest photograph or private testimonial for marketing. I seek separate permission for new promotional uses. Please contact me about a particular image, quotation or permission.</p>
  </> },
  { id: "rights-and-availability", title: "Availability and your legal rights", content: <>
    <p>The website may be interrupted or changed, and errors can occur. I do not promise uninterrupted access or that every planning detail will remain current. These practical limitations are not a waiver of responsibility for an agreed service or an excuse to disregard applicable law.</p>
    <p><strong>Nothing in these terms excludes or limits a right, remedy or liability that cannot lawfully be excluded or limited.</strong> This includes applicable consumer, privacy and other mandatory protections. These terms do not impose a blanket release for injury, negligence or data-security obligations.</p>
  </> },
  { id: "law-changes-contact", title: "Applicable law, updates and contact", content: <>
    <p>Israeli law applies to these website terms, subject to mandatory protections or jurisdiction rules that may apply to you. Disputes may be brought before a court with lawful jurisdiction; these terms do not require you to waive a forum or remedy that the law guarantees.</p>
    <p>The date at the top identifies this version. Updates address future use and new features. Updating a web page does not by itself retrospectively change the price or conditions of an already confirmed booking; any change must have a valid contractual or legal basis.</p>
    <p>For a question, correction, service issue or cancellation, contact Moshe Barak at {email}. Include enough information to identify the relevant enquiry or booking, and keep a copy of important correspondence.</p>
  </> },
];

function TermsOfUse() {
  return <LegalPage title="Terms of Use" path="/terms-of-use/" intro={<p>Please read these terms before relying on the guides, requesting a quote or arranging a service. They explain the website, direct bookings with me and interactions with outside providers.</p>} sections={sections} otherDocument={{ title: "Privacy Policy", to: "/privacy-policy/" }} />;
}
