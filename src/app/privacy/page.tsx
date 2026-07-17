export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-6">
      <h1 className="font-heading text-3xl font-bold">Privacy Policy</h1>
      <p className="text-gray-600 text-sm">Last updated: July 2026</p>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-semibold">
          Information We Collect
        </h2>
        <p className="text-gray-600 text-sm">
          We collect your name, email, and trip preferences when you create an
          account or add a trip listing, to provide personalized recommendations
          and manage your account.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-semibold">
          How We Use Your Data
        </h2>
        <p className="text-gray-600 text-sm">
          Your data is used to operate your account, personalize AI
          recommendations, and improve our platform. We do not sell your
          personal information to third parties.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-heading text-lg font-semibold">Your Rights</h2>
        <p className="text-gray-600 text-sm">
          You may request access to, correction of, or deletion of your personal
          data at any time by contacting support@roamly.com.
        </p>
      </section>
    </div>
  );
}
