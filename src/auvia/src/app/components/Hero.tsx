// import { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence, useReducedMotion } from "motion/react";
// import { ArrowRight, LayoutDashboard, Calendar, Phone, Bell, Search, ToggleRight, ChevronRight } from "lucide-react";
// import { Button } from "./ui/button";

// const tabs = ["Dashboard", "Schedule", "Calls & Logs"] as const;
// const rotatingTitles = ["Effortless", "Intelligent", "Always-On", "Automated", "Modern"] as const;
// type Tab = (typeof tabs)[number];

// function RotatingHeadline() {
//   const [titleNumber, setTitleNumber] = useState(0);
//   const shouldReduceMotion = useReducedMotion();

//   useEffect(() => {
//     if (shouldReduceMotion) return;

//     const id = window.setTimeout(() => {
//       setTitleNumber((n) => (n === rotatingTitles.length - 1 ? 0 : n + 1));
//     }, 3200);

//     return () => window.clearTimeout(id);
//   }, [shouldReduceMotion, titleNumber]);

//   if (shouldReduceMotion) {
//     return (
//       <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
//         Intelligent
//       </span>
//     );
//   }

//   return (
//     <span className="relative inline-flex min-w-[11ch] overflow-hidden pr-1">
//       {rotatingTitles.map((title, index) => (
//         <motion.span
//           key={title}
//           className="absolute left-0 top-0 bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent"
//           initial={{ opacity: 0, y: 80 }}
//           transition={{ type: "spring", stiffness: 60, damping: 18 }}
//           animate={
//             titleNumber === index
//               ? { y: 0, opacity: 1 }
//               : { y: titleNumber > index ? -80 : 80, opacity: 0 }
//           }
//         >
//           {title}
//         </motion.span>
//       ))}
//       <span className="invisible">Automated</span>
//     </span>
//   );
// }

// function DashboardScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
//   return (
//     <div className="flex h-full overflow-hidden rounded-xl bg-[#f8fafb] text-[11px]">
//       {/* Sidebar */}
//       <div className="flex w-[120px] shrink-0 flex-col border-r border-slate-200 bg-white px-3 py-4">
//         <div className="mb-5 px-1">
//           <span className="text-[12px] font-bold tracking-tight text-slate-800">
//             Nexov<span className="text-emerald-600">AI</span>
//           </span>
//         </div>
//         <p className="mb-1 px-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">Clinic Ops</p>
//         <button
//           type="button"
//           onClick={() => onNavigate("Dashboard")}
//           className="mb-1 flex w-full items-center gap-1.5 rounded-md bg-emerald-50 px-1.5 py-1 text-left font-medium text-emerald-700"
//         >
//           <LayoutDashboard className="size-2.5" /><span className="text-[9px]">Dashboard</span>
//         </button>
//         <button
//           type="button"
//           onClick={() => onNavigate("Schedule")}
//           className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-slate-500 hover:bg-slate-50"
//         >
//           <Calendar className="size-2.5" /><span className="text-[9px]">Schedule</span>
//         </button>
//         <p className="mb-1 mt-4 px-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">Virtual Asst.</p>
//         <button
//           type="button"
//           onClick={() => onNavigate("Calls & Logs")}
//           className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-slate-500 hover:bg-slate-50"
//         >
//           <Phone className="size-2.5" /><span className="text-[9px]">Calls &amp; Logs</span>
//           <span className="ml-auto rounded-full bg-emerald-500 px-1.5 text-[8px] font-bold text-white">12</span>
//         </button>
//       </div>

//       {/* Main */}
//       <div className="flex flex-1 flex-col overflow-hidden">
//         {/* Top bar */}
//         <div className="flex h-9 items-center justify-between border-b border-slate-200 bg-white px-4">
//           <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-400">
//             <Search className="size-2.5" /><span className="text-[9px]">Search patients or operations…</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-[9px] font-semibold text-teal-600">Active &amp; Monitoring</span>
//             <div className="relative h-3.5 w-6 rounded-full bg-teal-500">
//               <div className="absolute right-0.5 top-0.5 size-2.5 rounded-full bg-white shadow" />
//             </div>
//             <Bell className="size-3 text-slate-400" />
//           </div>
//         </div>

//         <div className="flex flex-1 overflow-hidden p-3 gap-3">
//           {/* Schedule table */}
//           <div className="flex flex-1 flex-col gap-2">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-[13px] font-bold text-slate-800">Morning Overview</h2>
//                 <p className="text-[9px] text-slate-400">Tuesday, October 24, 2026 • 09:45 AM</p>
//               </div>
//               <div className="flex gap-1.5">
//                 <button className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[9px] text-slate-600">Operational Audit</button>
//                 <button className="rounded-md bg-slate-900 px-2 py-1 text-[9px] text-white">+ New Appointment</button>
//               </div>
//             </div>

//             <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
//               <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
//                 <div className="flex items-center gap-1.5">
//                   <Calendar className="size-3 text-teal-500" />
//                   <span className="text-[10px] font-semibold text-slate-700">Today's Schedule</span>
//                 </div>
//                 <div className="flex gap-1">
//                   {["All Providers", "Dr. Rao", "Dr. Reddy"].map((p, i) => (
//                     <span key={p} className={`rounded-full px-2 py-0.5 text-[8px] font-medium ${i === 0 ? "bg-slate-800 text-white" : "border border-slate-200 text-slate-500"}`}>{p}</span>
//                   ))}
//                 </div>
//               </div>
//               <div className="px-3">
//                 <div className="grid grid-cols-[64px_minmax(0,1.7fr)_minmax(0,1fr)_76px] py-1.5 text-[8px] font-semibold uppercase tracking-wide text-slate-400 border-b border-slate-100">
//                   <span>Time</span><span>Patient &amp; Reason</span><span>Provider</span><span>Status</span>
//                 </div>
//                 {[
//                   { time: "09:00 AM", name: "K. Sai Pallavi", tag: "NEW PATIENT", reason: "Annual Checkup", initials: "SR", provider: "Dr. S. Rao", status: "Checked In", statusColor: "text-orange-600 bg-orange-50", highlight: false },
//                   { time: "09:30 AM", name: "Ch. Venkata Ramana", tag: "AGENT BOOKED", reason: "Follow-up: X-Ray", initials: "AR", provider: "Dr. A. Reddy", status: "Confirmed", statusColor: "text-emerald-600 bg-emerald-50", highlight: true },
//                   { time: "10:15 AM", name: "Rahul Sharma", tag: "ROUTINE", reason: "Prescription Renewal", initials: "SR", provider: "Dr. S. Rao", status: "Upcoming", statusColor: "text-slate-500 bg-slate-50", highlight: false },
//                   { time: "11:00 AM", name: "Ananya Verma", tag: "AGENT BOOKED", reason: "Acute Knee Pain", initials: "AR", provider: "Dr. A. Reddy", status: "Upcoming", statusColor: "text-slate-500 bg-slate-50", highlight: false },
//                 ].map((row) => (
//                   <div key={row.name} className={`grid grid-cols-[64px_minmax(0,1.7fr)_minmax(0,1fr)_76px] items-center py-1.5 border-b border-slate-50 ${row.highlight ? "border-l-2 border-l-teal-500 bg-teal-50/30 -ml-0.5 pl-0.5" : ""}`}>
//                     <span className="text-[9px] font-medium text-slate-600">{row.time}</span>
//                     <div className="min-w-0 pr-1">
//                       <div className="flex min-w-0 items-start gap-1">
//                         <span className="truncate text-[9px] font-semibold text-slate-800">{row.name}</span>
//                         <span className={`shrink-0 rounded px-1 py-0.5 text-[7px] font-bold ${row.tag === "AGENT BOOKED" ? "bg-teal-500 text-white" : "border border-slate-300 text-slate-500"}`}>{row.tag}</span>
//                       </div>
//                       <span className="block truncate text-[8px] text-slate-400">{row.reason}</span>
//                     </div>
//                     <div className="flex min-w-0 items-center gap-1">
//                       <div className="flex size-4 items-center justify-center rounded-full bg-slate-200 text-[7px] font-bold text-slate-600">{row.initials}</div>
//                       <span className="truncate text-[9px] text-slate-600">{row.provider}</span>
//                     </div>
//                     <span className={`w-fit rounded-full px-1.5 py-0.5 text-[8px] font-medium ${row.statusColor}`}>{row.status}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="px-3 py-2 text-center">
//                 <span className="text-[8px] font-medium text-teal-600">View All 18 Appointments ↓</span>
//               </div>
//             </div>
//           </div>

