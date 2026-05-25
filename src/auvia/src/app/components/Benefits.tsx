// import { motion, useReducedMotion } from "motion/react";
// import { CheckCircle2 } from "lucide-react";

// export function Benefits() {
//   const shouldReduceMotion = useReducedMotion();
//   const benefits = [
//     "Reduce missed calls by 95%",
//     "Increase appointment bookings by 60%",
//     "Automate clinic workflows completely",
//     "Improve patient experience dramatically",
//     "Monitor profits earned and revenue per doctor",
//   ];

//   return (
//     <section id="why" className="bg-white px-6 py-24">
//       <div className="mx-auto max-w-7xl">
//         <div className="grid items-center gap-12 lg:grid-cols-2">
//           {/* Left Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="mb-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
//               Increase Clinic Efficiency with AI
//             </h2>
//             <p className="mb-8 text-lg text-slate-600">
//               Transform your clinic operations, monitor doctors' profits and earnings, and deliver exceptional
//               patient care with AI-powered automation.
//             </p>

//             <div className="space-y-4">
//               {benefits.map((benefit, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className="flex items-start gap-4"
//                 >
//                   <div className="mt-1 rounded-full bg-emerald-100 p-1">
//                     <CheckCircle2 className="size-5 text-emerald-600" />
//                   </div>
//                   <span className="text-lg text-slate-700">{benefit}</span>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Right Illustration */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="relative"
//           >
//             <div className="relative">
//               {/* Main illustration card replaced with video */}
//               <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50 p-0 shadow-xl">
//                 <video
//                   className="w-full h-full object-cover"
//                   src="/call_logs.mp4"
//                   autoPlay
//                   loop
//                   muted
//                   playsInline
//                 />
//               </div>

//               {/* Floating stats */}
//               <motion.div
//                 whileInView={shouldReduceMotion ? { y: 0 } : { y: [0, -10, 0] }}
//                 viewport={{ amount: 0.5 }}
//                 transition={shouldReduceMotion ? undefined : { duration: 3.2, repeat: Infinity }}
//                 className="absolute -right-4 -top-4 rounded-xl border border-emerald-200 bg-white p-4 shadow-lg"
//               >
//                 <p className="text-sm font-medium text-slate-600">Efficiency Boost</p>
//                 <p className="text-3xl font-bold text-emerald-600">+95%</p>
//               </motion.div>

//               <motion.div
//                 whileInView={shouldReduceMotion ? { y: 0 } : { y: [0, -15, 0] }}
//                 viewport={{ amount: 0.5 }}
//                 transition={shouldReduceMotion ? undefined : { duration: 4.2, repeat: Infinity }}
//                 className="absolute -bottom-4 -left-4 rounded-xl border border-green-200 bg-white p-4 shadow-lg"
//               >
//                 <p className="text-sm font-medium text-slate-600">Time Saved</p>
//                 <p className="text-3xl font-bold text-green-600">40hrs/week</p>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export function Benefits() {
  const shouldReduceMotion = useReducedMotion();
  const benefits = [
    "Reduce missed calls by 95%",
    "Increase appointment bookings by 60%",
    "Automate clinic workflows completely",
    "Improve patient experience dramatically",
    "Monitor profits earned and revenue per doctor",
  ];

  return (
    <section id="why" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              Increase Clinic Efficiency with AI
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              Transform your clinic operations, monitor doctors' profits and earnings, and deliver exceptional
              patient care with AI-powered automation.
            </p>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1 rounded-full bg-emerald-100 p-1">
                    <CheckCircle2 className="size-5 text-emerald-600" />
                  </div>
                  <span className="text-lg text-slate-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main illustration card replaced with video */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50 p-0 shadow-xl">
                <video
                  className="w-full h-full object-cover"
                  src="/call_logs.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>

              {/* Floating stats */}
              <motion.div
                whileInView={shouldReduceMotion ? { y: 0 } : { y: [0, -10, 0] }}
                viewport={{ amount: 0.5 }}
                transition={shouldReduceMotion ? undefined : { duration: 3.2, repeat: Infinity }}
                className="absolute -right-4 -top-4 rounded-xl border border-emerald-200 bg-white p-4 shadow-lg"
              >
                <p className="text-sm font-medium text-slate-600">Efficiency Boost</p>
                <p className="text-3xl font-bold text-emerald-600">+95%</p>
              </motion.div>

              <motion.div
                whileInView={shouldReduceMotion ? { y: 0 } : { y: [0, -15, 0] }}
                viewport={{ amount: 0.5 }}
                transition={shouldReduceMotion ? undefined : { duration: 4.2, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 rounded-xl border border-green-200 bg-white p-4 shadow-lg"
              >
                <p className="text-sm font-medium text-slate-600">Time Saved</p>
                <p className="text-3xl font-bold text-green-600">40hrs/week</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
