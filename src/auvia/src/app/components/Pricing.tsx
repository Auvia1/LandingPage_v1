// import { useState, useRef } from "react";
// import { motion } from "motion/react";
// import { Check, Star } from "lucide-react";
// import { cn } from "./ui/utils";
// import { buttonVariants } from "./ui/button";
// import { Label } from "./ui/label";
// import { Switch } from "./ui/switch";
// import confetti from "canvas-confetti";
// import NumberFlow from "@number-flow/react";

// const MONTHLY_PLANS = [
//   {
//     name: "STARTER",
//     description: "Perfect for small clinics",
//     price: 25000,
//     yearlyPrice: 22500,
//     period: "month",
//     features: [
//       "AI call handling (3,000 calls/month)",
//       "₹6 per additional call after limit",
//       "Appointment automation",
//       "WhatsApp payment link for patients",
//       "24/7 AI receptionist availability through calls and WhatsApp bot",
//       "Analytics dashboard",
//       "Email support",
//     ],
//     buttonText: "Book a Demo",
//     href: "#",
//     isPopular: false,
//     currency: "₹",
//   },
//   {
//     name: "PRO",
//     description: "For growing clinics",
//     price: 45000,
//     yearlyPrice: 40500,
//     period: "month",
//     features: [
//       "AI call handling (7,000 calls/month)",
//       "₹6 per additional call after limit",
//       "Appointment automation",
//       "WhatsApp payment link for patients",
//       "24/7 AI receptionist availability through calls and WhatsApp bot",
//       "Analytics dashboard",
//       "Priority support",
//     ],
//     buttonText: "Book a Demo",
//     href: "#",
//     isPopular: true,
//     currency: "₹",
//   },
//   {
//     name: "ENTERPRISE",
//     description: "For hospitals & large clinics",
//     price: 0,
//     yearlyPrice: 0,
//     period: "custom",
//     features: [
//       "Custom AI call volume",
//       "Custom channels & workflow customization",
//       "Appointment automation",
//       "WhatsApp payment link for patients",
//       "24/7 AI receptionist availability through calls and WhatsApp bot",
//       "Analytics dashboard",
//       "Dedicated support",
//     ],
//     buttonText: "Contact Us",
//     href: "#",
//     isPopular: false,
//     currency: "",
//   },
// ];

// export function Pricing({ onOpenForm }: { onOpenForm: () => void }) {
//   const [isMonthly, setIsMonthly] = useState(true);
//   const switchRef = useRef<HTMLButtonElement>(null);

//   function handleToggle(checked: boolean) {
//     setIsMonthly(!checked);
//     if (checked && switchRef.current) {
//       const rect = switchRef.current.getBoundingClientRect();
//       confetti({
//         particleCount: 60,
//         spread: 60,
//         origin: {
//           x: (rect.left + rect.width / 2) / window.innerWidth,
//           y: (rect.top + rect.height / 2) / window.innerHeight,
//         },
//         colors: ["#6B8E23", "#9DBEB9", "#E6EFEC", "#E2E8F0"],
//         ticks: 200,
//         gravity: 1.2,
//         decay: 0.94,
//         startVelocity: 30,
//         shapes: ["circle"],
//       });
//     }
//   }

//   const plans = MONTHLY_PLANS;

//   return (
//     <section id="pricing" className="bg-gradient-to-b from-background to-secondary/40 px-6 py-24">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mb-10 text-center space-y-4"
//         >
//           <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
//             Choose Your Level of Calm
//           </h2>
//           <p className="mx-auto max-w-2xl text-lg text-slate-600">
//             A simple, transparent investment in a smoother patient flow.
//           </p>
//         </motion.div>

//         {/* Monthly / Annual toggle */}
//         <div className="flex items-center justify-center gap-3 mb-12">
//           <Label htmlFor="billing-toggle" className="text-sm font-medium text-slate-600">Monthly</Label>
//           <Switch
//             id="billing-toggle"
//             ref={switchRef}
//             checked={!isMonthly}
//             onCheckedChange={handleToggle}
//             className="data-[state=checked]:bg-primary"
//           />
//           <span className="text-sm font-semibold text-slate-700">
//             Annual <span className="text-primary">(Save 10%)</span>
//           </span>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-3 items-stretch">
//           {plans.map((plan, index) => (
//             <motion.div
//               key={plan.name}
//               initial={{ y: 50, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1, scale: 1 }}
//               whileHover={{ y: -6 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.7, type: "spring", stiffness: 90, damping: 22, delay: index * 0.1 }}
//               className={cn(
//                 "relative flex h-full flex-col rounded-[2rem] border bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg",
//                 plan.isPopular
//                   ? "border-primary ring-2 ring-primary/20 z-10"
//                   : "border-slate-200 z-0",
//               )}
//             >
//               {plan.isPopular && (
//                 <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5">
//                   <Star className="h-3.5 w-3.5 fill-white text-white" />
//                   <span className="text-xs font-bold text-white">Most Harmonious</span>
//                 </div>
//               )}

//               <p className="text-sm font-semibold tracking-widest text-slate-500">{plan.name}</p>
//               <p className="mt-1 text-sm text-slate-500">{plan.description}</p>

//               {/* Price */}
//               <div className="mt-6 flex items-baseline gap-1">
//                 {plan.period === "custom" ? (
//                   <span className="text-4xl font-bold text-slate-900">Custom Pricing</span>
//                 ) : (
//                   <>
//                     <span className="text-2xl font-bold text-slate-900">{plan.currency}</span>
//                     <NumberFlow
//                       value={isMonthly ? plan.price : plan.yearlyPrice}
//                       format={{ useGrouping: true }}
//                       transformTiming={{ duration: 500, easing: "ease-out" }}
//                       willChange
//                       className="text-4xl font-bold text-slate-900 tabular-nums"
//                     />
//                     <span className="text-sm font-medium text-slate-500">/ month</span>
//                   </>
//                 )}
//               </div>
//               {plan.period !== "custom" && (
//                 <p className="mt-0.5 text-xs text-slate-400">
//                   {isMonthly ? "billed monthly" : "billed annually"}
//                 </p>
//               )}

