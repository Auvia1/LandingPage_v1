// const Navbar = () => (
//   <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "#f4f4f4", borderBottom: "1px solid #000", width: "100%" }} >
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", width: "100%" }}>
//       <div style={{ gridColumn: "span 2", borderRight: "1px solid #000", padding: "16px", display: "flex", alignItems: "center" }}>
//         <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "20px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.04em", lineHeight: 1 }}>
//           Nexov<br />AI
//         </span>
//       </div>
//       <div style={{ gridColumn: "span 7", display: "flex", alignItems: "stretch" }}>
//         {["INFRASTRUCTURE", "VOICE MODELS", "API DOCS", "PRICING"].map((label) => (
//           <a key={label} href="#" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #000", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", color: "#141b2b", padding: "0 8px", textAlign: "center" }}>
//             {label}
//           </a>
//         ))}
//         <div style={{ flex: 2 }} />
//       </div>
//       <div style={{ gridColumn: "span 3", display: "flex", alignItems: "stretch" }}>
//         <div style={{ flex: 1 }} />
//         <a href="#" style={{ display: "flex", alignItems: "center", padding: "0 24px", borderLeft: "1px solid #000", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", color: "#141b2b" }}>
//           LOGIN
//         </a>
//         <button style={{ background: "#000", color: "#fff", padding: "0 32px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
//           GET STARTED
//         </button>
//       </div>
//     </div>
//   </nav>
// );

// export default Navbar;

import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 50,
      padding: scrolled ? "10px 0" : "0",
      marginBottom: "20px",
      marginLeft: isMobile ? "10px" : "20px",
      marginRight: isMobile ? "10px" : "20px",
      transition: "padding 0.3s ease, margin 0.3s ease",
    }}
    >
      <nav style={{
        maxWidth: "100%",
        margin: "0 auto",
        background: scrolled ? "#fff" : "transparent",
        borderBottom: scrolled ? "none" : "0.5px solid rgba(0,0,0,0.1)",
        borderRadius: scrolled ? "14px" : "0",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)" : "none",
        transition: "background 0.3s ease, border-radius 0.3s ease, box-shadow 0.3s ease",
      }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px", height: 56, gap: 24,
        }}>
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              Nexov
              <span style={{ color: "#6b8e23" }}>AI</span>  
            </span>
          </div>

          {/* Links - Hidden on Mobile */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center" }}>
              {[{ label: "Try our agents", id: "agents" }, { label: "Products", id: "products" }, { label: "About us", id: "usecases" }, { label: "Contact us", id: "contact" }]
                .map(({ label, id }) => (
                  <button key={label} onClick={() => {
                    const element = document.getElementById(id);
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 8, fontSize: 13, color: "#6b7280", textDecoration: "none", whiteSpace: "nowrap", background: "none", border: "none", cursor: "pointer" }}>
                    {label}
                  </button>
                ))}
            </div>
          )}

          {/* Actions - Hidden on Mobile */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <a href="/auvia" style={{ padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, color: "#0f766e", border: "1px solid rgba(15,118,110,0.2)", background: "rgba(15,118,110,0.05)", textDecoration: "none", transition: "all 0.2s" }}>Auvia</a>
              <button onClick={() => { const element = document.getElementById("products"); if (element) element.scrollIntoView({ behavior: "smooth" }); }} style={{ padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 500, color: "#fff", background: "#141b2b", textDecoration: "none", border: "none", cursor: "pointer" }}>Get started →</button>
            </div>
          )}

          {/* Hamburger Icon for Mobile */}
          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#141b2b"
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 28 }}>
                {isOpen ? "close" : "menu"}
              </span>
            </button>
          )}
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobile && isOpen && (
          <div style={{
            background: "#fff",
            borderRadius: "0 0 14px 14px",
            padding: "16px",
            borderTop: "0.5px solid rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
          }}>
            {[{ label: "Try our agents", id: "agents" }, { label: "Products", id: "products" }, { label: "About us", id: "usecases" }, { label: "Contact us", id: "contact" }]
              .map(({ label, id }) => (
                <button
                  key={label}
                  onClick={() => {
                    setIsOpen(false);
                    const element = document.getElementById(id);
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#4b5563",
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  {label}
                </button>
              ))}
            <div style={{ height: "0.5px", background: "rgba(0,0,0,0.08)", margin: "4px 0" }} />
            <a
              href="/auvia"
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#0f766e",
                border: "1px solid rgba(15,118,110,0.2)",
                background: "rgba(15,118,110,0.05)",
                textDecoration: "none"
              }}
            >
              Auvia
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                const element = document.getElementById("products");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#fff",
                background: "#141b2b",
                border: "none",
                cursor: "pointer"
              }}
            >
              Get started →
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;