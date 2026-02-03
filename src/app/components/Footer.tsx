import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
import logoImage from '/logo.png';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5 }
};

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {/* Company Info */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <Link to="/">
              <motion.img
                src={logoImage}
                alt="CodingBits"
                className="h-10 w-auto mb-4"
                whileHover={{ scale: 1.05 }}
              />
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              A technology services company building modern digital solutions for startups and businesses.
            </p>
            <div className="flex items-center space-x-4">
              <motion.a
                href="https://www.linkedin.com/in/adarshkumarpandey19101/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-white hover:translate-x-1 transition-all inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm hover:text-white hover:translate-x-1 transition-all inline-block">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm hover:text-white hover:translate-x-1 transition-all inline-block">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-white hover:translate-x-1 transition-all inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#web-development" className="text-sm hover:text-white hover:translate-x-1 transition-all inline-block">
                  Website Development
                </Link>
              </li>
              <li>
                <Link to="/services#mobile-development" className="text-sm hover:text-white hover:translate-x-1 transition-all inline-block">
                  Mobile Applications
                </Link>
              </li>
              <li>
                <Link to="/services#ai-automation" className="text-sm hover:text-white hover:translate-x-1 transition-all inline-block">
                  AI & Automation
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:adarshpandey@codingbits.in"
                  className="flex items-center space-x-2 text-sm hover:text-white transition-colors group"
                >
                  <Mail size={16} className="group-hover:scale-110 transition-transform" />
                  <span>adarshpandey@codingbits.in</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+918810220691"
                  className="flex items-center space-x-2 text-sm hover:text-white transition-colors group"
                >
                  <Phone size={16} className="group-hover:scale-110 transition-transform" />
                  <span>+91 8810220691</span>
                </a>
              </li>
              <li className="text-sm text-gray-400">
                India
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © 2023–Present CodingBits. Founded by Adarsh Kumar Pandey.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/privacy-policy" className="text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="text-sm hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
}
