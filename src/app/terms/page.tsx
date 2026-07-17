export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-6">
      <h1 className="font-heading text-3xl font-bold">Terms & Conditions</h1>
      <p className="text-gray-600 text-sm">Last updated: July 2026</p>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-semibold">Using Roamly</h2>
        <p className="text-gray-600 text-sm">
          By creating an account, you agree to provide accurate information and
          use the platform only for lawful trip discovery and listing purposes.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-semibold">Listings</h2>
        <p className="text-gray-600 text-sm">
          Users who add trip packages or destinations are responsible for the
          accuracy of the information provided. Roamly reserves the right to
          remove listings that violate these terms.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-semibold">
          Limitation of Liability
        </h2>
        <p className="text-gray-600 text-sm">
          Roamly acts as a discovery platform and is not liable for the actual
          travel services, bookings, or experiences provided by third parties.
        </p>
      </section>
    </div>
  );
}
