import type { Metadata } from "next";
import Legal from "@/app/components/Legal";
import { SITE } from "@/app/data/site";

export const metadata: Metadata = { title: "Terms & Conditions | Herbyzone Seeds & Plants" };

export default function Terms() {
  return (
    <Legal title="Terms & Conditions" updated="October 2026">
      <p>
        By using this website or ordering from {SITE.name}, you agree to these terms. This is a starting template.
        Please have it reviewed to match your actual policies.
      </p>

      <h2>Products and information</h2>
      <p>
        Product descriptions, sowing seasons, harvest times and pack sizes are general guidance. Results depend on soil,
        water, weather and farming practice, so yields and timings can vary.
      </p>

      <h2>Prices and availability</h2>
      <p>
        Prices are not fixed on the website. We confirm price and availability by phone or WhatsApp before you order.
        Stock can change, and we may update prices without notice.
      </p>

      <h2>Orders and payment</h2>
      <p>
        An order is confirmed only after we agree the products, quantity, price and delivery details with you.
        Payment terms are shared at the time of confirmation.
      </p>

      <h2>Delivery</h2>
      <p>
        We deliver across Pakistan. Delivery time and charges depend on your city and order size, and we confirm them
        before dispatch. Please check your order on arrival and tell us about any damage right away.
      </p>

      <h2>Returns and replacements</h2>
      <p>
        Seeds and live plants are perishable. If you receive damaged or wrong items, contact us within 48 hours with
        photos and we will arrange a replacement or resolution. We cannot accept returns for seed that has been sown.
      </p>

      <h2>Liability</h2>
      <p>
        We supply quality seeds and plants, but we cannot guarantee crop results or income. Our liability is limited
        to the value of the products you purchased.
      </p>

      <h2>Changes to these terms</h2>
      <p>We may update these terms from time to time. The latest version is always on this page.</p>

      <h2>Contact</h2>
      <p>
        Questions? Reach us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or {SITE.phone}.
      </p>
    </Legal>
  );
}