//           {/* Right panel */}
//           <div className="flex w-[130px] shrink-0 flex-col gap-2">
//             {/* Inbound calls */}
//             <div className="rounded-lg border border-slate-200 bg-white p-2.5">
//               <div className="flex items-center gap-1 mb-1.5">
//                 <Phone className="size-3 text-slate-400" />
//                 <span className="text-[8px] font-semibold uppercase tracking-wide text-slate-400">Inbound Calls</span>
//               </div>
//               <div className="flex items-end gap-2">
//                 <span className="text-[22px] font-bold leading-none text-slate-800">128</span>
//                 <div className="mb-0.5">
//                   <span className="text-[9px] font-semibold text-emerald-600">98.5%</span>
//                   <p className="text-[8px] text-emerald-500">Answered</p>
//                 </div>
//               </div>
//               <p className="mt-1 text-[8px] text-slate-500"><span className="inline-block size-1.5 rounded-full bg-emerald-400 mr-0.5 align-middle" />84 calls handled by Agent</p>
//             </div>
//             {/* Live activity */}
//             <div className="rounded-lg border border-slate-200 bg-white p-2.5 flex-1">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-[9px] font-semibold text-slate-700">Live Activity</span>
//                 <div className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" /><span className="text-[8px] text-emerald-500 font-medium">LIVE</span></div>
//               </div>
//               {[
//                 { ago: "2 MINS AGO", text: "Virtual Agent handled a rescheduling request.", sub: "Moved B. Nagarjuna to Thursday 2PM.", color: "border-teal-400" },
//                 { ago: "14 MINS AGO", text: "Receptionist checked in K. Sai Pallavi.", sub: "", color: "border-slate-300" },
//                 { ago: "25 MINS AGO", text: "Missed Call: Unknown Number", sub: "", color: "border-red-400" },
//               ].map((item) => (
//                 <div key={item.ago} className={`mb-2 border-l-2 pl-2 ${item.color}`}>
//                   <p className="text-[7px] font-semibold text-slate-400">{item.ago}</p>
//                   <p className="text-[8px] text-slate-700 leading-tight">{item.text}</p>
//                   {item.sub && <p className="text-[7px] text-slate-400">{item.sub}</p>}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ScheduleScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
//   return (
//     <div className="flex h-full overflow-hidden rounded-xl bg-[#f8fafb] text-[11px]">
//       {/* Sidebar */}
//       <div className="flex w-[120px] shrink-0 flex-col border-r border-slate-200 bg-white px-3 py-4">
//         <div className="mb-5 px-1">
//           <span className="text-[12px] font-bold tracking-tight text-slate-800">
//             Nexov<span className="text-emerald-600">AI</span>
//           </span>
//         </div>
//         <p className="mb-1 px-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">Clinic Ops</p>
//         <button
//           type="button"
//           onClick={() => onNavigate("Dashboard")}
//           className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-slate-500 hover:bg-slate-50"
//         >
//           <LayoutDashboard className="size-2.5" /><span className="text-[9px]">Dashboard</span>
//         </button>
//         <button
//           type="button"
//           onClick={() => onNavigate("Schedule")}
//           className="mb-1 flex w-full items-center gap-1.5 rounded-md bg-emerald-50 px-1.5 py-1 text-left font-medium text-emerald-700"
//         >
//           <Calendar className="size-2.5" /><span className="text-[9px]">Schedule</span>
//         </button>
//         <p className="mb-1 mt-4 px-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">Virtual Asst.</p>
//         <button
//           type="button"
//           onClick={() => onNavigate("Calls & Logs")}
//           className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-slate-500 hover:bg-slate-50"
//         >
//           <Phone className="size-2.5" /><span className="text-[9px]">Calls &amp; Logs</span>
//           <span className="ml-auto rounded-full bg-emerald-500 px-1.5 text-[8px] font-bold text-white">12</span>
//         </button>
//       </div>

//       {/* Main */}
//       <div className="flex flex-1 flex-col overflow-hidden">
//         <div className="flex h-9 items-center justify-between border-b border-slate-200 bg-white px-4">
//           <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-400">
//             <Search className="size-2.5" /><span className="text-[9px]">Search patients, doctors, slots…</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-[9px] font-semibold text-teal-600">Virtual Agent Active</span>
//             <div className="relative h-3.5 w-6 rounded-full bg-teal-500"><div className="absolute right-0.5 top-0.5 size-2.5 rounded-full bg-white shadow" /></div>
//             <Bell className="size-3 text-slate-400" />
//           </div>
//         </div>

//         <div className="flex flex-1 overflow-hidden p-3 gap-3">
//           <div className="flex flex-1 flex-col gap-2 overflow-hidden">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-[13px] font-bold text-slate-800">Clinic Schedule</h2>
//                 <p className="text-[9px] text-slate-400">Today, Tuesday, October 24, 2026</p>
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <div className="flex rounded-md border border-slate-200 bg-white overflow-hidden">
//                   {["Day","Week","Month"].map((v,i) => (
//                     <button key={v} className={`px-2 py-1 text-[8px] ${i===0 ? "bg-slate-800 text-white font-medium" : "text-slate-500"}`}>{v}</button>
//                   ))}
//                 </div>
//                 <button className="flex items-center gap-1 rounded-md bg-teal-500 px-2 py-1 text-[8px] font-medium text-white">+ New Appointment</button>
//               </div>
//             </div>

