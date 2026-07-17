export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 space-y-6">
      <h1 className="font-heading text-3xl font-bold">About Roamly</h1>
      <p className="text-gray-600">
        Roamly is a travel discovery platform built to help explorers find
        curated trip packages and hidden destinations across Bangladesh and
        beyond. We combine local travel expertise with AI-powered
        recommendations to make trip planning faster and more personal.
      </p>
      <p className="text-gray-600">
        Our mission is simple: make it easy for anyone to discover a trip that
        fits their budget, interests, and schedule — without spending hours
        comparing options.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
        <div className="border rounded-xl p-5 text-center">
          <p className="text-2xl font-bold">500+</p>
          <p className="text-sm text-gray-500">Trips Listed</p>
        </div>
        <div className="border rounded-xl p-5 text-center">
          <p className="text-2xl font-bold">50+</p>
          <p className="text-sm text-gray-500">Destinations</p>
        </div>
        <div className="border rounded-xl p-5 text-center">
          <p className="text-2xl font-bold">10k+</p>
          <p className="text-sm text-gray-500">Happy Travelers</p>
        </div>
      </div>
    </div>
  );
}
