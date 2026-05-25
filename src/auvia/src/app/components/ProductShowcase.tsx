// import { motion } from "motion/react";

// export function ProductShowcase() {
//   return (
//     <section id="solutions" className="bg-white px-6 py-24">
//       <div className="mx-auto max-w-7xl space-y-24">
//         {/* Admin Portal */}
//         <div className="grid items-center gap-12 lg:grid-cols-2">
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
//               For Administrators
//             </div>
//             <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">Time-Slot Booking System</h2>
//             <p className="mb-6 text-lg leading-relaxed text-slate-600">
//               Centralized admin interface to configure and manage time-slot based appointments across clinics. Create
//               and edit slot templates, set durations and capacity, manage blackout dates and staff schedules, and
//               monitor slot usage and performance in real time.
//             </p>
//             <ul className="space-y-3">
//               <li className="flex items-start gap-3">
//                 <div className="mt-1 rounded-full bg-emerald-100 p-1">
//                   <svg className="size-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <span className="text-slate-700">Define and manage clinic time slots, templates and durations</span>
//               </li>
//               <li className="flex items-start gap-3">
//                 <div className="mt-1 rounded-full bg-emerald-100 p-1">
//                   <svg className="size-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <span className="text-slate-700">Control availability with buffers, blackout dates and overrides</span>
//               </li>
//               <li className="flex items-start gap-3">
//                 <div className="mt-1 rounded-full bg-emerald-100 p-1">
//                   <svg className="size-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <span className="text-slate-700">Analytics for slot occupancy, no-shows and peak-time optimisation</span>
//               </li>
//             </ul>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <div className="border border-slate-200 p-0">
//               <video
//                 className="w-full object-cover bg-transparent block"
//                 style={{ backgroundColor: 'transparent' }}
//                 src="/slot_based.mp4"
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//               />
//             </div>
//           </motion.div>
//         </div>

//         {/* Clinic Portal */}
//         <div className="grid items-center gap-12 lg:grid-cols-2">
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="order-2 lg:order-1"
//           >
//             <div className="border border-slate-200 p-0">
//               <video
//                 className="w-full object-cover bg-transparent block"
//                 style={{ backgroundColor: 'transparent' }}
//                 src="/token_based.mp4"
//                 autoPlay
//                 loop
//                 muted
//                 playsInline
//               />
//             </div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="order-1 lg:order-2"
//           >
//             <div className="mb-4 inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
//               For Clinic Staff
//             </div>
//             <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">Token-Based Patient Flow</h2>
//             <p className="mb-6 text-lg leading-relaxed text-slate-600">
//               Clinic-facing portal optimized for a token-based queue where patients are seen in token order rather
//               than fixed time slots. Issue and manage tokens for walk-ins and scheduled arrivals, call patients in
//               order, and provide real-time wait estimates to improve throughput and patient experience.
//             </p>
//             <ul className="space-y-3">
//               <li className="flex items-start gap-3">
//                 <div className="mt-1 rounded-full bg-green-100 p-1">
//                   <svg className="size-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <span className="text-slate-700">Issue and track patient tokens for walk-ins and scheduled visits</span>
//               </li>
//               <li className="flex items-start gap-3">
//                 <div className="mt-1 rounded-full bg-green-100 p-1">
//                   <svg className="size-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <span className="text-slate-700">Queue control: call, recall, reassign tokens and mark completions</span>
//               </li>
//               <li className="flex items-start gap-3">
//                 <div className="mt-1 rounded-full bg-green-100 p-1">
//                   <svg className="size-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <span className="text-slate-700">Provide estimated wait times and patient notifications for smoother flow</span>
//               </li>
//             </ul>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { motion } from "motion/react";

export function ProductShowcase() {
  return (
    <section id="solutions" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl space-y-24">
        {/* Admin Portal */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 inline-block rounded-full bg-[#6b8e23]/10 px-4 py-1 text-sm font-medium text-[#6b8e23]">
              For Administrators
            </div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">Time-Slot Booking System</h2>
            <p className="mb-6 text-lg leading-relaxed text-slate-600">
              Centralized admin interface to configure and manage time-slot based appointments across clinics. Create
              and edit slot templates, set durations and capacity, manage blackout dates and staff schedules, and
              monitor slot usage and performance in real time.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-[#6b8e23]/10 p-1">
                  <svg className="size-4 text-[#6b8e23]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-700">Define and manage clinic time slots, templates and durations</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-[#6b8e23]/10 p-1">
                  <svg className="size-4 text-[#6b8e23]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-700">Control availability with buffers, blackout dates and overrides</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-[#6b8e23]/10 p-1">
                  <svg className="size-4 text-[#6b8e23]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-700">Analytics for slot occupancy, no-shows and peak-time optimisation</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="border border-slate-200 p-0">
              <video
                className="w-full object-cover bg-transparent block"
                style={{ backgroundColor: 'transparent' }}
                src="/slot_based.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </motion.div>
        </div>

        {/* Clinic Portal */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="border border-slate-200 p-0">
              <video
                className="w-full object-cover bg-transparent block"
                style={{ backgroundColor: 'transparent' }}
                src="/token_based.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="mb-4 inline-block rounded-full bg-[#6b8e23]/10 px-4 py-1 text-sm font-medium text-[#6b8e23]">
              For Clinic Staff
            </div>
            <h2 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">Token-Based Patient Flow</h2>
            <p className="mb-6 text-lg leading-relaxed text-slate-600">
              Clinic-facing portal optimized for a token-based queue where patients are seen in token order rather
              than fixed time slots. Issue and manage tokens for walk-ins and scheduled arrivals, call patients in
              order, and provide real-time wait estimates to improve throughput and patient experience.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-[#6b8e23]/10 p-1">
                  <svg className="size-4 text-[#6b8e23]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-700">Issue and track patient tokens for walk-ins and scheduled visits</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-[#6b8e23]/10 p-1">
                  <svg className="size-4 text-[#6b8e23]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-700">Queue control: call, recall, reassign tokens and mark completions</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-[#6b8e23]/10 p-1">
                  <svg className="size-4 text-[#6b8e23]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-slate-700">Provide estimated wait times and patient notifications for smoother flow</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
