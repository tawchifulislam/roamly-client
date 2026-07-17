import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-8">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 sm:grid-cols-4 gap-10">
        <div>
          <h3 className="font-heading text-xl font-bold text-white mb-3">
            Roamly
          </h3>
          <p className="text-sm text-gray-400">
            Discover curated trip packages and hidden destinations, planned
            smarter with AI.
          </p>
        </div>

        <div>
          <h4 className="font-medium text-white mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/explore" className="hover:text-white">
                All Trips
              </Link>
            </li>
            <li>
              <Link href="/explore?type=package" className="hover:text-white">
                Trip Packages
              </Link>
            </li>
            <li>
              <Link
                href="/explore?type=destination"
                className="hover:text-white"
              >
                Destinations
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-white mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-white mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Chattogram, Bangladesh</li>
            <li>
              <a href="mailto:support@roamly.com" className="hover:text-white">
                support@roamly.com
              </a>
            </li>
            <li>+880 1XXX-XXXXXX</li>
          </ul>
          <div className="flex gap-4 mt-4 text-sm">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 mt-10 pt-6 border-t border-gray-800 text-xs text-gray-500 text-center">
        © {new Date().getFullYear()} Roamly. All rights reserved.
      </div>
    </footer>
  );
}
