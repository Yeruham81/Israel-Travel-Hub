import { Link, createFileRoute } from "@tanstack/react-router";
import { ExtLink } from "@/components/Layout";
import { LegalPage, legalPageMeta, type LegalSection } from "@/components/LegalPage";
import { airportTransferContact } from "@/data/registry";

export const Route = createFileRoute("/privacy-policy")({
  head: () => legalPageMeta("Privacy Policy", "/privacy-policy/", "How Moshe Barak handles travel enquiries, website data, cookies, analytics, advertising, external providers and payments, and how to contact him about your privacy."),
  component: PrivacyPolicy,
});

const email = <a href={`mailto:${airportTransferContact.email}`}>{airportTransferContact.email}</a>;

const sections: LegalSection[] = [
  { id: "responsibility", title: "Who is responsible", content: <>
    <p>I am Moshe Barak, the operator of Israel Taxi &amp; Travel and the person responsible for the use of personal information described in this policy. My transport business is based in Israel. You can contact me about this policy or your information at {email}.</p>
    <p>This notice covers this website, enquiries and services arranged directly with me. Independent booking platforms, advertisers and other providers have their own privacy notices. See also my <Link to="/terms-of-use/">Terms of Use</Link>.</p>
    <p>The sections below also cover planned or optional features, including direct form delivery, Google Analytics, advertisements, embedded widgets and online payments. Describing a feature here does not mean that it is already enabled; its availability and the choices that apply will be explained when it is offered.</p>
  </> },
  { id: "enquiries", title: "Enquiries, forms and your choices", content: <>
    <p>If you contact me, the information can include your name, email address, phone number, message and the journey details you choose to provide: dates, flight or ship details, pickup and drop-off addresses, passengers, luggage and relevant assistance or child-seat requirements.</p>
    <p>Providing information is voluntary, rather than a legal requirement to browse the guides. Fields marked as required are needed to respond or prepare the requested service; without sufficient contact or journey details I may not be able to give a quote or arrange it.</p>
    <p>Where a form offers direct submission, pressing its Send or Submit button transmits the entered details through the website's form-processing, hosting and email services so I can receive and answer your enquiry. An email acknowledgement, if provided, confirms receipt rather than a booking.</p>
    <p>The contact and quote forms send the entered details directly through this website when you press their Send button. Filling in fields does not send them. The website does not save those enquiry fields in browser storage. A success message appears only after the email service accepts the message; if sending is unavailable or cannot be confirmed, the form shows an error and retains your entered details.</p>
    <p>Give another person's details only when you have authority to do so and have told them how the information will be used. Please avoid sending passport copies, payment-card details or medical records in an ordinary enquiry. Describe practical assistance needs only to the extent needed to plan the journey.</p>
  </> },
  { id: "purposes", title: "Why information is used", content: <>
    <ul>
      <li>To answer questions, prepare quotes and communicate about your requested journey.</li>
      <li>To arrange and provide an agreed service, including necessary communication with an assigned driver or service provider.</li>
      <li>To manage payments, refunds and records when those activities apply, and meet legal, accounting and dispute-handling obligations.</li>
      <li>To deliver, maintain and secure the website, investigate errors or misuse and, where enabled and permitted, understand usage or measure advertising and referrals.</li>
    </ul>
    <p>The applicable basis depends on the activity and law: responding to your request or performing an agreement, meeting legal obligations, necessary and proportionate operational interests, or your consent where required. Consent to answer an enquiry is not consent to unrelated marketing, advertising tracking or publication of your photograph. I do not sell your enquiry details for third-party marketing.</p>
  </> },
  { id: "storage", title: "Technical data and browser storage", content: <>
    <p>Delivering a page involves processing technical request information such as an IP address, requested URL, time and browser or device headers. Hosting and security providers may retain access or diagnostic logs for delivery, security and troubleshooting.</p>
    <p>When direct form delivery is enabled, the application briefly keeps request references, hashed request fingerprints and hashed contact or network identifiers in server memory to limit abuse and repeated submissions. These checks do not save message bodies in a database or browser storage. Entries become eligible for removal after ten minutes, or are lost when the server instance restarts; the hosting and email providers may keep their own operational records.</p>
    <p>The current website uses local browser storage for a cache of public currency-reference rates and their refresh times. It also keeps a local record of up to 200 outbound-link clicks, containing page and offer identifiers and timestamps. That click-recording feature does not upload the record or include your enquiry fields. These records can remain until replaced or cleared; expiry of a rate for display does not necessarily delete the stored cache.</p>
    <p>You can block or clear this site's cookies and local storage using your browser's site-data settings. Clearing site data removes local saved records but does not delete emails already sent or records held by a service provider. Enquiries and quote requests are separate from these local records.</p>
    <p>Necessary technical storage and optional analytics or advertising storage serve different purposes. Where the law requires consent for non-essential storage or tracking, it must be obtained before that technology runs and be capable of withdrawal. This privacy notice, or simply continuing to browse, is not a substitute for that choice.</p>
  </> },
  { id: "analytics-advertising", title: "Analytics, advertising and widgets", content: <>
    <p>Google Analytics is planned for the completed website. When enabled, it may process usage events, page visits, interaction data, approximate location derived from network information, and browser or device identifiers, depending on its configuration. Google may process information on servers outside Israel. I will describe the enabled configuration and provide the consent choices required by applicable law before optional tracking is activated.</p>
    <p>Advertisements, sponsored banners, affiliate links and third-party booking or information widgets may also be added. Commercial relationships will be identified where applicable, including sponsored-link labels. A provider may receive referral identifiers when you follow a link, and an embedded widget or advertisement may contact its provider when it loads, before you click or book. Optional tracking associated with those integrations is subject to any required consent controls.</p>
    <p>When such controls are introduced, you will be able to change or withdraw optional choices through the controls provided on the site. Withdrawal applies to future processing and does not undo earlier lawful processing. Browser blocking and third-party privacy settings provide additional choices; declining optional tracking should not prevent you from reading the guides or contacting me.</p>
    <p>Google Fonts is currently used to display the site's fonts, so your browser requests font resources from Google. This can disclose connection information such as an IP address and browser headers. Read <ExtLink href="https://policies.google.com/privacy">Google's privacy policy</ExtLink> for Google's own processing information.</p>
  </> },
  { id: "recipients", title: "Recipients and outside services", content: <>
    <p>Relevant information may be handled by hosting, security, form-delivery and email providers working on my behalf. If you arrange transport with me, I may share necessary pickup, contact and journey information with the driver or provider assigned to that service. Information may also be disclosed where lawfully required, to professional advisers or to address a genuine legal or security issue.</p>
    <p>When this website offers direct form delivery, the reviewed enquiry is sent through the website's server and Brevo's transactional email service over an encrypted HTTPS connection. This includes the form's contact and journey details, the source page name and path, submission time and a request reference. A delivery confirmation means the email service accepted the message; it is not a confirmed booking or a guarantee that the message reached an inbox.</p>
    <p>Ordinary provider links do not automatically transfer the personal information you type into my enquiry forms. If you enter information into an external site or an embedded provider widget, that provider processes it under its own notice. Its terms should identify who receives your booking and who performs the service.</p>
    <p>I may earn a commission from qualifying referrals. That relationship does not give a provider permission to receive your enquiry message for unrelated marketing. Review the provider's privacy and booking terms before supplying information there.</p>
  </> },
  { id: "payments", title: "Payments now and in the future", content: <>
    <p>This website does not currently process online payments. If I arrange a service with you, payment instructions are agreed separately. Do not put full card numbers, security codes or banking passwords in a contact message.</p>
    <p>If online payment facilities are enabled later, the checkout or payment request will identify the merchant and payment provider before you confirm. Payment credentials should be entered in the provider's designated payment interface. Depending on the arrangement, I may receive billing and contact details, the amount, currency, transaction reference and payment or refund status needed to administer the booking.</p>
    <p>The payment provider's own privacy notice explains its processing, security checks and retention. I will update the relevant information before introducing a payment integration. Using a processor does not remove my own legal responsibilities.</p>
  </> },
  { id: "transfers-retention", title: "International processing, retention and security", content: <>
    <p>I operate in Israel. Hosting, email, analytics, advertising, widget and payment providers may process information in other countries as well. The applicable safeguards and transfer arrangements depend on the provider and the law governing the processing. Where safeguards or a specific lawful transfer mechanism are required, they must be in place; this notice does not treat your visit as blanket consent to any international transfer.</p>
    <p>Enquiry and service records should be kept only as long as needed for the relevant purpose, taking account of the progress of an enquiry or booking, applicable accounting and other legal duties, and a genuine need to resolve a dispute. Different providers may have their own retention periods. You can ask me about information concerning your enquiry and the retention criteria that apply.</p>
    <p>I use reasonable organisational and technical measures appropriate to the information and service. No internet transmission or storage system can be guaranteed completely secure. I will address security incidents and provide any notifications required by applicable law; this paragraph does not exclude rights or obligations that cannot lawfully be excluded.</p>
  </> },
  { id: "rights", title: "Your rights and how to contact me", content: <>
    <p>Contact me at {email} to ask about personal information relating to you, request access or correction, or raise a privacy concern. Depending on the applicable law and circumstances, you may also be entitled to deletion, restriction, objection, portability or withdrawal of consent. Some records may need to be retained to meet a legal obligation or deal with a valid claim.</p>
    <p>Describe the request and provide enough information to locate the relevant correspondence. I may need proportionate identity verification before disclosing or changing records; please do not send sensitive identity documents unless a suitable method has been agreed. Requests will be handled under the applicable legal requirements.</p>
    <p>You may contact the <ExtLink href="https://www.gov.il/he/departments/the_privacy_protection_authority">Israel Privacy Protection Authority</ExtLink>, or another competent supervisory authority where you are entitled to do so. Contacting me first is welcome but is not a condition for exercising a statutory complaint right.</p>
  </> },
  { id: "children-photos-changes", title: "Children, guest photos and policy changes", content: <>
    <p>An adult should make an enquiry or booking on behalf of a child. A child's age or practical assistance needs may be relevant to transport; detailed identity or health records are not needed in a routine enquiry. A parent or guardian can contact me about information supplied by a child.</p>
    <p>I seek separate permission before publishing new identifiable guest photographs or private testimonials for promotional purposes. Booking a journey or using the website does not itself give that permission. Contact me about an existing photograph, quotation or a change to a permission you have given.</p>
    <p>The date above identifies this version. I will update the policy when practices change, including when direct forms, analytics, advertising, widgets or payments are activated. Where a new use requires notice or consent, it will be addressed before that use begins; an update does not retrospectively turn browsing into consent.</p>
  </> },
];

function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" path="/privacy-policy/" intro={<p>This policy explains how I handle personal information when you browse Israel Taxi &amp; Travel, contact me, arrange a service or use an optional feature.</p>} sections={sections} otherDocument={{ title: "Terms of Use", to: "/terms-of-use/" }} />;
}
