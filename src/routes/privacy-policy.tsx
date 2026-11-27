import { Link, createFileRoute } from "@tanstack/react-router";
import { ExtLink } from "@/components/Layout";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { airportTransferContact } from "@/data/registry";

export const Route = createFileRoute("/privacy-policy")({
  head: async (ctx) => {
    const { routeHead } = await import("../route-heads/privacy-policy.head");
    return Reflect.apply(routeHead, undefined, [ctx]);
  },
  component: PrivacyPolicy,
});

const email = <a href={`mailto:${airportTransferContact.email}`}>{airportTransferContact.email}</a>;

const sections: LegalSection[] = [
  {
    id: "responsibility",
    title: "Who is responsible",
    content: (
      <>
        <p>
          I am Moshe Barak, the operator of Israel Taxi &amp; Travel, responsible for processing
          personal information as described in this policy. My transport business is based in
          Israel. You can contact me about this policy or your information at {email}.
        </p>
        <p>
          This notice covers this website, inquiries and services arranged directly with me.
          Independent booking platforms, advertisers and other providers have their own privacy
          notices. See also my <Link to="/terms-of-use/">Terms of Use</Link>.
        </p>
        <p>
          Contact and quote forms are active. Google Analytics and embedded maps and booking widgets
          are available subject to your consent choices. Advertising and online payments are not
          currently active; I will explain the relevant arrangements and choices before introducing
          them.
        </p>
      </>
    ),
  },
  {
    id: "enquiries",
    title: "Inquiries, forms and your choices",
    content: (
      <>
        <p>
          If you contact me, the information can include your name, email address, phone number,
          message and the journey details you choose to provide: dates, flight or ship details,
          pickup and drop-off addresses, passengers, luggage and relevant assistance or child-seat
          requirements.
        </p>
        <p>
          You can browse the guides without providing personal information through the inquiry
          forms. Providing this information is voluntary. Fields marked as required are needed to
          respond or prepare the requested service; without sufficient contact or journey details I
          may not be able to give a quote or arrange it.
        </p>
        <p>
          The contact and quote forms send the entered details directly through this website when
          you press their Send button. Filling in fields does not send them, and the website does
          not save those inquiry fields in browser storage. A success message appears only after the
          email service accepts the message; if sending is unavailable or cannot be confirmed, the
          form shows an error and retains your entered details. An email acknowledgement, if
          provided, confirms receipt of your inquiry only. All bookings require separate
          confirmation.
        </p>
        <p>
          Before providing another person's details, make sure you have their authorization and have
          informed them how their information will be used. Please avoid sending passport copies,
          payment-card details or medical records in an ordinary inquiry. Describe practical
          assistance needs only to the extent needed to plan the journey.
        </p>
      </>
    ),
  },
  {
    id: "purposes",
    title: "Why information is used",
    content: (
      <>
        <ul>
          <li>To answer questions, prepare quotes and communicate about your requested journey.</li>
          <li>
            To arrange and provide an agreed service, including necessary communication with an
            assigned driver or service provider.
          </li>
          <li>
            To manage payments, refunds and records when those activities apply, and meet legal,
            accounting and dispute-handling obligations.
          </li>
          <li>
            To deliver, maintain and secure the website, investigate errors or misuse and, where
            enabled and permitted, understand usage or measure advertising and referrals.
          </li>
        </ul>
        <p>
          The applicable basis depends on the activity and law: responding to your request or
          performing an agreement, meeting legal obligations, necessary and proportionate
          operational interests, or your consent where required. Consent to answer an inquiry is not
          consent to unrelated marketing, advertising tracking or publication of your photograph. I
          do not sell your inquiry details for third-party marketing.
        </p>
      </>
    ),
  },
  {
    id: "storage",
    title: "Technical data and browser storage",
    content: (
      <>
        <p>
          Delivering a page involves processing technical request information such as an IP address,
          requested URL, time and browser or device headers. Hosting and security providers may
          retain access or diagnostic logs for delivery, security and troubleshooting.
        </p>
        <p>
          For direct form delivery, the application briefly keeps request references, hashed request
          fingerprints and hashed contact or network identifiers in server memory to limit abuse and
          repeated submissions. These checks do not save message bodies in a database or browser
          storage. Entries become eligible for removal after ten minutes, or are lost when the
          server instance restarts; the hosting and email providers may keep their own operational
          records.
        </p>
        <p>
          The current website uses local browser storage for a cache of public currency-reference
          rates and their refresh times. With Analytics permission, it also keeps a local record of
          up to 200 outbound-link clicks, containing page and offer identifiers and timestamps. That
          click-recording feature does not upload the record or include your inquiry fields. These
          records can remain until replaced or cleared; expiry of a rate for display does not
          necessarily delete the stored cache.
        </p>
        <p>
          Your category choices are saved locally for up to 180 days. Use Cookie settings in the
          footer to accept all optional categories, allow essential storage only, or select
          individual categories. Optional categories are off until you approve them. You can change
          or withdraw your choices at any time. Withdrawing Analytics permission also clears the
          site's local click record and accessible Google Analytics cookies. You can clear other
          saved cookies and storage using your browser's site-data settings.
        </p>
        <p>
          Essential technical storage and optional analytics or advertising storage serve different
          purposes. Where the law requires consent for non-essential storage or tracking, it must be
          obtained before that technology runs and be capable of withdrawal. This privacy notice, or
          simply continuing to browse, is not a substitute for that choice.
        </p>
      </>
    ),
  },
  {
    id: "analytics-advertising",
    title: "Analytics, advertising and widgets",
    content: (
      <>
        <p>
          Cookie settings cover all optional services embedded in this website. Essential storage
          supports page delivery, security, inquiry forms, a public currency-rate cache and your
          saved preferences. Analytics covers Google Analytics and local interaction records.
          External content covers Google Maps and interactive maps using MapLibre,
          OpenStreetMap-derived data and external map services. The Booking widgets category covers
          Travelpayouts widgets for Booking.com, Agoda, GetYourGuide and DiscoverCars. Advertising
          is a separate category for future advertising services, such as Google AdSense.
        </p>
        <p>
          Advertising is currently inactive. No AdSense tag or advertising request is loaded by this
          website. Before introducing ads, I will identify the providers, update this notice and
          request the relevant provider and purpose choices through the applicable consent service.
          An earlier approval of booking widgets does not grant advertising permission. Advertising
          cookies, use of advertising-related data and ad personalisation are controlled separately
          from Analytics; any ad-personalisation choice will also depend on the advertising
          provider's consent controls.
        </p>
        <p>
          The website loads optional maps and booking widgets only after you approve their category,
          and removes them when that permission is withdrawn. Google Analytics is active on the
          production website and runs only after you grant Analytics permission. Inquiry forms, the
          guides and ordinary links remain available with essential cookies only. You can change or
          withdraw your choices through Cookie settings in the footer.
        </p>
        <p>
          When you allow it, Google Analytics can process page visits, interaction events, an
          inquiry-success event, approximate location derived from network information, and browser
          or device identifiers. It can use first-party cookies to distinguish users and sessions.
          The site's custom page-view events use page addresses without query strings or fragments.
          Named campaign source, medium and labels may be included for links carrying standard
          campaign parameters. Its custom inquiry event includes the form type, without your name,
          email, phone number, message, journey details or request reference. Google may process
          information on servers outside Israel. Advertising consent, Google signals and advertising
          personalisation are not enabled by this integration.
        </p>
        <p>
          The website may include outbound booking links, advertisements and embedded booking or
          information widgets. A provider may receive referral identifiers when you follow an
          external link, while an embedded widget or advertisement may contact its provider when it
          loads. Optional tracking associated with these features is subject to any required consent
          controls.
        </p>
        <p>
          Ordinary external links, including affiliate booking links, remain available with every
          choice. Following one opens the provider's website, where its own cookies and privacy
          choices apply. An approved embedded widget may contact its provider and use cookies,
          identifiers or referral tracking. Withdrawal stops future use of that category on this
          website; it does not erase information already received by an external provider. Your
          browser's site-data controls and the provider's own privacy settings offer further
          choices.
        </p>
        <p>
          The fonts used for this website are served locally. Read{" "}
          <ExtLink href="https://policies.google.com/privacy">Google's privacy policy</ExtLink> for
          information about Google's own processing when you allow Google Analytics or use another
          Google service.
        </p>
      </>
    ),
  },
  {
    id: "recipients",
    title: "Recipients and outside services",
    content: (
      <>
        <p>
          Relevant information may be handled by hosting, security, form-delivery and email
          providers working on my behalf. If you arrange transport with me, I may share necessary
          pickup, contact and journey information with the driver or provider assigned to that
          service. Information may also be disclosed where lawfully required, to professional
          advisers or to address a genuine legal or security issue.
        </p>
        <p>
          Your inquiry is sent through the website's server and a transactional email service over
          an encrypted HTTPS connection, then to my business mailbox hosted by Hostinger Email. This
          includes the form's contact and journey details, source page information, submission time
          and a request reference. These providers may keep message content and delivery records
          under their own retention settings and policies. Acceptance by the email service does not
          guarantee delivery to an inbox.
        </p>
        <p>
          Submitting an inquiry does not subscribe you to marketing communications or install the
          email service's website tracking script.
        </p>
        <p>
          Ordinary provider links do not automatically transfer the personal information you type
          into my inquiry forms. If you enter information into an external site or an embedded
          provider widget, that provider processes it under its own notice. Its terms should
          identify who receives your booking and who performs the service.
        </p>
        <p>
          Using an external booking service does not give its provider permission to receive your
          inquiry message for unrelated marketing. Review the provider's privacy and booking terms
          before supplying information there.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    title: "Payments now and in the future",
    content: (
      <>
        <p>
          This website does not currently process online payments. If I arrange a service with you,
          payment instructions are agreed separately. Do not put full card numbers, security codes
          or banking passwords in a contact message.
        </p>
        <p>
          If online payment facilities are enabled later, the checkout or payment request will
          identify the merchant and payment provider before you confirm. Payment credentials should
          be entered in the provider's designated payment interface. Depending on the arrangement, I
          may receive billing and contact details, the amount, currency, transaction reference and
          payment or refund status needed to administer the booking.
        </p>
        <p>
          The payment provider's privacy notice explains how it processes, protects and retains
          personal information. I will update the relevant information before introducing a payment
          integration. Using a processor does not remove my own legal responsibilities.
        </p>
      </>
    ),
  },
  {
    id: "transfers-retention",
    title: "International processing, retention and security",
    content: (
      <>
        <p>
          I operate in Israel. Hosting, email, analytics, advertising, widget and payment providers
          may process information in other countries as well. The applicable safeguards and transfer
          arrangements depend on the provider and the law governing the processing. Where safeguards
          or a specific lawful transfer mechanism are required, they must be in place; this notice
          does not treat your visit as blanket consent to any international transfer.
        </p>
        <p>
          Inquiry and service records should be kept only as long as needed for the relevant
          purpose, taking account of the progress of an inquiry or booking, applicable accounting
          and other legal duties, and a genuine need to resolve a dispute. Different providers may
          have their own retention periods. You can ask me about information concerning your inquiry
          and the retention criteria that apply.
        </p>
        <p>
          I use reasonable organisational and technical measures appropriate to the information and
          service. No internet transmission or storage system can be guaranteed completely secure. I
          will address security incidents and provide any notifications required by applicable law;
          this paragraph does not exclude rights or obligations that cannot lawfully be excluded.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "Your rights and how to contact me",
    content: (
      <>
        <p>
          Contact me at {email} to ask about personal information relating to you, request access or
          correction, or raise a privacy concern. Depending on the applicable law and circumstances,
          you may also be entitled to deletion, restriction, objection, portability or withdrawal of
          consent. Some records may need to be retained to meet a legal obligation or deal with a
          valid claim.
        </p>
        <p>
          Please describe your request and include sufficient information to identify the relevant
          correspondence. I may need proportionate identity verification before disclosing or
          changing records; please do not send sensitive identity documents unless a suitable method
          has been agreed. Requests will be handled under the applicable legal requirements.
        </p>
        <p>
          You may contact the{" "}
          <ExtLink href="https://www.gov.il/he/departments/the_privacy_protection_authority">
            Israel Privacy Protection Authority
          </ExtLink>
          , or another competent supervisory authority where you are entitled to do so. Contacting
          me first is welcome but is not a condition for exercising a statutory complaint right.
        </p>
      </>
    ),
  },
  {
    id: "children-photos-changes",
    title: "Children, guest photos and policy changes",
    content: (
      <>
        <p>
          An adult should make an inquiry or booking on behalf of a child. A child's age or
          practical assistance needs may be relevant to transport; detailed identity or health
          records are not needed in a routine inquiry. A parent or guardian can contact me about
          information supplied by a child.
        </p>
        <p>
          I seek separate permission before publishing new identifiable guest photographs or private
          testimonials for promotional purposes. Booking a journey or using the website does not
          itself give that permission. Contact me about an existing photograph, quotation or a
          change to a permission you have given.
        </p>
        <p>
          The date at the top of this page identifies the current version of this policy. I will
          update the policy when data-handling practices change, including before introducing
          advertising or online payments. Where a new use requires notice or consent, it will be
          addressed before that use begins; an update does not retrospectively turn browsing into
          consent.
        </p>
      </>
    ),
  },
];

function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy/"
      updatedAt="2026-11-27"
      intro={
        <p>
          This policy explains how I handle personal information when you browse Israel Taxi &amp;
          Travel, contact me, arrange a service or use an optional feature.
        </p>
      }
      sections={sections}
      otherDocument={{ title: "Terms of Use", to: "/terms-of-use/" }}
    />
  );
}