//             {/* Calendar columns */}
//             <div className="rounded-lg border border-slate-200 bg-white overflow-hidden flex-1">
//               <div className="grid grid-cols-[50px_1fr_1fr_1fr] border-b border-slate-100">
//                 <div />
//                 {[
//                   { initials: "SR", name: "Dr. Suresh Reddy", spec: "Cardiology • 09:00 – 17:00" },
//                   { initials: "AR", name: "Dr. Ananya Rao", spec: "General • 08:30 – 16:30" },
//                   { initials: "KP", name: "Dr. Kiran Prasad", spec: "Orthopedic • 10:00 – 16:00" },
//                 ].map((d) => (
//                   <div key={d.initials} className="border-l border-slate-100 px-2 py-1.5 text-center">
//                     <div className="mx-auto mb-0.5 flex size-5 items-center justify-center rounded-full bg-slate-200 text-[8px] font-bold text-slate-600">{d.initials}</div>
//                     <p className="text-[8px] font-semibold text-slate-700">{d.name}</p>
//                     <p className="text-[7px] text-slate-400">{d.spec}</p>
//                   </div>
//                 ))}
//               </div>
//               <div className="grid grid-cols-[50px_1fr_1fr_1fr] text-[8px]">
//                 {["09:00 AM","10:00 AM","11:00 AM","12:00 PM"].map((t, ri) => (
//                   <>
//                     <div key={t} className="border-b border-slate-50 px-1 py-3 text-[7px] text-slate-400">{t}</div>
//                     {/* SR column */}
//                     <div className="border-b border-l border-slate-50 p-1 relative" key={`sr-${t}`}>
//                       {ri === 0 && (
//                         <div className="rounded-md bg-emerald-50 border border-emerald-200 p-1">
//                           <p className="font-semibold text-slate-700">Jayanth Rao</p>
//                           <p className="text-slate-400">Annual Checkup</p>
//                           <span className="rounded px-1 bg-emerald-500 text-white text-[7px] font-bold">CHECKED IN</span>
//                         </div>
//                       )}
//                       {ri === 1 && (
//                         <div className="rounded-md bg-red-50 border border-red-200 p-1">
//                           <p className="font-semibold text-slate-700">Saranya Krishnan</p>
//                           <p className="text-slate-400">Cardiology Consult</p>
//                           <span className="rounded px-1 bg-red-500 text-white text-[7px] font-bold">LATE</span>
//                         </div>
//                       )}
//                     </div>
//                     {/* AR column */}
//                     <div className="border-b border-l border-slate-50 p-1" key={`ar-${t}`}>
//                       {ri === 0 && (
//                         <div className="rounded-md bg-teal-50 border border-teal-200 p-1">
//                           <p className="font-semibold text-slate-700">Venkata Ramana</p>
//                           <p className="text-slate-400">Follow-up: X-Ray</p>
//                           <span className="rounded px-1 bg-teal-500 text-white text-[7px] font-bold">AGENT BOOKED</span>
//                         </div>
//                       )}
//                       {ri === 1 && (
//                         <div className="rounded-md bg-slate-50 border border-slate-200 p-1">
//                           <p className="font-semibold text-slate-700">Suresh Babu</p>
//                           <p className="text-slate-400">General Inquiry</p>
//                         </div>
//                       )}
//                     </div>
//                     {/* KP column */}
//                     <div className="border-b border-l border-slate-50 p-1" key={`kp-${t}`}>
//                       {ri === 1 && (
//                         <div className="rounded-md bg-emerald-50 border border-emerald-200 p-1">
//                           <p className="font-semibold text-slate-700">Meena Kumari</p>
//                           <p className="text-slate-400">Post-Op Review (Knee)</p>
//                           <span className="rounded px-1 bg-emerald-600 text-white text-[7px] font-bold">CONFIRMED</span>
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Right panel */}
//           <div className="flex w-[130px] shrink-0 flex-col gap-2">
//             <div className="rounded-lg border border-slate-200 bg-white p-2.5">
//               <p className="mb-1.5 text-[9px] font-semibold text-slate-700">Patient Look-up</p>
//               <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 mb-2">
//                 <Search className="size-2.5 text-slate-400" /><span className="text-[8px] text-slate-400">Name or Phone…</span>
//               </div>
//               {[{ initials: "JR", name: "Jayanth Rao", sub: "Last visit: 2 days ago" }, { initials: "SK", name: "Saranya Krishnan", sub: "New Patient" }].map(p => (
//                 <div key={p.initials} className="flex items-center gap-1.5 mb-1.5">
//                   <div className="flex size-5 items-center justify-center rounded-full bg-slate-200 text-[7px] font-bold text-slate-600">{p.initials}</div>
//                   <div><p className="text-[8px] font-medium text-slate-700">{p.name}</p><p className="text-[7px] text-slate-400">{p.sub}</p></div>
//                 </div>
//               ))}
//               <button className="mt-1 w-full rounded-md border border-slate-200 py-1 text-[8px] text-slate-600">View All Patients</button>
//             </div>
//             <div className="rounded-lg border border-slate-200 bg-white p-2.5 flex-1">
//               <div className="flex items-center justify-between mb-2">
//                 <span className="text-[9px] font-semibold text-slate-700">Live Activity</span>
//                 <div className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" /><span className="text-[8px] text-emerald-500 font-medium">LIVE</span></div>
//               </div>
//               {[
//                 { color: "border-teal-400", ago: "2 MINS AGO", text: "Virtual Agent handled rescheduling for B. Nagarjuna.", sub: '"Moved to Thursday 2PM."' },
//                 { color: "border-slate-300", ago: "14 MINS AGO", text: "Receptionist checked in Jayanth Rao.", sub: "" },
//                 { color: "border-amber-400", ago: "25 MINS AGO", text: "Missed Call: +91 98480 22338", sub: "" },
//               ].map((item) => (
//                 <div key={item.ago} className={`mb-2 border-l-2 pl-2 ${item.color}`}>
//                   <p className="text-[7px] font-semibold text-slate-400">{item.ago}</p>
//                   <p className="text-[8px] text-slate-700 leading-tight">{item.text}</p>
//                   {item.sub && <p className="text-[7px] italic text-slate-400">{item.sub}</p>}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function CallsLogsScreen({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
//   return (
//     <div className="flex h-full overflow-hidden rounded-xl bg-[#f8fafb] text-[11px]">
//       {/* Sidebar */}
//       <div className="flex w-[120px] shrink-0 flex-col border-r border-slate-200 bg-white px-3 py-4">
//         <div className="mb-5 px-1">
//           <span className="text-[12px] font-bold tracking-tight text-slate-800">
//             Nexov<span className="text-emerald-600">AI</span>
//           </span>
//         </div>
//         <p className="mb-1 px-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">Clinic Ops</p>
//         <button
//           type="button"
//           onClick={() => onNavigate("Dashboard")}
//           className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-slate-500 hover:bg-slate-50"
//         >
//           <LayoutDashboard className="size-2.5" /><span className="text-[9px]">Dashboard</span>
//         </button>
//         <button
//           type="button"
//           onClick={() => onNavigate("Schedule")}
//           className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-slate-500 hover:bg-slate-50"
//         >
//           <Calendar className="size-2.5" /><span className="text-[9px]">Schedule</span>
//         </button>
//         <p className="mb-1 mt-4 px-1 text-[9px] font-semibold uppercase tracking-wider text-slate-400">Virtual Asst.</p>
//         <button
//           type="button"
//           onClick={() => onNavigate("Calls & Logs")}
//           className="mb-1 flex w-full items-center gap-1.5 rounded-md bg-emerald-50 px-1.5 py-1 text-left font-medium text-emerald-700"
//         >
//           <Phone className="size-2.5" /><span className="text-[9px]">Calls &amp; Logs</span>
//           <span className="ml-auto rounded-full bg-emerald-500 px-1.5 text-[8px] font-bold text-white">12</span>
//         </button>
//       </div>

