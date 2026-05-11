import { Link } from 'react-router-dom';
import { FaTooth, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { clinicInfo } from '../../data/mockData';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <FaTooth className="text-white text-lg" />
              </div>
              <span className="text-lg font-bold text-white">{clinicInfo.name}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{clinicInfo.description}</p>
            <div className="flex items-center gap-3">
              {[
                { icon: FaFacebook, href: clinicInfo.socialMedia.facebook },
                { icon: FaInstagram, href: clinicInfo.socialMedia.instagram },
                { icon: FaTwitter, href: clinicInfo.socialMedia.twitter },
                { icon: FaYoutube, href: clinicInfo.socialMedia.youtube },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Services', 'Doctors', 'Before & After', 'Articles', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item === 'Home' ? '' : item === 'Before & After' ? 'before-after' : item.toLowerCase()}`}
                    className="text-sm text-slate-400 hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {['Teeth Cleaning', 'Teeth Whitening', 'Dental Implants', 'Orthodontics', 'Hollywood Smile', 'Root Canal'].map((item) => (
                <li key={item}>
                  <Link to="/services" className="text-sm text-slate-400 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiPhone className="text-primary mt-0.5 shrink-0" size={16} />
                <span className="text-sm">{clinicInfo.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <FaWhatsapp className="text-green-500 mt-0.5 shrink-0" size={16} />
                <span className="text-sm">{clinicInfo.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="text-primary mt-0.5 shrink-0" size={16} />
                <span className="text-sm">{clinicInfo.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-0.5 shrink-0" size={16} />
                <span className="text-sm">{clinicInfo.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <FiClock className="text-primary mt-0.5 shrink-0" size={16} />
                <div className="text-sm">
                  <p>Mon-Fri: {clinicInfo.workingHours.weekdays}</p>
                  <p>Saturday: {clinicInfo.workingHours.saturday}</p>
                  <p>Sunday: {clinicInfo.workingHours.sunday}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">&copy; 2025 {clinicInfo.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-slate-500 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-slate-500 hover:text-primary transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
