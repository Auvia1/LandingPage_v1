// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import { Button } from "./ui/button";

// interface NavigationProps {
//   onOpenForm: () => void;
// }

// export function Navigation({ onOpenForm }: NavigationProps) {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
//     e.preventDefault();
//     setIsMobileMenuOpen(false);

//     const element = document.getElementById(targetId);
//     if (element) {
//       const navbarHeight = document.querySelector("nav")?.offsetHeight || 80;
//       const elementPosition = element.getBoundingClientRect().top + window.scrollY;
//       const offsetPosition = elementPosition - navbarHeight;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: "smooth",
//       });
//     }
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
//       <div className="mx-auto max-w-7xl px-6 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <span className="text-2xl font-bold tracking-tight text-foreground">
//               Nexov
//               <span style={{ color: "#6b8e23" }}>AI</span>
//             </span>
//           </div>

//           {/* Center Navigation */}
//           <div className="hidden items-center gap-8 md:flex">
//             <a
//               href="#features"
//               onClick={(e) => handleNavClick(e, "features")}
//               className="text-sm text-muted-foreground transition-colors hover:text-foreground"
//             >
//               Product
//             </a>
//             <a
//               href="#solutions"
//               onClick={(e) => handleNavClick(e, "solutions")}
//               className="text-sm text-muted-foreground transition-colors hover:text-foreground"
//             >
//               Solutions
//             </a>
//             <a
//               href="#why"
//               onClick={(e) => handleNavClick(e, "why")}
//               className="text-sm text-muted-foreground transition-colors hover:text-foreground"
//             >
//               Why
//             </a>
//             <a
//               href="#pricing"
//               onClick={(e) => handleNavClick(e, "pricing")}
//               className="text-sm text-muted-foreground transition-colors hover:text-foreground"
//             >
//               Pricing
//             </a>
//           </div>

//           {/* Right */}
//           <div className="hidden items-center gap-4 md:flex">
//             <Button onClick={onOpenForm} className="rounded-lg bg-gradient-to-br from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700">
//               Get Started
//             </Button>
//           </div>

//           <button
//             type="button"
//             aria-label="Toggle menu"
//             onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//             className="inline-flex items-center justify-center rounded-md border border-border p-2 text-foreground md:hidden"
//           >
//             {isMobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
//           </button>
//         </div>

//         {isMobileMenuOpen && (
//           <div className="mt-4 space-y-3 rounded-xl border border-border bg-background p-4 md:hidden">
//             <a
//               href="#features"
//               onClick={(e) => handleNavClick(e, "features")}
//               className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
//             >
//               Product
//             </a>
//             <a
//               href="#solutions"
//               onClick={(e) => handleNavClick(e, "solutions")}
//               className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
//             >
//               Solutions
//             </a>
//             <a
//               href="#why"
//               onClick={(e) => handleNavClick(e, "why")}
//               className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
//             >
//               Why
//             </a>
//             <a
//               href="#pricing"
//               onClick={(e) => handleNavClick(e, "pricing")}
//               className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
//             >
//               Pricing
//             </a>
//             <Button
//               onClick={() => {
//                 onOpenForm();
//                 setIsMobileMenuOpen(false);
//               }}
//               className="w-full rounded-lg bg-gradient-to-br from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700"
//             >
//               Get Started
//             </Button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }


import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

interface NavigationProps {
  onOpenForm: () => void;
}

export function Navigation({ onOpenForm }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              Nexov
              <span className="text-primary drop-shadow-[0_0_10px_rgba(103,252,198,0.35)]">AI</span>
            </span>
          </div>

          {/* Center Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Product
            </a>
            <a href="#solutions" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Solutions
            </a>
            <a href="#why" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Why
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </a>
          </div>

          {/* Right */}
          <div className="hidden items-center gap-4 md:flex">
            <Button onClick={onOpenForm} style={{ fontFamily: "'DM Sans', sans-serif" }} className="rounded-lg bg-[#6b8e23] text-white hover:bg-[#6b8e23]/90 shadow-[0_4px_24px_rgba(107,142,35,0.35)] hover:shadow-[0_6px_32px_rgba(107,142,35,0.45)] transition-all duration-200">
              Get Started
            </Button>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-md border border-border p-2 text-foreground md:hidden"
          >
            {isMobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-4 space-y-3 rounded-xl border border-border bg-background p-4 md:hidden">
            <a href="#features" onClick={handleNavClick} className="block text-sm text-muted-foreground transition-colors hover:text-foreground">
              Product
            </a>
            <a href="#solutions" onClick={handleNavClick} className="block text-sm text-muted-foreground transition-colors hover:text-foreground">
              Solutions
            </a>
            <a href="#why" onClick={handleNavClick} className="block text-sm text-muted-foreground transition-colors hover:text-foreground">
              Why
            </a>
            <a href="#pricing" onClick={handleNavClick} className="block text-sm text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </a>
            <Button
              onClick={() => {
                onOpenForm();
                setIsMobileMenuOpen(false);
              }}
              className="w-full rounded-lg bg-[#6b8e23] text-white hover:bg-[#6b8e23]/90 shadow-[0_4px_24px_rgba(107,142,35,0.35)] hover:shadow-[0_6px_32px_rgba(107,142,35,0.45)] transition-all duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}