//       {/* Main */}
//       <div className="flex flex-1 flex-col overflow-hidden">
//         <div className="flex h-9 items-center justify-between border-b border-slate-200 bg-white px-4">
//           <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-400">
//             <Search className="size-2.5" /><span className="text-[9px]">Search logs, patients, or agents…</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-[9px] font-semibold text-teal-600">Active &amp; Listening</span>
//             <div className="relative h-3.5 w-6 rounded-full bg-teal-500"><div className="absolute right-0.5 top-0.5 size-2.5 rounded-full bg-white shadow" /></div>
//             <Bell className="size-3 text-slate-400" />
//           </div>
//         </div>

//         <div className="flex flex-1 flex-col overflow-hidden p-3 gap-2">
//           <div className="flex items-start justify-between">
//             <div>
//               <h2 className="text-[13px] font-bold text-slate-800">Calls &amp; Logs</h2>
//               <p className="text-[9px] text-slate-400">Review communication history and AI activity logs.</p>
//             </div>
//             <div className="flex gap-1.5">
//               <button className="rounded-md border border-slate-200 px-2 py-1 text-[8px] text-slate-600">Export CSV</button>
//               <button className="rounded-md bg-teal-500 px-2 py-1 text-[8px] font-medium text-white">+ Log Manual Call</button>
//             </div>
//           </div>

//           <div className="flex items-center gap-1.5">
//             <div className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[8px] text-slate-500">
//               <Calendar className="size-2.5" /> Today: Oct 24, 2024
//             </div>
//             {["Agent: All", "Outcome: All", "Call Type: All"].map(f => (
//               <div key={f} className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[8px] text-slate-500">{f} ▾</div>
//             ))}
//             <div className="ml-auto flex flex-col items-end rounded-lg border border-slate-200 bg-white px-2.5 py-1">
//               <div className="flex items-center gap-1"><span className="text-[16px] font-bold text-slate-800">128</span><span className="text-[8px] font-semibold text-emerald-500">98.5% Success</span></div>
//               <span className="text-[7px] text-slate-400">Calls Handled</span>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
//             <div className="grid grid-cols-[60px_80px_70px_50px_1fr_50px] gap-1 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-wide text-slate-400 border-b border-slate-100">
//               <span>Time &amp; Type</span><span>Caller</span><span>Agent</span><span>Duration</span><span>AI Summary &amp; Action</span><span>Recording</span>
//             </div>
//             {[
//               { time: "10:45 AM", type: "Incoming", icon: "✓", iconColor: "text-emerald-500", caller: "Anusha Rao", phone: "+9198490 12345", agent: "VIRTUAL AGENT", agentColor: "bg-teal-500 text-white", duration: "2m 14s", summary: '"Rescheduled follow-up to Thursday 3 PM due to conflict."', tags: ["APPT CONFIRMED", "Schedule Updated"] },
//               { time: "10:32 AM", type: "Outgoing", icon: "↗", iconColor: "text-blue-500", caller: "Srinivas Reddy", phone: "+9198890 54321", agent: "RECEPTIONIST (LP)", agentColor: "bg-slate-200 text-slate-600", duration: "4m 02s", summary: '"Called to confirm insurance details for surgery tomorrow."', tags: ["ADMIN FOLLOW-UP"] },
//               { time: "10:15 AM", type: "Missed", icon: "↘", iconColor: "text-red-500", caller: "Unknown Caller", phone: "+9196000 88990", agent: "NONE", agentColor: "bg-slate-100 text-slate-400", duration: "0s", summary: "", tags: ["RETURN CALL"] },
//               { time: "09:12 AM", type: "Incoming", icon: "✓", iconColor: "text-emerald-500", caller: "Priya Kavuri", phone: "+9198888 22710", agent: "VIRTUAL AGENT", agentColor: "bg-teal-500 text-white", duration: "3m 22s", summary: '"New patient booking. Collected insurance info and DOB."', tags: ["NEW PATIENT REGISTERED", "Schedule Updated"] },
//             ].map((row) => (
//               <div key={row.time + row.caller} className="grid grid-cols-[60px_80px_70px_50px_1fr_50px] items-center gap-1 px-3 py-2 border-b border-slate-50 text-[8px]">
//                 <div>
//                   <div className="flex items-center gap-0.5"><span className={`text-[9px] font-bold ${row.iconColor}`}>{row.icon}</span><span className="font-medium text-slate-700">{row.time}</span></div>
//                   <span className={`text-[7px] ${row.type === "Missed" ? "text-red-500 font-semibold" : "text-slate-400"}`}>{row.type}</span>
//                 </div>
//                 <div>
//                   <p className="font-medium text-slate-700 truncate">{row.caller}</p>
//                   <p className="text-slate-400 text-[7px]">{row.phone}</p>
//                 </div>
//                 <span className={`rounded px-1.5 py-0.5 text-[7px] font-semibold w-fit ${row.agentColor}`}>{row.agent}</span>
//                 <span className="text-slate-600">{row.duration}</span>
//                 <div>
//                   {row.summary && <p className="text-slate-600 italic mb-0.5 truncate">{row.summary}</p>}
//                   <div className="flex flex-wrap gap-0.5">
//                     {row.tags.map(tag => (
//                       <span key={tag} className="rounded bg-teal-50 px-1 py-0.5 text-[6px] font-semibold text-teal-700 border border-teal-200">{tag}</span>
//                     ))}
//                   </div>
//                 </div>
//                 <span className="text-teal-500 text-[8px]">{row.duration !== "0s" ? "▶" : "—"}</span>
//               </div>
//             ))}
//           </div>

//           {/* Efficiency */}
//           <div className="rounded-lg border border-slate-200 bg-white p-3">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-[9px] font-semibold text-slate-700">Daily Handling Efficiency</span>
//               <div className="flex items-center gap-2 text-[7px]">
//                 <span className="flex items-center gap-1"><span className="inline-block size-2 rounded-full bg-teal-500" />Virtual Agent</span>
//                 <span className="flex items-center gap-1"><span className="inline-block size-2 rounded-full bg-slate-800" />Human Staff</span>
//               </div>
//             </div>
//             <div className="space-y-1.5">
//               <div>
//                 <div className="flex justify-between text-[8px] mb-0.5"><span className="text-slate-500">Virtual Agent Workload</span><span className="font-semibold text-teal-600">84% (107 CALLS)</span></div>
//                 <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-teal-500" style={{ width: "84%" }} /></div>
//               </div>
//               <div>
//                 <div className="flex justify-between text-[8px] mb-0.5"><span className="text-slate-500">Human Staff Intervention</span><span className="font-semibold text-slate-600">16% (21 CALLS)</span></div>
//                 <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-slate-800" style={{ width: "16%" }} /></div>
//               </div>
//             </div>
//             <p className="mt-2 text-center text-[8px] text-slate-500">The Virtual Agent has successfully automated approximately <span className="font-semibold text-slate-700">4.2 hours</span> of manual call time today.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export function Hero({ onOpenForm }: { onOpenForm: () => void }) {
//   const [activeTab, setActiveTab] = useState<Tab>("Dashboard");