//               {/* Features */}
//               <ul className="mt-6 flex flex-col gap-2.5 flex-1">
//                 {plan.features.map((feature) => (
//                   <li key={feature} className="flex items-start gap-2">
//                     <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
//                     <span className="text-sm text-slate-600">{feature}</span>
//                   </li>
//                 ))}
//               </ul>

//               <hr className="my-5 border-slate-100" />

//               <button
//                 onClick={onOpenForm}
//                 className={cn(
//                   buttonVariants({ variant: "outline" }),
//                   "w-full justify-center rounded-full text-sm font-semibold transition-all duration-300",
//                   "hover:ring-2 hover:ring-primary hover:ring-offset-1",
//                   plan.isPopular
//                     ? "bg-primary text-white border-primary hover:opacity-95"
//                     : "bg-white text-slate-800 hover:bg-secondary",
//                 )}
//               >
//                 {plan.buttonText}
//               </button>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import { motion } from "motion/react";
import { Star } from "lucide-react";
import { cn } from "./ui/utils";
import { buttonVariants } from "./ui/button";

export function Pricing({ onOpenForm }: { onOpenForm: () => void }) {
  return (
    <section id="pricing" className="bg-gradient-to-b from-background to-secondary/40 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center space-y-4"
        >
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            A simple, transparent investment in a smoother patient flow.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", stiffness: 90, damping: 22 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white p-8 md:p-12 shadow-sm hover:shadow-xl transition-shadow duration-500"
        >
          {/* Subtle Decorative Background Gradient elements */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 h-40 w-40 rounded-full bg-[#6b8e23]/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-40 w-40 rounded-full bg-[#6b8e23]/5 blur-3xl pointer-events-none" />

          {/* Popular Tag / Decorative badge */}
          <div className="absolute right-8 top-8 hidden sm:flex items-center gap-1.5 rounded-full bg-[#6b8e23]/10 px-3.5 py-1 text-[#6b8e23]">
            <Star className="h-4 w-4 fill-[#6b8e23] text-[#6b8e23]" />
            <span className="text-xs font-bold tracking-wide uppercase">All-In-One Plan</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Side: Pricing Details */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div>
                <span className="text-xs font-bold tracking-wider text-[#6b8e23] uppercase bg-[#6b8e23]/10 px-3 py-1 rounded-full sm:hidden inline-block mb-4">
                  All-In-One Plan
                </span>
                <h3 className="text-2xl font-bold text-slate-900">Standard Plan</h3>
                <p className="mt-2 text-slate-500 text-sm">Everything you need to automate your clinic's call handling.</p>
                
                {/* Price Display */}
                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-slate-900">₹</span>
                  <span className="text-5xl font-extrabold text-slate-900 tracking-tight">5,000</span>
                  <span className="text-base font-semibold text-slate-500">/ month</span>
                </div>
                <p className="mt-2 text-xs text-[#6b8e23] font-medium bg-[#6b8e23]/5 inline-block px-2.5 py-1 rounded-md">
                  Starting Subscription Fee
                </p>
              </div>

              {/* Pricing breakdown list */}
              <div className="space-y-5 border-t border-slate-100 pt-6">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Pricing Details</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#6b8e23] mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Software Subscription Fee</p>
                      <p className="text-sm text-slate-600 mt-0.5">₹5,000 per month</p>
                      <ul className="mt-1 ml-4 list-disc list-inside space-y-0.5 text-xs text-slate-500">
                        <li>Includes 1 channel (can handle 1 call at a time)</li>
                        <li>Includes 200 minutes of talk time for the first month</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#6b8e23] mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Additional Channel</p>
                      <p className="text-sm text-slate-600 mt-0.5">₹1,500 per channel per month</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#6b8e23] mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Usage Charges</p>
                      <p className="text-sm text-slate-600 mt-0.5">₹5 per minute <span className="text-slate-400 text-xs">(equivalent to 1 credit)</span></p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#6b8e23] mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Credit Top-Up & Rollover</p>
                      <p className="text-sm text-slate-600 mt-0.5">Additional credits can be purchased at any time. Unused credits do not expire.</p>
                      <p className="text-xs text-[#6b8e23] italic font-semibold mt-1">
                        *Unused credits will be added Cumulatively to the subsequent months*
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Value Prop & Checklist */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50/70 rounded-3xl p-6 md:p-8 border border-slate-100">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Why Clinics Choose Auvia</h4>
                  <p className="text-sm leading-relaxed text-slate-600 font-medium">
                    We help clinics ensure that every patient call is answered, even outside business hours.
                  </p>
                </div>

                {/* Benefits List */}
                <ul className="space-y-3.5">
                  {[
                    "24/7 call handling",
                    "No missed patient inquiries or appointments",
                    "Appointment booking and rescheduling support",
                    "Instant responses to common patient questions",
                    "Reduced front-desk workload and improved patient experience"
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-emerald-600 mt-0.5 text-base shrink-0 select-none">✅</span>
                      <span className="text-sm text-slate-700 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <button
                  onClick={onOpenForm}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full justify-center rounded-full text-sm font-semibold transition-all duration-300 py-6",
                    "hover:ring-2 hover:ring-[#6b8e23] hover:ring-offset-1 bg-[#6b8e23] text-white border-[#6b8e23] hover:opacity-95"
                  )}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Book a Demo
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2">
                  No credit card required. Free setup guidance.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
