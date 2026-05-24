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

export function Footer() {
  const footerLinks = {
    Product: ["Features", "Security", "Integrations"],
    Company: ["About Us", "Contact Support", "LinkedIn"],
    Legal: ["Privacy Policy", "Terms of Service"],
  };

  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                Nexov
                <span className="text-primary drop-shadow-[0_0_10px_rgba(103,252,198,0.35)]">AI</span>
              </span>
            </div>
            <p className="mb-6 max-w-sm leading-relaxed text-slate-600">
              AI receptionist software for hospitals and clinics. Automate patient calls and appointments with
              intelligent voice agents.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.linkedin.com/company/nexovai1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NexovAI LinkedIn"
                className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-emerald-100 hover:text-emerald-600"
              >
                <Linkedin className="size-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.instagram.com/nexovai_pvt_limited/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NexovAI Instagram"
                className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-emerald-100 hover:text-emerald-600"
              >
                <Instagram className="size-5" />
              </motion.a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-600 transition-colors hover:text-emerald-600"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-200 pt-8 text-center">
          <p className="text-sm text-slate-600">© 2026 NexovAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
