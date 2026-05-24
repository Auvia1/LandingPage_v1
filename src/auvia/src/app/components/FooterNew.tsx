import { motion } from "motion/react";
// Brand icons were removed in Lucide v1.0. We define custom inline SVG components to replace them.
function Linkedin({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Twitter({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function Instagram({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function Youtube({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
      <polygon points="10 15 15 12 10 9" />
    </svg>
  );
}

export function FooterNew() {
  return (
    <footer className="bg-gradient-to-br from-purple-800 via-purple-700 to-violet-800 px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Column */}
          <div>
            <div className="mb-6 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-white">
                <span className="text-base font-bold text-purple-700">N</span>
              </div>
              <span className="text-xl font-bold">NexovAI</span>
            </div>
            <p className="mb-6 leading-relaxed text-purple-100">
              We are a full-spectrum technology solution that solves across various aspects of both patients' and
              doctors' needs and their interactions to significantly improve health positives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-purple-100 transition-colors hover:text-white">
                  → Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-100 transition-colors hover:text-white">
                  → About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-100 transition-colors hover:text-white">
                  → Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-100 transition-colors hover:text-white">
                  → Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-100 transition-colors hover:text-white">
                  → News Room
                </a>
              </li>
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Offices</h3>
            <div className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium">Bangalore</h4>
                <p className="text-sm leading-relaxed text-purple-100">
                  Digicare Health Solutions Pvt. Ltd.,
                  <br />
                  Incubex HSR27, 1500, 19th Main Rd,
                  <br />
                  1st Sector, HSR Layout, Bangalore,
                  <br />
                  Karnataka - 560102
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-medium">Ahmedabad</h4>
                <p className="text-sm leading-relaxed text-purple-100">
                  Digicare Health Solutions Pvt. Ltd.,
                  <br />
                  4th Floor, Plot No. 115/5, TP Scheme
                  <br />
                  No. 51, off Ambli-Bopal Road,
                  <br />
                  Ahmedabad, Gujarat - 380058
                </p>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Contact Us</h3>
            <div className="mb-6 space-y-3">
              <p className="text-purple-100">
                📞 <a href="tel:+919974042363" className="hover:text-white">+91 99740 42363</a>
              </p>
              <p className="text-sm text-purple-100">Monday - Saturday | 9am to 6pm</p>
              <p className="text-purple-100">
                ✉️ <a href="mailto:support@nexovai.ai" className="hover:text-white">support@nexovai.ai</a>
              </p>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="mb-4 font-medium">Follow Us</h4>
              <div className="flex gap-3">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/20"
                >
                  <Linkedin className="size-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/20"
                >
                  <Twitter className="size-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/20"
                >
                  <Instagram className="size-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href="#"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur transition-colors hover:bg-white/20"
                >
                  <Youtube className="size-5" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-purple-600 pt-8 text-center">
          <p className="text-sm text-purple-200">© 2026 NexovAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
