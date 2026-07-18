import Link from 'next/link';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Logo from '@/components/Logo';
import Container from '@/components/Container';
import { FacebookIcon, InstagramIcon, XIcon } from '@/components/SocialIcons';

const exploreLinks = [
  { label: 'All Trips', href: '/explore' },
  { label: 'Trip Packages', href: '/explore?type=package' },
  { label: 'Destinations', href: '/explore?type=destination' },
  { label: 'AI Recommendations', href: '/recommendations' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
];

const socialLinks = [
  { Icon: FacebookIcon, href: 'https://facebook.com', label: 'Facebook' },
  { Icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { Icon: XIcon, href: 'https://twitter.com', label: 'X' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <Container className="pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Discover curated trip packages and hidden destinations, planned
              smarter with AI. Your next journey starts here.
            </p>
            <div className="flex gap-3 pt-1">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-gray-300 hover:bg-teal-700 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              {exploreLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm tracking-wide">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {companyLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 text-teal-500 shrink-0" />
                Chattogram, Bangladesh
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-teal-500 shrink-0" />
                <a
                  href="mailto:support@roamly.com"
                  className="hover:text-orange-400 transition-colors"
                >
                  support@roamly.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-teal-500 shrink-0" />
                +880 1XXX-XXXXXX
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Roamly. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Send size={12} className="text-teal-500" />
            Powered by AI-driven trip planning
          </div>
        </div>
      </Container>
    </footer>
  );
}
