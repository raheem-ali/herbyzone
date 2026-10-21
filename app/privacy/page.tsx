import type { Metadata } from "next";
import Legal from "@/app/components/Legal";
import { SITE } from "@/app/data/site";

export const metadata: Metadata = { title: "Privacy Policy | Herbyzone Seeds & Plants" };

export default function Privacy() {
  return (
    <Legal title="Privacy Policy" updated="October 2026">
      <p>
        This policy explains what information {SITE.name} collects when you use our website or contact us, and how we use it.
        This is a starting template. Please have it reviewed to match how your business actually works.
      </p>

      <h2>Information we collect</h2>
      <p>
        We only receive the details you choose to share when you call, message us on WhatsApp or email us: your name,
        phone number, city and the products you ask about. Our website does not have accounts or online payments.
      </p>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiries and share prices, availability and delivery details.</li>
        <li>To recommend suitable crops for your land and season.</li>
        <li>To process and deliver orders you confirm with us.</li>
      </ul>

      <h2>Sharing your information</h2>
      <p>
        We do not sell your personal information. We share it only with delivery partners when needed to complete an
        order, or when the law requires it.
      </p>

      <h2>Third-party services</h2>
      <p>
        Links to WhatsApp open a conversation on WhatsApp, which has its own privacy policy. Product photos and fonts
        may load from third-party services, which can see your IP address when your browser requests them.
      </p>

      <h2>Keeping your data</h2>
      <p>
        We keep order and enquiry records only as long as needed for service, accounting and legal reasons. Ask us at any
        time to delete your contact details.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask to see, correct or delete the information we hold about you by contacting us at{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>Changes to this policy</h2>
      <p>If we update this policy, the new version will appear on this page with a new date.</p>

      <h2>Contact</h2>
      <p>
        {SITE.name}, {SITE.address}. Phone: {SITE.phone}. Email: {SITE.email}.
      </p>
    </Legal>
  );
}