//   const demoViewerPanel = useMemo(() => (
//     <motion.div
//       initial={{ opacity: 0, x: 30 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.6, delay: 0.2 }}
//       className="relative"
//     >
//       <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
//         <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
//           <div className="size-2.5 rounded-full bg-red-400" />
//           <div className="size-2.5 rounded-full bg-yellow-400" />
//           <div className="size-2.5 rounded-full bg-green-400" />
//           <div className="mx-auto flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] text-slate-400">
//             <span className="text-slate-300">🔒</span> app.nexovai.ai/dashboard
//           </div>
//         </div>

//         <div className="flex border-b border-slate-100 bg-white">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`relative flex flex-1 items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-medium transition-colors ${
//                 activeTab === tab ? "text-emerald-700" : "text-slate-400 hover:text-slate-600"
//               }`}
//             >
//               {tab === "Dashboard" && <LayoutDashboard className="size-3" />}
//               {tab === "Schedule" && <Calendar className="size-3" />}
//               {tab === "Calls & Logs" && <Phone className="size-3" />}
//               {tab}
//               {activeTab === tab && (
//                 <motion.div
//                   layoutId="activeTab"
//                   className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
//                 />
//               )}
//             </button>
//           ))}
//         </div>

//         <div className="h-[360px] sm:h-[420px]">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeTab}
//               initial={{ opacity: 0, y: 6 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -6 }}
//               transition={{ duration: 0.2 }}
//               className="h-full"
//             >
//               {activeTab === "Dashboard" && <DashboardScreen onNavigate={setActiveTab} />}
//               {activeTab === "Schedule" && <ScheduleScreen onNavigate={setActiveTab} />}
//               {activeTab === "Calls & Logs" && <CallsLogsScreen onNavigate={setActiveTab} />}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </motion.div>
//   ), [activeTab]);

//   return (
//     <section className="overflow-hidden bg-background px-4 pb-16 pt-28 sm:px-6 sm:pb-24 md:pt-40">
//       <div className="mx-auto max-w-7xl w-full">
//         <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
//           {/* Left Content */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="lg:pt-8"
//           >
//             <h1 className="mb-6 text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl md:text-6xl lg:mb-8 lg:text-[6rem]">
//               <span className="block">
//                 <RotatingHeadline />{" "}
//                 Receptionists
//               </span>
//               <span className="block">for Modern Clinics</span>
//             </h1>
//             <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg md:mb-10 md:text-2xl">
//               AI voice agents that answer patient calls, schedule appointments, and automate clinic workflows.
//             </p>

//             <div className="flex flex-col gap-4 sm:flex-row">
//               <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
//                 <Button
//                   size="lg"
//                   onClick={onOpenForm}
//                   className="rounded-xl bg-linear-to-br from-emerald-600 to-green-600 px-8 py-6 text-base font-medium text-white shadow-lg hover:from-emerald-700 hover:to-green-700 hover:shadow-xl"
//                 >
//                   Book a Demo
//                   <ArrowRight className="ml-2 size-5" />
//                 </Button>
//               </motion.div>
//             </div>
//           </motion.div>

//           <div className="overflow-x-auto pb-2">
//             <div className="min-w-[320px]">{demoViewerPanel}</div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowRight, LayoutDashboard, Calendar, Phone,
  Bell, Search, ChevronRight,
} from "lucide-react";

/* ─── Fonts & global styles ──────────────────────────────── */
const globalStyles = `
  .nexov-hero { font-family: 'Quicksand', sans-serif; }
  .nexov-display { font-family: 'Merriweather', serif; }

  .grain-overlay {
    pointer-events: none;
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.028;
    mix-blend-mode: multiply;
    border-radius: inherit;
    z-index: 0;
  }

  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0   rgba(16,185,129,0.5); }
    70%  { box-shadow: 0 0 0 7px rgba(16,185,129,0);   }
    100% { box-shadow: 0 0 0 0   rgba(16,185,129,0);   }
  }
  .live-dot { animation: pulse-ring 2s ease-out infinite; }

  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .ticker-track { animation: ticker 22s linear infinite; display: flex; width: max-content; }
  .ticker-track:hover { animation-play-state: paused; }

  /* kill every scrollbar inside the demo panel */
  .demo-panel * { scrollbar-width: none; -ms-overflow-style: none; }
  .demo-panel *::-webkit-scrollbar { display: none; }
`;

/* ─── Constants ──────────────────────────────────────────── */
const tabs = ["Dashboard", "Schedule", "Calls & Logs"];

/* ─── Shared sidebar ─────────────────────────────────────── */
function Sidebar({ active, onNavigate }: { active: string; onNavigate: (label: string) => void }) {
  const items = [
    { label: "Dashboard", icon: LayoutDashboard, group: "Clinic Ops" },
    { label: "Schedule", icon: Calendar, group: null },
    { label: "Calls & Logs", icon: Phone, group: "Virtual Asst.", badge: 12 },
  ];
  let lastGroup = null;

  return (
    <div className="flex w-[124px] shrink-0 flex-col border-r border-slate-200 bg-white px-3 py-4">
      {/* Logo */}
      <div className="mb-5 px-1 flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-emerald-500 live-dot inline-block" />
        <span style={{ fontFamily: "'Quicksand', sans-serif" }}
          className="text-[11px] font-semibold tracking-tight text-slate-800">
          Nexov<span className="text-emerald-500">AI</span>
        </span>
      </div>

      {items.map((item) => {
        const showGroup = item.group && item.group !== lastGroup;
        if (item.group) lastGroup = item.group;
        const isActive = active === item.label;
        const Icon = item.icon;
        return (
          <div key={item.label}>
            {showGroup && (
              <p className="mb-1 mt-3 px-1 text-[8px] font-semibold uppercase tracking-wider text-slate-400">
                {item.group}
              </p>
            )}
            <button
              type="button"
              onClick={() => onNavigate(item.label)}
              className={`mb-0.5 flex w-full items-center gap-1.5 rounded-md px-1.5 py-[5px] text-left transition-all duration-150 ${isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                }`}
            >
              <Icon className="size-[9px] shrink-0" />
              <span className="text-[9px] font-medium truncate">{item.label}</span>
              {item.badge && (
                <span className="ml-auto rounded-full bg-emerald-500 px-1.5 text-[7px] font-bold text-white leading-4 shrink-0">
                  {item.badge}
                </span>
              )}
            </button>
          </div>
        );
      })}

      {/* Footer status */}
      <div className="mt-auto pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 px-1">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
          <span className="text-[8px] text-emerald-600 font-medium">Agent Online</span>
        </div>
        <p className="mt-0.5 px-1 text-[7px] text-slate-300">NexovAI v2.4.1</p>
      </div>
    </div>
  );
}

/* ─── Top bar ────────────────────────────────────────────── */
function TopBar({ placeholder, statusLabel }: { placeholder: string; statusLabel: string }) {
  return (
    <div className="flex h-9 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4">
      <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-400">
        <Search className="size-2.5" />
        <span className="text-[9px]">{placeholder}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-medium text-emerald-600">{statusLabel}</span>
        <div className="relative h-3.5 w-[22px] rounded-full bg-emerald-500">
          <div className="absolute right-0.5 top-0.5 size-2.5 rounded-full bg-white shadow" />
        </div>
        <Bell className="size-3 text-slate-400" />
      </div>
    </div>
  );
}

