import { Link } from 'react-router-dom';
import {
  Leaf, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube,
  ArrowRight, ShieldCheck, Truck, Banknote, Headphones
} from 'lucide-react';

const FOOTER_LINKS = {
  Platform: [
    { label: 'Browse Products',   to: '/browse'          },
    { label: 'Market Prices',     to: '/market-prices'   },
    { label: 'For Farmers',       to: '/for-farmers'     },
    { label: 'For Buyers',        to: '/for-buyers'      },
    { label: 'Become a Partner',  to: '/partners'        },
  ],
  Company: [
    { label: 'About Us',          to: '/about'           },
    { label: 'Careers',           to: '/careers'         },
    { label: 'Press & Media',     to: '/press'           },
    { label: 'Impact Report',     to: '/impact'          },
    { label: 'Blog',              to: '/blog'            },
  ],
  Support: [
    { label: 'Help Center',       to: '/help'            },
    { label: 'Farmer Support',    to: '/farmer-support'  },
    { label: 'Buyer Support',     to: '/buyer-support'   },
    { label: 'Track Order',       to: '/track-order'     },
    { label: 'Return Policy',     to: '/returns'         },
  ],
  Legal: [
    { label: 'Privacy Policy',    to: '/privacy'         },
    { label: 'Terms of Service',  to: '/terms'           },
    { label: 'Cookie Policy',     to: '/cookies'         },
    { label: 'Grievance Officer', to: '/grievance'       },
  ],
};

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'Verified Farmers' },
  { icon: Truck,       label: 'Tracked Delivery' },
  { icon: Banknote,    label: 'Secure Payments'  },
  { icon: Headphones,  label: '24/7 Support'     },
];

const SOCIAL = [
  { icon: Facebook,  href: '#', label: 'Facebook'  },
  { icon: Twitter,   href: '#', label: 'Twitter'   },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube,   href: '#', label: 'YouTube'   },
];

export default function Footer() {
  return (
    <footer className="bg-kd-earth text-gray-300">

      {/* Trust strip */}
      <div className="border-b border-white/10">
        <div className="container-kd py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-kd-green-700/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-kd-green-400" />
                </div>
                <span className="text-sm font-medium text-white">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container-kd py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-kd-green-700 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="font-display font-bold text-2xl text-white block">Kisan Direct</span>
                <span className="text-kd-amber-500 text-xs font-medium">From Farm to Family</span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              India's most trusted Farmer-to-Consumer Marketplace. Eliminating middlemen since 2022.
              Empowering <span className="text-kd-green-400 font-semibold">48,000+ farmers</span> across
              India to sell directly and earn more.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold text-white mb-2">Get market price alerts</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 text-sm outline-none focus:border-kd-amber-500 transition-colors"
                />
                <button className="px-4 py-2.5 bg-kd-amber-500 text-kd-earth rounded-xl font-semibold text-sm hover:bg-kd-amber-400 transition-colors flex-shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-kd-green-700 hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">{category}</h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-kd-green-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Contact bar */}
      <div className="border-t border-white/10">
        <div className="container-kd py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <a href="tel:+918001234567" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-kd-green-500" />
                +91 800 123 4567
              </a>
              <a href="mailto:support@kisandirect.in" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-kd-green-500" />
                support@kisandirect.in
              </a>
              <span className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-kd-green-500" />
                Bengaluru, India
              </span>
            </div>
            <div className="flex items-center gap-3">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Simple_icon_phone.svg/32px-Simple_icon_phone.svg.png" alt="App Store" className="h-7 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
              <span className="text-xs text-gray-500">App coming soon</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-kd py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <span>© 2026 Kisan Direct. All rights reserved. Made with ❤️ for Indian farmers.</span>
            <div className="flex items-center gap-1">
              <span>Supported by</span>
              <span className="text-kd-amber-500 font-semibold ml-1">Ministry of Agriculture, GoI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