/* ─── Dashboard screen ───────────────────────────────────── */
function DashboardScreen({ onNavigate }: { onNavigate: (label: string) => void }) {
  const rows = [
    { time: "09:00", name: "K. Sai Pallavi", tag: "NEW", reason: "Annual Checkup", initials: "SR", provider: "Dr. S. Rao", status: "Checked In", sClass: "text-amber-600 bg-amber-50", hi: false },
    { time: "09:30", name: "Ch. Venkata Ramana", tag: "AI", reason: "Follow-up: X-Ray", initials: "AR", provider: "Dr. A. Reddy", status: "Confirmed", sClass: "text-emerald-700 bg-emerald-50", hi: true },
    { time: "10:15", name: "Rahul Sharma", tag: null, reason: "Prescription Renewal", initials: "SR", provider: "Dr. S. Rao", status: "Upcoming", sClass: "text-slate-500 bg-slate-50", hi: false },
    { time: "11:00", name: "Ananya Verma", tag: "AI", reason: "Acute Knee Pain", initials: "AR", provider: "Dr. A. Reddy", status: "Upcoming", sClass: "text-slate-500 bg-slate-50", hi: false },
  ];

  return (
    <div className="flex h-full overflow-hidden rounded-b-2xl bg-slate-50 text-[11px]">
      <Sidebar active="Dashboard" onNavigate={onNavigate} />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <TopBar placeholder="Search patients or operations…" statusLabel="Active & Monitoring" />
        <div className="flex flex-1 overflow-hidden p-3 gap-3 min-h-0">

          {/* Main column */}
          <div className="flex flex-1 flex-col gap-2 min-w-0 min-h-0">
            {/* Header row */}
            <div className="flex items-start justify-between shrink-0">
              <div>
                <h2 className="text-[12px] font-semibold text-slate-800">Morning Overview</h2>
                <p className="text-[8px] text-slate-400 mt-0.5">Tuesday, October 24, 2026 · 09:45 AM</p>
              </div>
              <div className="flex gap-1.5">
                <button className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[8px] text-slate-500">Audit</button>
                <button className="rounded-md bg-slate-900 px-2 py-1 text-[8px] font-medium text-white">+ Appointment</button>
              </div>
            </div>

            {/* Schedule card */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col flex-1 min-h-0">
              {/* Card header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-1.5">
                  <Calendar className="size-2.5 text-emerald-500" />
                  <span className="text-[9px] font-semibold text-slate-700">Today's Schedule</span>
                </div>
                <div className="flex gap-1">
                  {["All", "Dr. Rao", "Dr. Reddy"].map((p, i) => (
                    <span key={p} className={`rounded-full px-2 py-0.5 text-[7px] font-medium ${i === 0 ? "bg-slate-800 text-white" : "border border-slate-200 text-slate-400"
                      }`}>{p}</span>
                  ))}
                </div>
              </div>

              {/* Table head */}
              <div className="grid px-3 py-1.5 text-[7px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 shrink-0"
                style={{ gridTemplateColumns: "52px minmax(0,1.8fr) minmax(0,1fr) 68px" }}>
                <span>Time</span><span>Patient</span><span>Provider</span><span>Status</span>
              </div>

              {/* Rows */}
              <div className="flex-1 overflow-hidden">
                {rows.map((row) => (
                  <div key={row.name}
                    className={`grid items-center px-3 py-[7px] border-b border-slate-50 ${row.hi ? "bg-emerald-50/60 border-l-2 border-l-emerald-400 pl-[10px]" : ""}`}
                    style={{ gridTemplateColumns: "52px minmax(0,1.8fr) minmax(0,1fr) 68px" }}>
                    <span className={`text-[9px] font-medium tabular-nums ${row.hi ? "text-emerald-600" : "text-slate-500"}`}>{row.time}</span>
                    <div className="min-w-0 pr-1">
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="truncate text-[9px] font-semibold text-slate-800">{row.name}</span>
                        {row.tag && (
                          <span className={`shrink-0 rounded px-1 py-0.5 text-[6px] font-bold ${row.tag === "AI"
                              ? "bg-emerald-500 text-white"
                              : "border border-slate-300 text-slate-400"
                            }`}>{row.tag === "AI" ? "✦ AI" : row.tag}</span>
                        )}
                      </div>
                      <span className="text-[7px] text-slate-400">{row.reason}</span>
                    </div>
                    <div className="flex items-center gap-1 min-w-0">
                      <div className="size-4 rounded-full bg-slate-200 flex items-center justify-center text-[7px] font-bold text-slate-600 shrink-0">{row.initials}</div>
                      <span className="truncate text-[8px] text-slate-600">{row.provider}</span>
                    </div>
                    <span className={`w-fit rounded-full px-1.5 py-0.5 text-[7px] font-medium ${row.sClass}`}>{row.status}</span>
                  </div>
                ))}
              </div>

              <div className="px-3 py-1.5 text-center border-t border-slate-50 shrink-0">
                <span className="text-[8px] font-medium text-emerald-600">View all 18 appointments ↓</span>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex w-[118px] shrink-0 flex-col gap-2 min-h-0">
            {/* Inbound calls */}
            <div className="rounded-xl border border-slate-200 bg-white p-2.5 shrink-0">
              <p className="text-[7px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Inbound Calls</p>
              <div className="flex items-end gap-1.5">
                <span className="text-[22px] font-bold leading-none text-slate-800">128</span>
                <div className="mb-0.5 leading-tight">
                  <span className="text-[9px] font-semibold text-emerald-600">98.5%</span>
                  <p className="text-[7px] text-slate-400">Answered</p>
                </div>
              </div>
              <p className="mt-1.5 text-[7.5px] text-slate-500">
                <span className="inline-block size-1.5 rounded-full bg-emerald-400 mr-1 align-middle" />
                84 handled by AI
              </p>
            </div>

            {/* Live activity */}
            <div className="rounded-xl border border-slate-200 bg-white p-2.5 flex-1 min-h-0 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-semibold text-slate-700">Live Activity</span>
                <span className="size-1.5 rounded-full bg-emerald-500 live-dot inline-block" />
              </div>
              {[
                { ago: "2m ago", text: "AI rescheduled B. Nagarjuna → Thu 2PM", color: "border-emerald-500" },
                { ago: "14m ago", text: "K. Sai Pallavi checked in", color: "border-slate-300" },
                { ago: "25m ago", text: "Missed call: Unknown number", color: "border-red-400" },
              ].map((item) => (
                <div key={item.ago} className={`mb-2 border-l-[2px] pl-2 ${item.color}`}>
                  <p className="text-[6.5px] font-semibold text-slate-400 uppercase tracking-wide">{item.ago}</p>
                  <p className="text-[8px] text-slate-700 leading-snug">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── Schedule screen ────────────────────────────────────── */
function ScheduleScreen({ onNavigate }: { onNavigate: (label: string) => void }) {
  const doctors = [
    { initials: "SR", name: "Dr. Suresh Rao", spec: "Cardiology" },
    { initials: "AR", name: "Dr. A. Reddy", spec: "General" },
    { initials: "KP", name: "Dr. K. Prasad", spec: "Ortho" },
  ];
  const slots = ["09:00", "10:00", "11:00", "12:00"];
  const appts = {
    "09:00-SR": { name: "Jayanth Rao", reason: "Annual Checkup", status: "CHECKED IN", color: "border-emerald-300 bg-emerald-50" },
    "10:00-SR": { name: "Saranya Krishnan", reason: "Cardiology Consult", status: "LATE", color: "border-red-300 bg-red-50" },
    "09:00-AR": { name: "Venkata Ramana", reason: "Follow-up: X-Ray", status: "✦ AI BOOKED", color: "border-emerald-400 bg-emerald-50/80" },
    "10:00-AR": { name: "Suresh Babu", reason: "General Inquiry", status: null, color: "border-slate-200 bg-slate-50" },
    "10:00-KP": { name: "Meena Kumari", reason: "Post-Op (Knee)", status: "CONFIRMED", color: "border-emerald-300 bg-emerald-50" },
  };
  const statusColor = {
    "CHECKED IN": "bg-emerald-500 text-white",
    "LATE": "bg-red-500 text-white",
    "✦ AI BOOKED": "bg-emerald-600 text-white",
    "CONFIRMED": "bg-emerald-500 text-white",
  };

  return (
    <div className="flex h-full overflow-hidden rounded-b-2xl bg-slate-50 text-[11px]">
      <Sidebar active="Schedule" onNavigate={onNavigate} />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <TopBar placeholder="Search patients, doctors, slots…" statusLabel="Agent Active" />
        <div className="flex flex-1 flex-col overflow-hidden p-3 gap-2.5 min-h-0">

          {/* Header */}
          <div className="flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-[12px] font-semibold text-slate-800">Clinic Schedule</h2>
              <p className="text-[8px] text-slate-400 mt-0.5">Tuesday, October 24, 2026</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex rounded-lg border border-slate-200 bg-white overflow-hidden">
                {["Day", "Week", "Month"].map((v, i) => (
                  <button key={v} className={`px-2 py-1 text-[8px] ${i === 0 ? "bg-slate-800 text-white font-medium" : "text-slate-400"}`}>{v}</button>
                ))}
              </div>
              <button className="rounded-lg bg-emerald-500 px-2 py-1 text-[8px] font-medium text-white">+ New</button>
            </div>
          </div>

          {/* Calendar grid */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden flex-1 flex flex-col min-h-0">
            {/* Doctor headers */}
            <div className="grid border-b border-slate-100 shrink-0"
              style={{ gridTemplateColumns: "44px 1fr 1fr 1fr" }}>
              <div />
              {doctors.map((d) => (
                <div key={d.initials} className="border-l border-slate-100 px-2 py-2 text-center">
                  <div className="mx-auto mb-0.5 size-5 rounded-full bg-slate-200 flex items-center justify-center text-[7px] font-bold text-slate-600">{d.initials}</div>
                  <p className="text-[8px] font-semibold text-slate-700">{d.name}</p>
                  <p className="text-[6.5px] text-slate-400">{d.spec}</p>
                </div>
              ))}
            </div>

            {/* Slot rows */}
            <div className="flex-1 overflow-hidden">
              {slots.map((slot) => (
                <div key={slot} className="grid border-b border-slate-50"
                  style={{ gridTemplateColumns: "44px 1fr 1fr 1fr" }}>
                  <div className="px-1.5 py-3 text-[7px] text-slate-400 tabular-nums">{slot}</div>
                  {["SR", "AR", "KP"].map((doc) => {
                    const key = `${slot}-${doc}`;
                    const apt = appts[key];
                    return (
                      <div key={key} className="border-l border-slate-50 p-1 min-h-[40px]">
                        {apt && (
                          <div className={`rounded-md border p-1 ${apt.color}`}>
                            <p className="text-[8px] font-semibold text-slate-800 leading-tight">{apt.name}</p>
                            <p className="text-[7px] text-slate-500">{apt.reason}</p>
                            {apt.status && (
                              <span className={`mt-0.5 inline-block rounded px-1 py-0.5 text-[6px] font-bold ${statusColor[apt.status]}`}>
                                {apt.status}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── Calls & Logs screen ────────────────────────────────── */
function CallsLogsScreen({ onNavigate }: { onNavigate: (label: string) => void }) {
  const rows = [
    { time: "10:45 AM", type: "Incoming", typeColor: "text-emerald-600", caller: "Anusha Rao", agent: "✦ AI Agent", agentClass: "bg-emerald-50 text-emerald-700 border-emerald-200", dur: "2m 14s", summary: "Rescheduled follow-up to Thursday 3 PM.", tags: ["CONFIRMED", "UPDATED"] },
    { time: "10:32 AM", type: "Outgoing", typeColor: "text-blue-500", caller: "Srinivas Reddy", agent: "Receptionist", agentClass: "bg-slate-50 text-slate-500 border-slate-200", dur: "4m 02s", summary: "Confirmed insurance for surgery tomorrow.", tags: ["ADMIN"] },
    { time: "10:15 AM", type: "Missed", typeColor: "text-red-500", caller: "Unknown", agent: "None", agentClass: "bg-slate-50 text-slate-400 border-slate-200", dur: "—", summary: "", tags: ["CALLBACK"] },
    { time: "09:12 AM", type: "Incoming", typeColor: "text-emerald-600", caller: "Priya Kavuri", agent: "✦ AI Agent", agentClass: "bg-emerald-50 text-emerald-700 border-emerald-200", dur: "3m 22s", summary: "New patient. Collected insurance + DOB.", tags: ["NEW PATIENT", "UPDATED"] },
  ];

  return (
    <div className="flex h-full overflow-hidden rounded-b-2xl bg-slate-50 text-[11px]">
      <Sidebar active="Calls & Logs" onNavigate={onNavigate} />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <TopBar placeholder="Search logs, patients, or agents…" statusLabel="Active & Listening" />
        <div className="flex flex-1 flex-col overflow-hidden p-3 gap-2 min-h-0">

          {/* Header */}
          <div className="flex items-start justify-between shrink-0">
            <div>
              <h2 className="text-[12px] font-semibold text-slate-800">Calls & Logs</h2>
              <p className="text-[8px] text-slate-400 mt-0.5">Communication history and AI activity.</p>
            </div>
            <div className="flex gap-1.5">
              <button className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[8px] text-slate-500">Export CSV</button>
              <button className="rounded-lg bg-emerald-500 px-2 py-1 text-[8px] font-medium text-white">+ Log Call</button>
            </div>
          </div>

          {/* Stat pills */}
          <div className="flex gap-2 shrink-0">
            {[
              { label: "Calls Today", value: "128", sub: "98.5% answered", vc: "text-slate-800" },
              { label: "AI Handled", value: "84%", sub: "107 calls", vc: "text-emerald-600" },
              { label: "Time Saved", value: "4.2h", sub: "vs. manual", vc: "text-emerald-600" },
            ].map((s) => (
              <div key={s.label} className="flex-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5">
                <p className="text-[7px] text-slate-400 uppercase tracking-wider font-semibold">{s.label}</p>
                <p className={`text-[15px] font-bold leading-tight ${s.vc}`}>{s.value}</p>
                <p className="text-[7px] text-slate-400">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden flex-1 flex flex-col min-h-0">
            <div className="grid gap-1 px-3 py-1.5 text-[7px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 shrink-0"
              style={{ gridTemplateColumns: "56px 76px 74px 36px 1fr" }}>
              <span>Time</span><span>Caller</span><span>Agent</span><span>Dur.</span><span>Summary & Tags</span>
            </div>
            <div className="flex-1 overflow-hidden">
              {rows.map((row) => (
                <div key={row.time + row.caller}
                  className="grid items-center gap-1 px-3 py-[7px] border-b border-slate-50"
                  style={{ gridTemplateColumns: "56px 76px 74px 36px 1fr" }}>
                  <div>
                    <p className="text-[8px] font-medium text-slate-700 tabular-nums">{row.time}</p>
                    <p className={`text-[7px] font-medium ${row.typeColor}`}>{row.type}</p>
                  </div>
                  <p className="text-[8px] text-slate-600 truncate">{row.caller}</p>
                  <span className={`rounded-md border px-1.5 py-0.5 text-[7px] font-semibold w-fit ${row.agentClass}`}>{row.agent}</span>
                  <span className="text-[8px] text-slate-400 tabular-nums">{row.dur}</span>
                  <div className="min-w-0">
                    {row.summary && <p className="text-[7.5px] text-slate-500 mb-0.5 truncate">{row.summary}</p>}
                    <div className="flex flex-wrap gap-0.5">
                      {row.tags.map((tag) => (
                        <span key={tag} className="rounded bg-emerald-50 border border-emerald-200 px-1 py-0.5 text-[6px] font-bold text-emerald-700">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── Rotating headline ───────────────────────────────────── */
const rotatingTitles = ["Effortless", "Intelligent", "Always-On", "Automated", "Modern"];

function RotatingHeadline() {
  const [idx, setIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setTimeout(() => setIdx((n) => (n + 1) % rotatingTitles.length), 3000);
    return () => clearTimeout(id);
  }, [shouldReduceMotion, idx]);

  if (shouldReduceMotion) {
    return <span className="italic text-emerald-600">Intelligent</span>;
  }

  return (
    <span className="relative inline-flex overflow-hidden" style={{ minWidth: "5.8ch" }}>
      {rotatingTitles.map((title, i) => (
        <motion.span
          key={title}
          className="absolute left-0 top-0 italic text-emerald-600"
          initial={{ opacity: 0, y: 60 }}
          animate={i === idx ? { y: 0, opacity: 1 } : { y: i < idx ? -60 : 60, opacity: 0 }}
          transition={{ type: "spring", stiffness: 55, damping: 17 }}
        >
          {title}
        </motion.span>
      ))}
      <span className="invisible">Automated</span>
    </span>
  );
}

/* ─── Ticker ─────────────────────────────────────────────── */
const tickerItems = [
  "✦ 98.5% call answer rate",
  "✦ 4.2 hrs saved per day",
  "✦ Zero hold times",
  "✦ 24 / 7 availability",
  "✦ HIPAA compliant",
  "✦ Live in under 48 hrs",
];

function Ticker() {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div className="relative overflow-hidden border-y border-emerald-100 bg-emerald-50/60 py-2">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="mx-6 text-[10px] font-medium text-emerald-600/70 whitespace-nowrap">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */
export function Hero({ onOpenForm }: { onOpenForm: () => void }) {
  const [activeTab, setActiveTab] = useState<string>("Dashboard");

  const demoPanel = useMemo(() => (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative demo-panel"
    >
      {/* Subtle glow */}
      <div className="absolute -inset-4 rounded-3xl bg-emerald-400/10 blur-2xl pointer-events-none" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_64px_-12px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.04)]">

        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5 shrink-0">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-red-400/70" />
            <div className="size-2.5 rounded-full bg-amber-400/70" />
            <div className="size-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="mx-auto flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[9px] text-slate-400">
            <span>🔒</span> app.nexovai.ai/dashboard
          </div>
        </div>

        {/* Tab bar */}
        <div className="relative flex border-b border-slate-100 bg-white">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            const Icon = tab === "Dashboard" ? LayoutDashboard : tab === "Schedule" ? Calendar : Phone;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex flex-1 items-center justify-center gap-1 px-3 py-2 text-[10px] font-medium transition-colors duration-200 ${isActive ? "text-emerald-700" : "text-slate-400 hover:text-slate-600"
                  }`}
              >
                <Icon className="size-2.5 shrink-0" />
                <span className="truncate">{tab}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Screen area — fixed height, no scrollbar */}
        <div className="h-[420px] sm:h-[480px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="h-full"
            >
              {activeTab === "Dashboard" && <DashboardScreen onNavigate={setActiveTab} />}
              {activeTab === "Schedule" && <ScheduleScreen onNavigate={setActiveTab} />}
              {activeTab === "Calls & Logs" && <CallsLogsScreen onNavigate={setActiveTab} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  ), [activeTab]);

  return (
    <>
      <style>{globalStyles}</style>

      <section className="nexov-hero relative overflow-hidden bg-white px-4 pb-0 pt-16 sm:px-6 md:pt-28">

        {/* Very subtle background tint */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/3 size-[560px] rounded-full bg-emerald-100/50 blur-[100px]" />
          <div className="absolute bottom-0 -right-20 size-[380px] rounded-full bg-emerald-50/80 blur-[80px]" />
          <div className="grain-overlay" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14 pb-12 md:pb-16">

            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:pt-4"
            >
              {/* Live badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5"
              >
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                <span className="text-[11px] font-medium text-emerald-700">Now live in 300+ Indian clinics</span>
              </motion.div>

              {/* Headline */}
              <h1 className="nexov-display mb-6 text-[2.8rem] font-normal leading-[1.05] text-slate-900 sm:text-[3.5rem] md:text-[4.2rem] lg:text-[4.8rem]">
                <RotatingHeadline />{" "}
                <span className="text-slate-900">Receptionists</span>
                <br />
                <span className="text-slate-400">for Modern Clinics</span>
              </h1>

              <p className="mb-8 max-w-lg text-base leading-relaxed text-slate-500 sm:text-[1.1rem]">
                AI voice agents that answer every patient call, book appointments, and keep your clinic running — day and night.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenForm}
                  className="nexov-hero flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-[15px] font-semibold text-white shadow-[0_4px_24px_rgba(16,185,129,0.35)] hover:bg-emerald-500 hover:shadow-[0_6px_32px_rgba(16,185,129,0.45)] transition-all duration-200"
                >
                  Book a Demo
                  <ArrowRight className="size-4" />
                </motion.button>
                <button className="nexov-hero flex items-center gap-1.5 text-[14px] font-medium text-slate-400 hover:text-slate-700 transition-colors">
                  Watch 2-min overview
                  <ChevronRight className="size-3.5" />
                </button>
              </div>

              {/* Social proof */}
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["#4ade80", "#34d399", "#6ee7b7", "#a7f3d0"].map((c, i) => (
                    <div key={i}
                      className="size-7 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-700 shadow-sm"
                      style={{ backgroundColor: c }}>
                      {["SR", "KP", "AR", "JR"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-amber-400 text-[11px]">★★★★★</div>
                  <p className="text-[11px] text-slate-400">Loved by 300+ clinic teams</p>
                </div>
              </div>
            </motion.div>

            {/* Right: demo panel */}
            <div className="min-w-0">
              {demoPanel}
            </div>

          </div>
        </div>

        <Ticker />
      </section>
    </>
  );
}

export default Hero;