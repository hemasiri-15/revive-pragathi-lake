import { useState, useEffect, useRef } from "react";

const useIntersection = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const AnimCounter = ({ target, suffix = "", duration = 1800 }) => {
  const [count, setCount] = useState(0);
  const [ref, visible] = useIntersection(0.3);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(t); }
      else setCount(start);
    }, 16);
    return () => clearInterval(t);
  }, [visible, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, visible] = useIntersection(0.08);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`
    }}>
      {children}
    </div>
  );
};

const IMG = {
  polluted1: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=900&q=80",
  polluted2: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  cleanLake1: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
  cleanLake2: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=900&q=80",
  kayaking: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=80",
  boating: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=700&q=80",
  cycling: "https://images.unsplash.com/photo-1558618047-f5d68f8c8b83?w=700&q=80",
  jogging: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=700&q=80",
  picnic: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80",
  fishing: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700&q=80",
  solarAerator: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=80",
  mosquitofish: "https://images.unsplash.com/photo-1518796745738-41048802f99a?w=700&q=80",
  robot: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=700&q=80",
  community: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
  hyderabad: "https://images.unsplash.com/photo-1586861203927-800a5acdcc4d?w=900&q=80",
  lakeRestore1: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&q=80",
  lakeRestore2: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
  kids: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=500&q=80",
  vendor: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
  family: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=500&q=80",
  nightLake: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80",
};

const CITIES = [
  { city: "Hyderabad", lake: "Pragathi Nagar Lake", area: "47 acres", status: "Active Pilot", color: "#00d4d8" },
  { city: "Bengaluru", lake: "Bellandur Lake", area: "361 acres", status: "Scalable", color: "#0fa36d" },
  { city: "Chennai", lake: "Pallikaranai Marsh", area: "5,940 acres", status: "Scalable", color: "#f59e0b" },
  { city: "Mumbai", lake: "Powai Lake", area: "150 acres", status: "Scalable", color: "#8b5cf6" },
  { city: "Delhi", lake: "Sanjay Lake", area: "72 acres", status: "Scalable", color: "#ef4444" },
  { city: "Pune", lake: "Pashan Lake", area: "80 acres", status: "Scalable", color: "#ec4899" },
];

const SPORTS = [
  { icon: "🚣", title: "Kayaking & Rowing", img: IMG.kayaking, desc: "Guided kayak tours on the restored lake every weekend. All skill levels welcome.", price: "₹200/hr" },
  { icon: "⛵", title: "Paddle Boating", img: IMG.boating, desc: "Family-friendly paddle boats for 2-4 persons. Perfect evening activity.", price: "₹150/hr" },
  { icon: "🚴", title: "Lakeside Cycling", img: IMG.cycling, desc: "8km cycling track around the restored lake with rest stations.", price: "₹100/hr" },
  { icon: "🏃", title: "Morning Jogging", img: IMG.jogging, desc: "3km jogging path with fitness stations and clean air from the restored ecosystem.", price: "Free" },
  { icon: "🧘", title: "Yoga & Wellness", img: IMG.picnic, desc: "Dawn yoga sessions at the lakeside pavilion. Guided by certified instructors.", price: "₹250/session" },
  { icon: "🎣", title: "Recreational Fishing", img: IMG.fishing, desc: "Catch-and-release fishing in designated zones with the restored aquatic ecosystem.", price: "₹300/day" },
];

export default function App() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeNav, setActiveNav] = useState("");
  const [dashTick, setDashTick] = useState(0);
  const [petitionSigned, setPetitionSigned] = useState(false);
  const [petitionCount, setPetitionCount] = useState(3847);
  const [petitionForm, setPetitionForm] = useState({ name: "", email: "", area: "" });
  const [reportForm, setReportForm] = useState({ name: "", area: "", category: "", desc: "" });
  const [reportState, setReportState] = useState("idle");
  const [reportCount, setReportCount] = useState(47);
  const [reports, setReports] = useState([
    { id: 1, name: "Ravi K.", area: "North Bank", category: "Waste Dumping", desc: "Large pile of construction debris dumped near the inlet pipe.", time: "2h ago", tag: "🗑️" },
    { id: 2, name: "Ananya M.", area: "East Side", category: "Mosquito Breeding", desc: "Stagnant water pockets near the walking path — heavy mosquito swarms at dusk.", time: "5h ago", tag: "🦟" },
    { id: 3, name: "Suresh P.", area: "South Gate", category: "Water Quality", desc: "Dark oily discharge flowing into the lake from the drain outlet.", time: "1d ago", tag: "💧" },
    { id: 4, name: "Lakshmi T.", area: "West Corner", category: "Odor Issue", desc: "Unbearable smell near the west bank — worse in the mornings.", time: "1d ago", tag: "💨" },
  ]);
  const [voiceTab, setVoiceTab] = useState("testimonials");
  const [activeSport, setActiveSport] = useState(0);
  const [scaleCity, setScaleCity] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setDashTick(p => p + 1), 2200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setScaleCity(p => (p + 1) % CITIES.length), 2800);
    return () => clearInterval(t);
  }, []);

  const dashData = {
    do: [6.2, 6.8, 7.1, 7.4, 7.0, 7.3][dashTick % 6],
    ph: [7.1, 7.2, 7.4, 7.3, 7.5, 7.2][dashTick % 6],
    temp: [28, 27, 28, 29, 27, 28][dashTick % 6],
    waste: [12, 14, 11, 15, 13, 12][dashTick % 6],
    robot: [82, 84, 86, 83, 85, 87][dashTick % 6],
    mosquito: [23, 19, 17, 21, 18, 15][dashTick % 6],
  };

  const voices = [
    { name: "Ravi Kumar", role: "Resident, 12 years", avatar: "RK", color: "#0a9396", quote: "We keep our windows shut all year. My children have had dengue twice. This lake used to be our backyard, now it is our biggest fear." },
    { name: "Sunita Reddy", role: "Local Business Owner", avatar: "SR", color: "#0fa36d", quote: "Property prices here dropped 30% compared to other areas. If the lake was restored, this entire neighbourhood would transform overnight." },
    { name: "Prasad Naidu", role: "IT Professional", avatar: "PN", color: "#f59e0b", quote: "I used to jog around the lake. Now I cannot walk on that side of the road. My children ask why the water looks green and smells bad." },
    { name: "Meera Sharma", role: "Schoolteacher", avatar: "MS", color: "#8b5cf6", quote: "We had to ban children from going near the lake during monsoon. Three students in our school got dengue last year from breeding near the lake." },
    { name: "Venkat Rao", role: "Street Vendor, 8 years", avatar: "VR", color: "#ef4444", quote: "My cart used to be near the lake path. People stopped walking there. I lost 60% of my income. If the lake is clean, I get my livelihood back." },
    { name: "Anjali Devi", role: "Homemaker", avatar: "AD", color: "#06b6d4", quote: "Mosquito repellent is our biggest monthly expense. We burn coils every night and still get bitten. The children have constant cough from the fumes." },
  ];

  return (
    <div style={{ fontFamily: "'Syne', 'Space Grotesk', sans-serif", background: "#030d1a", color: "#e0f7fa", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --deep: #030d1a; --navy: #071b30; --teal: #0a9396; --cyan: #00d4d8;
          --emerald: #0fa36d; --lime: #84cc16; --light: #e0f7fa; --muted: #7fb3c8;
          --warn: #ef4444; --gold: #f59e0b; --glass: rgba(255,255,255,0.05);
          --gb: rgba(255,255,255,0.11);
        }
        html { scroll-behavior: smooth; }
        body { background: var(--deep); }

        /* NAV */
        nav {
          position:fixed; top:0; left:0; right:0; z-index:200;
          background:rgba(3,13,26,0.92); backdrop-filter:blur(20px);
          border-bottom:1px solid var(--gb);
          display:flex; align-items:center; justify-content:space-between;
          padding:0 3rem; height:62px;
        }
        .nl { font-family:'Syne',sans-serif; font-size:1rem; font-weight:800;
          background:linear-gradient(90deg,var(--cyan),var(--emerald));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .nlinks { display:flex; gap:1.6rem; list-style:none; }
        .nlinks a { color:var(--muted); text-decoration:none; font-size:0.78rem;
          font-weight:500; letter-spacing:0.06em; text-transform:uppercase; transition:color 0.2s; }
        .nlinks a:hover { color:var(--cyan); }
        .ncta { background:linear-gradient(135deg,var(--teal),var(--cyan)); color:#fff !important;
          padding:0.42rem 1.1rem !important; border-radius:2rem; font-weight:700 !important; }

        /* SECTION BASE */
        .sec { padding:6rem 5%; max-width:1200px; margin:0 auto; }
        .sec-wrap { background:var(--navy); }
        .sec-wrap2 { background:linear-gradient(180deg,#071b30,var(--deep)); }
        .lbl { font-size:0.68rem; font-weight:700; letter-spacing:0.18em; text-transform:uppercase;
          color:var(--cyan); margin-bottom:0.6rem; }
        .ttl { font-family:'Syne',sans-serif; font-size:clamp(1.9rem,3.5vw,3rem);
          font-weight:800; line-height:1.1; margin-bottom:0.9rem; }
        .ttl em { font-style:italic; color:var(--cyan); font-family:'Syne',sans-serif; }
        .dsc { color:var(--muted); font-size:1rem; line-height:1.8; max-width:640px; margin-bottom:2.5rem; }

        /* GLASS CARD */
        .gc { background:var(--glass); border:1px solid var(--gb); border-radius:1rem; backdrop-filter:blur(8px); }

        /* HERO */
        .hero {
          min-height:100vh; position:relative; overflow:hidden;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          text-align:center; padding:80px 5% 6rem;
          background:radial-gradient(ellipse 90% 70% at 50% 40%, #0a2540 0%, #030d1a 70%);
        }
        .hero::before {
          content:''; position:absolute; inset:0;
          background:radial-gradient(circle at 25% 65%,rgba(10,147,150,.2) 0%,transparent 50%),
                      radial-gradient(circle at 75% 30%,rgba(0,212,216,.12) 0%,transparent 50%);
        }
        .hero-img-strip {
          position:absolute; inset:0; z-index:0;
          background: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=60') center/cover no-repeat;
          opacity:0.06;
        }
        .hero-badge { display:inline-block; background:rgba(0,212,216,.1); border:1px solid rgba(0,212,216,.3);
          color:var(--cyan); font-size:0.7rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
          padding:.38rem 1rem; border-radius:2rem; margin-bottom:1.5rem; }
        .hero h1 { font-family:'Syne',sans-serif; font-size:clamp(2.8rem,7vw,5.5rem); font-weight:800;
          line-height:1.02; margin-bottom:1rem;
          background:linear-gradient(140deg,#fff 30%,var(--cyan) 65%,var(--emerald) 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
        .hero-sub { font-size:clamp(1rem,1.8vw,1.2rem); color:var(--muted); max-width:580px; margin:0 auto 2.5rem; line-height:1.75; }
        .hero-btns { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; }
        .btn-p { display:inline-block; padding:.85rem 2.2rem; border-radius:3rem; font-weight:700; font-size:.9rem;
          letter-spacing:.04em; text-decoration:none; transition:transform .2s,box-shadow .2s;
          background:linear-gradient(135deg,var(--teal),var(--cyan)); color:#fff;
          box-shadow:0 4px 24px rgba(0,212,216,.28); border:none; cursor:pointer; }
        .btn-p:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgba(0,212,216,.4); }
        .btn-o { display:inline-block; padding:.85rem 2.2rem; border-radius:3rem; font-weight:600; font-size:.9rem;
          text-decoration:none; border:1px solid rgba(255,255,255,.22); color:rgba(255,255,255,.8);
          transition:all .2s; cursor:pointer; background:transparent; }
        .btn-o:hover { border-color:var(--cyan); color:var(--cyan); }
        .hero-stats { display:flex; gap:3rem; justify-content:center; margin-top:4rem; flex-wrap:wrap; }
        .hs-num { font-family:'Syne',sans-serif; font-size:2.4rem; font-weight:800; color:var(--cyan); }
        .hs-lbl { font-size:.72rem; color:var(--muted); text-transform:uppercase; letter-spacing:.08em; margin-top:.2rem; }

        /* AFFECTED WHO */
        .affected-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1.2rem; }
        .aff-card { background:var(--glass); border:1px solid var(--gb); border-radius:1rem; overflow:hidden; }
        .aff-img { width:100%; height:140px; object-fit:cover; filter:brightness(0.7); }
        .aff-body { padding:1.1rem; }
        .aff-title { font-family:'Syne',sans-serif; font-weight:700; font-size:.95rem; margin-bottom:.35rem; }
        .aff-desc { font-size:.78rem; color:var(--muted); line-height:1.6; }

        /* HEALTH GRID */
        .health-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:1.2rem; }
        .hcard { background:var(--glass); border:1px solid var(--gb); border-radius:1rem; padding:1.5rem; transition:all .3s; }
        .hcard:hover { border-color:rgba(0,212,216,.3); transform:translateY(-3px); }
        .hi { font-size:2rem; margin-bottom:.75rem; }
        .hn { font-family:'Syne',sans-serif; font-weight:700; font-size:.98rem; margin-bottom:.4rem; }
        .hstat { font-family:'Syne',sans-serif; font-size:1.7rem; font-weight:800;
          background:linear-gradient(135deg,var(--warn),var(--gold));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; display:block; margin:.3rem 0; }
        .hd { font-size:.8rem; color:var(--muted); line-height:1.65; }

        /* LIFECYCLE */
        .lc-wrap { background:var(--glass); border:1px solid var(--gb); border-radius:1.2rem; padding:2rem 1.5rem; margin-top:2.5rem; }
        .lc-steps { display:flex; align-items:center; justify-content:center; flex-wrap:nowrap; overflow-x:auto; gap:0; }
        .lc-step { text-align:center; min-width:90px; flex:1; }
        .lc-circle { width:64px; height:64px; border-radius:50%; margin:0 auto .7rem;
          display:flex; align-items:center; justify-content:center; font-size:1.8rem; }
        .lc-lbl { font-size:.75rem; font-weight:700; margin-bottom:.2rem; }
        .lc-day { font-size:.65rem; color:var(--muted); }
        .lc-arrow { color:rgba(255,255,255,.2); font-size:1.3rem; flex-shrink:0; padding:0 .2rem; }

        /* BEFORE/AFTER */
        .ba-wrap { position:relative; border-radius:1.2rem; overflow:hidden; height:420px;
          cursor:ew-resize; user-select:none; border:1px solid var(--gb); }
        .ba-side { position:absolute; inset:0; }
        .ba-before-img { width:100%; height:100%; object-fit:cover; filter:saturate(0.6) brightness(0.75); }
        .ba-after-img { width:100%; height:100%; object-fit:cover; filter:saturate(1.1) brightness(0.9); }
        .ba-clip { position:absolute; inset:0; overflow:hidden; }
        .ba-overlay { position:absolute; inset:0; background:rgba(0,0,0,.35); display:flex; align-items:flex-end; padding:2rem; }
        .ba-overlay-after { background:linear-gradient(to top,rgba(0,50,40,.6) 0%,transparent 60%); }
        .ba-overlay-before { background:linear-gradient(to top,rgba(80,20,0,.6) 0%,transparent 60%); }
        .ba-info h3 { font-family:'Syne',sans-serif; font-size:1.3rem; font-weight:800; margin-bottom:.6rem; }
        .ba-list { font-size:.8rem; line-height:2.1; list-style:none; }
        .ba-divider { position:absolute; top:0; bottom:0; width:3px; background:rgba(255,255,255,.9); cursor:ew-resize; z-index:5; }
        .ba-handle { position:absolute; top:50%; transform:translateY(-50%); width:44px; height:44px;
          border-radius:50%; background:white; display:flex; align-items:center; justify-content:center;
          font-size:1.1rem; left:-22px; box-shadow:0 4px 16px rgba(0,0,0,.5); }
        .ba-lbl { position:absolute; top:1rem; font-size:.72rem; font-weight:700; text-transform:uppercase;
          letter-spacing:.1em; padding:.3rem .8rem; border-radius:2rem; background:rgba(0,0,0,.6); backdrop-filter:blur(8px); }

        /* WATER SPORTS */
        .sports-hero { position:relative; border-radius:1.5rem; overflow:hidden; height:280px; margin-bottom:2.5rem; }
        .sports-hero img { width:100%; height:100%; object-fit:cover; filter:brightness(0.55); }
        .sports-overlay { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; flex-direction:column; text-align:center; padding:2rem; }
        .sports-tabs { display:flex; gap:.6rem; flex-wrap:wrap; margin-bottom:2rem; }
        .st-btn { background:var(--glass); border:1px solid var(--gb); color:var(--muted); padding:.5rem 1.2rem;
          border-radius:2rem; cursor:pointer; font-size:.82rem; font-family:'Space Grotesk',sans-serif;
          font-weight:500; transition:all .25s; }
        .st-btn.active { background:linear-gradient(135deg,var(--teal),var(--cyan)); color:#fff; border-color:transparent; font-weight:700; }
        .sport-detail { display:grid; grid-template-columns:1fr 1.2fr; gap:2.5rem; align-items:center; }
        .sport-img-wrap { border-radius:1.2rem; overflow:hidden; height:300px; position:relative; }
        .sport-img-wrap img { width:100%; height:100%; object-fit:cover; }
        .sport-badge { position:absolute; top:1rem; right:1rem; background:rgba(0,212,216,.9);
          color:#fff; font-size:.75rem; font-weight:700; padding:.3rem .9rem; border-radius:2rem; }
        .sport-icon { font-size:3rem; margin-bottom:1rem; }
        .sport-title { font-family:'Syne',sans-serif; font-size:1.8rem; font-weight:800; margin-bottom:.75rem; }
        .sport-desc { color:var(--muted); line-height:1.75; font-size:.95rem; margin-bottom:1.5rem; }
        .sport-price { font-family:'Syne',sans-serif; font-size:1.4rem; color:var(--cyan); font-weight:700; }

        /* SCALABILITY */
        .scale-grid { display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:center; }
        .city-cards { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
        .city-card { background:var(--glass); border:1px solid var(--gb); border-radius:1rem; padding:1.25rem;
          transition:all .3s; cursor:default; }
        .city-card.active { border-color:var(--cyan); background:rgba(0,212,216,.06); }
        .city-name { font-family:'Syne',sans-serif; font-weight:800; font-size:1rem; margin-bottom:.2rem; }
        .city-lake { font-size:.78rem; color:var(--muted); margin-bottom:.3rem; }
        .city-badge { display:inline-block; font-size:.65rem; font-weight:700; padding:.2rem .6rem;
          border-radius:1rem; letter-spacing:.08em; }
        .steps-list { display:flex; flex-direction:column; gap:1.2rem; }
        .step-item { display:flex; gap:1.2rem; align-items:flex-start; }
        .step-num { width:36px; height:36px; border-radius:50%; flex-shrink:0;
          background:linear-gradient(135deg,var(--teal),var(--cyan));
          display:flex; align-items:center; justify-content:center; font-size:.8rem; font-weight:800; color:#fff; }
        .step-text h4 { font-weight:700; font-size:.92rem; margin-bottom:.3rem; }
        .step-text p { font-size:.8rem; color:var(--muted); line-height:1.6; }

        /* COMMUNITY VOICES */
        .voice-tabs { display:flex; gap:.6rem; margin-bottom:2rem; flex-wrap:wrap; }
        .vt-btn { background:var(--glass); border:1px solid var(--gb); color:var(--muted);
          padding:.5rem 1.4rem; border-radius:2rem; cursor:pointer; font-size:.82rem;
          font-family:'Space Grotesk',sans-serif; transition:all .25s; }
        .vt-btn.active { background:linear-gradient(135deg,var(--teal),var(--cyan)); color:#fff; border-color:transparent; font-weight:700; }
        .testimonial-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:1.4rem; }
        .tcard { background:var(--glass); border:1px solid var(--gb); border-radius:1.1rem; padding:1.75rem;
          position:relative; overflow:hidden; transition:all .3s; }
        .tcard:hover { border-color:rgba(0,212,216,.3); transform:translateY(-3px); }
        .tcard::before { content:'"'; position:absolute; top:.5rem; right:1.2rem; font-size:4rem;
          color:rgba(0,212,216,.1); font-family:'Syne',sans-serif; line-height:1; }
        .tc-quote { font-style:italic; color:rgba(224,247,250,.75); font-size:.87rem; line-height:1.8; margin-bottom:1.2rem; }
        .tc-author { display:flex; align-items:center; gap:.75rem; }
        .tc-avatar { width:40px; height:40px; border-radius:50%;
          display:flex; align-items:center; justify-content:center; font-size:.72rem; font-weight:800; color:#fff; flex-shrink:0; }
        .tc-name { font-weight:700; font-size:.85rem; }
        .tc-role { font-size:.72rem; color:var(--muted); }

        /* PETITION */
        .petition-wrap { display:grid; grid-template-columns:1.2fr 1fr; gap:3rem; align-items:start; }
        .petition-card { background:linear-gradient(135deg,rgba(10,147,150,.1),rgba(0,212,216,.05));
          border:1px solid rgba(0,212,216,.2); border-radius:1.2rem; padding:2.5rem; }
        .pet-count { font-family:'Syne',sans-serif; font-size:3.5rem; font-weight:800;
          background:linear-gradient(135deg,var(--cyan),var(--emerald));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; line-height:1; }
        .pet-sub { font-size:.85rem; color:var(--muted); margin-top:.3rem; margin-bottom:1.5rem; }
        .pet-progress { height:10px; background:rgba(255,255,255,.08); border-radius:5px; overflow:hidden; margin-bottom:.6rem; }
        .pet-fill { height:100%; background:linear-gradient(90deg,var(--teal),var(--cyan));
          border-radius:5px; transition:width 1s ease; }
        .pet-milestones { display:flex; flex-direction:column; gap:.6rem; margin-top:1.2rem; }
        .pet-milestone { display:flex; align-items:center; gap:.6rem; font-size:.8rem; }
        .pm-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
        .rf-label { font-size:.72rem; text-transform:uppercase; letter-spacing:.1em; color:var(--muted); margin-bottom:.35rem; }
        .rf-input { width:100%; background:rgba(255,255,255,.04); border:1px solid var(--gb);
          border-radius:.6rem; padding:.7rem .9rem; color:var(--light);
          font-family:'Space Grotesk',sans-serif; font-size:.875rem;
          outline:none; transition:border-color .2s; margin-bottom:1rem; }
        .rf-input:focus { border-color:var(--cyan); }
        .rf-input option { background:#071b30; color:var(--light); }
        .rf-textarea { resize:vertical; min-height:90px; }

        /* REPORT */
        .report-layout { display:grid; grid-template-columns:1fr 1fr; gap:2rem; margin-top:2rem; }
        .report-form { background:var(--glass); border:1px solid var(--gb); border-radius:1rem; padding:1.75rem; }
        .report-feed { display:flex; flex-direction:column; gap:.85rem; }
        .rcard { background:var(--glass); border:1px solid var(--gb); border-radius:.85rem; padding:1rem 1.15rem; transition:border-color .3s; }
        .rcard.new { border-color:var(--cyan); animation:cardIn .5s ease; }
        @keyframes cardIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:none} }
        .rc-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:.45rem; }
        .rc-meta { display:flex; align-items:center; gap:.5rem; }
        .rc-av { width:28px; height:28px; border-radius:50%;
          background:linear-gradient(135deg,var(--teal),var(--cyan));
          display:flex; align-items:center; justify-content:center; font-size:.65rem; font-weight:700; color:#fff; }
        .rc-name { font-size:.82rem; font-weight:600; }
        .rc-time { font-size:.7rem; color:var(--muted); }
        .rc-badge { font-size:.68rem; font-weight:700; padding:.2rem .55rem; border-radius:2rem;
          background:rgba(0,212,216,.12); color:var(--cyan); border:1px solid rgba(0,212,216,.25); white-space:nowrap; }
        .rc-area { font-size:.72rem; color:var(--muted); margin-bottom:.3rem; }
        .rc-desc { font-size:.82rem; color:rgba(224,247,250,.8); line-height:1.55; }
        .gov-banner { margin-top:1.5rem; padding:1.1rem 1.2rem;
          background:rgba(15,163,109,.08); border:1px solid rgba(15,163,109,.25); border-radius:.85rem;
          display:flex; align-items:center; gap:.9rem; }
        .gov-text { font-size:.8rem; color:var(--muted); line-height:1.6; }
        .gov-text strong { color:var(--emerald); }

        /* DASHBOARD */
        .dash-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:1rem; margin-top:1.5rem; }
        .dcard { background:rgba(0,212,216,.05); border:1px solid rgba(0,212,216,.18); border-radius:.85rem; padding:1.25rem; text-align:center; }
        .dlbl { font-size:.68rem; text-transform:uppercase; letter-spacing:.1em; color:var(--muted); margin-bottom:.5rem; }
        .dval { font-family:'Syne',sans-serif; font-size:1.9rem; font-weight:800; color:var(--cyan); }
        .dunit { font-size:.68rem; color:var(--muted); }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.3} }
        .pulse { animation:pulse 1.5s infinite; }

        /* SDG */
        .sdg-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:1.2rem; }
        .sdg-card { border-radius:1.2rem; padding:1.75rem; text-align:center; transition:all .3s; border:1px solid rgba(255,255,255,.08); }
        .sdg-card:hover { transform:translateY(-5px) scale(1.02); }
        .sdg-num { font-family:'Syne',sans-serif; font-size:2.8rem; font-weight:800; line-height:1; display:block; margin-bottom:.2rem; }
        .sdg-icon { font-size:2rem; display:block; margin-bottom:.6rem; }
        .sdg-lbl { font-weight:700; font-size:.85rem; margin-bottom:.4rem; }
        .sdg-desc { font-size:.75rem; opacity:.7; line-height:1.55; }

        /* LOOP */
        .loop-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:1.3rem; margin-top:2rem; }
        .lcard { background:var(--glass); border:1px solid var(--gb); border-radius:1rem; padding:1.5rem; text-align:center; }
        .lc-icon { font-size:2rem; margin-bottom:.7rem; }
        .lc-lbl2 { font-weight:700; font-size:.9rem; margin-bottom:.5rem; color:var(--light); }
        .lc-items { font-size:.78rem; color:var(--muted); line-height:1.9; }

        /* CTA */
        .cta-wrap { background:linear-gradient(135deg,rgba(7,27,48,.9) 0%,rgba(3,13,26,.9) 100%);
          border-top:1px solid var(--gb); text-align:center; padding:7rem 5%;
          position:relative; overflow:hidden; }
        .cta-wrap::before { content:''; position:absolute; inset:0;
          background:radial-gradient(ellipse at 50% 50%,rgba(10,147,150,.2) 0%,transparent 70%); }

        /* FOOTER */
        footer { background:#020a16; border-top:1px solid rgba(255,255,255,.06);
          padding:2.5rem 5%; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; }

        /* MOBILE */
        @media(max-width:768px) {
          nav { padding:0 1.2rem; }
          .nlinks { display:none; }
          .ba-wrap { height:300px; }
          .scale-grid,.petition-wrap,.sport-detail,.report-layout { grid-template-columns:1fr; }
          .city-cards { grid-template-columns:1fr 1fr; }
          .hero-stats { gap:1.5rem; }
          .sec { padding:4rem 4%; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="nl">Revive Pragathi Lake</div>
        <ul className="nlinks">
          <li><a href="#problem">Problem</a></li>
          <li><a href="#transformation">Before/After</a></li>
          <li><a href="#activities">Activities</a></li>
          <li><a href="#scale">Scale</a></li>
          <li><a href="#voices">Voices</a></li>
          <li><a href="#petition">Petition</a></li>
          <li><a href="#report" className="ncta">Report Issue</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-img-strip" />
        <div style={{ position:"relative", zIndex:1, maxWidth:860, margin:"0 auto" }}>
          <div className="hero-badge">Mahindra University · Design Thinking 2025 · Pragathi Nagar, Hyderabad</div>
          <h1>REVIVE<br />PRAGATHI LAKE</h1>
          <p className="hero-sub">A stagnant, polluted water body threatening thousands of lives through mosquito-borne disease and toxic degradation — and a complete plan to restore, sustain, and celebrate it.</p>
          <div className="hero-btns">
            <a href="#transformation" className="btn-p">See the Transformation ↓</a>
            <a href="#petition" className="btn-o">Sign the Petition</a>
          </div>
          <div className="hero-stats">
            {[
              { val: 92, suf: "%", lbl: "Residents Report Odor" },
              { val: 8500, suf: "+", lbl: "Families at Risk" },
              { val: 12, suf: "", lbl: "Active Breeding Zones" },
              { val: 78, suf: "%", lbl: "Want Recreation Access" },
            ].map((s,i) => (
              <div key={i}>
                <div className="hs-num"><AnimCounter target={s.val} suffix={s.suf} /></div>
                <div className="hs-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <svg style={{position:"absolute",bottom:0,left:0,right:0,height:80}} viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
          <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="#030d1a"/>
        </svg>
      </div>

      {/* PROBLEM STATEMENT */}
      <div id="problem" className="sec-wrap">
        <div className="sec">
          <FadeIn><div className="lbl">01 — Problem Statement</div>
            <h2 className="ttl">A Lake Dying<br/><em>in Plain Sight</em></h2>
            <p className="dsc">Pragathi Lake has been reduced to a stagnant, toxic water body — a breeding ground for deadly mosquito-borne diseases, surrounded by illegal waste dumps and choked by unchecked urban runoff.</p>
          </FadeIn>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2rem",alignItems:"center",marginBottom:"3rem"}}>
            <FadeIn>
              <div style={{borderRadius:"1.2rem",overflow:"hidden",height:320,position:"relative"}}>
                <img src={IMG.polluted1} alt="Polluted lake" style={{width:"100%",height:"100%",objectFit:"cover",filter:"saturate(0.7)"}}/>
                <div style={{position:"absolute",top:"1rem",left:"1rem",background:"rgba(239,68,68,.85)",fontSize:".65rem",fontWeight:700,letterSpacing:".12em",padding:".3rem .8rem",borderRadius:"2rem",color:"#fff"}}>⚠ CURRENT STATE</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
                {[
                  {icon:"💧",h:"Stagnant Water",t:"Dissolved oxygen near zero. Algal blooms choke all aquatic life."},
                  {icon:"🦟",h:"Mosquito Breeding",t:"12 active breeding zones fuelling dengue, malaria, chikungunya outbreaks."},
                  {icon:"🗑️",h:"Waste Dumping",t:"Tonnes of plastic and construction debris dumped illegally every month."},
                  {icon:"💨",h:"Toxic Air",t:"Methane and hydrogen sulfide from organic decay cause respiratory illness."},
                ].map((c,i)=>(
                  <FadeIn key={i} delay={i*.08}>
                    <div className="gc" style={{padding:"1.3rem",borderTop:`3px solid ${["#ef4444","#f59e0b","#10b981","#8b5cf6"][i]}`}}>
                      <div style={{fontSize:"1.6rem",marginBottom:".5rem"}}>{c.icon}</div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:".9rem",marginBottom:".3rem"}}>{c.h}</div>
                      <div style={{fontSize:".78rem",color:"var(--muted)",lineHeight:1.6}}>{c.t}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* WHO IS AFFECTED */}
          <FadeIn delay={0.1}><div className="lbl" style={{marginTop:"1.5rem"}}>Who Gets Affected</div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.5rem",marginBottom:"1.5rem"}}>Every Resident, Every Day</h3>
          </FadeIn>
          <div className="affected-grid">
            {[
              {img:IMG.family,title:"Local Residents",desc:"Bad odor, water contamination & chronic health issues affecting 8,500+ families."},
              {img:IMG.kids,title:"School Children",desc:"At high risk from polluted water, mosquitoes, and skin infections during outdoor activities."},
              {img:IMG.vendor,title:"Street Vendors & Workers",desc:"Livelihoods depend on the lake area. Degradation has driven away foot traffic and income."},
              {img:IMG.community,title:"Elderly & Infants",desc:"Most vulnerable to mosquito-borne infections, respiratory illness, and waterborne disease."},
            ].map((a,i)=>(
              <FadeIn key={i} delay={i*.1}>
                <div className="aff-card">
                  <img src={a.img} alt={a.title} className="aff-img"/>
                  <div className="aff-body">
                    <div className="aff-title">{a.title}</div>
                    <div className="aff-desc">{a.desc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* HEALTH */}
          <FadeIn><div className="lbl" style={{marginTop:"4rem"}}>Public Health Crisis</div>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.5rem",marginBottom:"1.5rem"}}>Diseases Born in Stagnant Water</h3>
          </FadeIn>
          <div className="health-grid">
            {[
              {icon:"🦟",name:"Dengue Fever",stat:"2,400+",desc:"Annual cases in the ward. Aedes aegypti breeds in small water collections around the lake."},
              {icon:"🌡️",name:"Malaria",stat:"890+",desc:"Anopheles mosquitoes thrive in shallow, stagnant edges. Peaks during monsoon."},
              {icon:"🦴",name:"Chikungunya",stat:"1,100+",desc:"Joint-pain arbovirus from Aedes mosquitoes. Multiple outbreaks in surrounding colonies."},
              {icon:"💨",name:"Respiratory Issues",stat:"67%",desc:"Residents report chronic discomfort from methane and hydrogen sulfide gases."},
              {icon:"🧴",name:"Skin Infections",stat:"3×",desc:"Higher dermatological issues in children near the lake vs clean-water districts."},
              {icon:"💧",name:"Water Contamination",stat:"High",desc:"Groundwater infiltration spreads lake pollutants to nearby residential supply."},
            ].map((h,i)=>(
              <FadeIn key={i} delay={i*.08}>
                <div className="hcard">
                  <div className="hi">{h.icon}</div>
                  <div className="hn">{h.name}</div>
                  <span className="hstat">{h.stat}</span>
                  <div className="hd">{h.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* LIFECYCLE */}
          <FadeIn delay={0.1}>
            <div className="lc-wrap">
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",textAlign:"center",marginBottom:"1.5rem"}}>🔬 Mosquito Breeding Lifecycle — How Stagnant Water Fuels the Crisis</div>
              <div className="lc-steps">
                {[
                  {icon:"💧",lbl:"Stagnant Water",day:"Lake surface",c:"rgba(14,124,123,.3)",bc:"rgba(0,212,216,.5)"},
                  null,
                  {icon:"🥚",lbl:"Egg Laying",day:"Day 0 · 300 eggs",c:"rgba(245,166,35,.25)",bc:"rgba(245,166,35,.5)"},
                  null,
                  {icon:"🐛",lbl:"Larval Stage",day:"Days 1–4",c:"rgba(232,64,42,.25)",bc:"rgba(232,64,42,.5)"},
                  null,
                  {icon:"🫧",lbl:"Pupa",day:"Days 5–7",c:"rgba(126,207,79,.2)",bc:"rgba(126,207,79,.5)"},
                  null,
                  {icon:"🦟",lbl:"Adult Mosquito",day:"Day 8",c:"rgba(232,64,42,.35)",bc:"rgba(232,64,42,.7)"},
                  null,
                  {icon:"🩸",lbl:"Disease Trans.",day:"Dengue / Malaria",c:"rgba(220,38,38,.3)",bc:"rgba(220,38,38,.6)"},
                ].map((s,i) => s === null ? <div key={i} className="lc-arrow">→</div> : (
                  <div key={i} className="lc-step">
                    <div className="lc-circle" style={{background:s.c,border:`2px solid ${s.bc}`}}><span>{s.icon}</span></div>
                    <div className="lc-lbl">{s.lbl}</div>
                    <div className="lc-day">{s.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* BEFORE / AFTER */}
      <div id="transformation" className="sec-wrap2">
        <div className="sec">
          <FadeIn><div className="lbl">02 — Transformation</div>
            <h2 className="ttl">Before & <em>After</em> Restoration</h2>
            <p className="dsc">Drag the slider to compare the polluted lake today with the thriving ecosystem our system will create. Real photos, real vision.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="ba-wrap"
              onMouseMove={e => {
                const r = e.currentTarget.getBoundingClientRect();
                setSliderPos(Math.min(90,Math.max(10,((e.clientX-r.left)/r.width)*100)));
              }}
              onTouchMove={e => {
                const r = e.currentTarget.getBoundingClientRect();
                setSliderPos(Math.min(90,Math.max(10,((e.touches[0].clientX-r.left)/r.width)*100)));
              }}
            >
              {/* AFTER side (full width, behind) */}
              <div className="ba-side">
                <img src={IMG.lakeRestore1} alt="Restored lake" className="ba-after-img"/>
                <div className="ba-overlay ba-overlay-after">
                  <div className="ba-info">
                    <h3 style={{color:"#00d4d8"}}>✨ After Restoration</h3>
                    <ul className="ba-list">
                      <li>✅ Clean, oxygenated water</li>
                      <li>✅ Mosquito population reduced 80%+</li>
                      <li>✅ Recreational paths & water sports</li>
                      <li>✅ Biodiversity fully restored</li>
                      <li>✅ Community hub & weekend markets</li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* BEFORE clip */}
              <div className="ba-clip" style={{width:`${sliderPos}%`}}>
                <div className="ba-side" style={{width:`${100/sliderPos*100}%`,minWidth:"100vw"}}>
                  <img src={IMG.polluted1} alt="Polluted lake" className="ba-before-img"/>
                  <div className="ba-overlay ba-overlay-before">
                    <div className="ba-info">
                      <h3 style={{color:"#ff7043"}}>⚠ Current State</h3>
                      <ul className="ba-list">
                        <li>❌ Stagnant green water</li>
                        <li>❌ Mosquito infestation</li>
                        <li>❌ Floating waste & debris</li>
                        <li>❌ Toxic foul odor</li>
                        <li>❌ Unsafe, unusable space</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ba-divider" style={{left:`${sliderPos}%`}}>
                <div className="ba-handle">⇔</div>
              </div>
              <span className="ba-lbl" style={{left:"1rem"}}>BEFORE</span>
              <span className="ba-lbl" style={{right:"1rem"}}>AFTER</span>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* WATER SPORTS & ACTIVITIES */}
      <div id="activities" className="sec-wrap">
        <div className="sec">
          <FadeIn><div className="lbl">03 — Post-Restoration Vision</div>
            <h2 className="ttl">Water Sports &<br/><em>Community Activities</em></h2>
            <p className="dsc">A restored Pragathi Lake becomes a vibrant community hub — generating the very revenue that funds its own maintenance. Here's what residents will enjoy.</p>
          </FadeIn>

          <div className="sports-hero">
            <img src={IMG.cleanLake1} alt="Restored lake activities"/>
            <div className="sports-overlay">
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.4rem,3vw,2rem)",textAlign:"center",color:"#fff",textShadow:"0 2px 20px rgba(0,0,0,.8)"}}>
                From Polluted Wasteland to<br/>Community Paradise
              </div>
              <div style={{marginTop:"1rem",display:"flex",gap:".8rem",flexWrap:"wrap",justifyContent:"center"}}>
                {["🚣 Kayaking","⛵ Boating","🚴 Cycling","🧘 Yoga","🎪 Markets","🎣 Fishing"].map(t=>(
                  <span key={t} style={{background:"rgba(0,212,216,.25)",border:"1px solid rgba(0,212,216,.5)",padding:".35rem .9rem",borderRadius:"2rem",fontSize:".78rem",color:"#fff",backdropFilter:"blur(8px)"}}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="sports-tabs">
            {SPORTS.map((s,i)=>(
              <button key={i} className={`st-btn${activeSport===i?" active":""}`} onClick={()=>setActiveSport(i)}>
                {s.icon} {s.title}
              </button>
            ))}
          </div>

          <FadeIn key={activeSport}>
            <div className="sport-detail">
              <div className="sport-img-wrap">
                <img src={SPORTS[activeSport].img} alt={SPORTS[activeSport].title}/>
                <div className="sport-badge">{SPORTS[activeSport].price}</div>
              </div>
              <div>
                <div className="sport-icon">{SPORTS[activeSport].icon}</div>
                <div className="sport-title">{SPORTS[activeSport].title}</div>
                <div className="sport-desc">{SPORTS[activeSport].desc}</div>
                <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",marginBottom:"1.5rem"}}>
                  {["Family Friendly","Eco-Safe","Guided Sessions","Weekend Open"].map(t=>(
                    <span key={t} style={{background:"rgba(10,147,150,.15)",border:"1px solid rgba(10,147,150,.3)",padding:".3rem .8rem",borderRadius:"1rem",fontSize:".75rem",color:"var(--cyan)"}}>{t}</span>
                  ))}
                </div>
                <div className="sport-price">{SPORTS[activeSport].price}</div>
                <div style={{fontSize:".78rem",color:"var(--muted)",marginTop:".4rem"}}>Revenue funds lake maintenance directly</div>
                <a href="#petition" className="btn-p" style={{display:"inline-block",marginTop:"1.5rem",fontSize:".85rem",padding:".7rem 1.6rem"}}>Support the Restoration →</a>
              </div>
            </div>
          </FadeIn>

          {/* Revenue loop */}
          <FadeIn delay={0.2}>
            <div style={{marginTop:"3rem",background:"linear-gradient(135deg,rgba(10,147,150,.1),rgba(0,212,216,.05))",border:"1px solid rgba(0,212,216,.2)",borderRadius:"1.2rem",padding:"2rem",textAlign:"center"}}>
              <div className="lbl" style={{textAlign:"center",marginBottom:".5rem"}}>The Self-Sustaining Revenue Loop</div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:".5rem",flexWrap:"wrap",fontFamily:"'Space Grotesk',sans-serif",fontSize:".82rem"}}>
                {["🌊 Clean Lake","→","👥 Visitors","→","💰 Revenue","→","⚙️ Maintenance","→","🌊 Cleaner Lake"].map((s,i)=>(
                  s==="→" ? <span key={i} style={{color:"var(--teal)",fontSize:"1.2rem"}}>→</span>
                  : <span key={i} style={{background:"var(--glass)",border:"1px solid var(--gb)",padding:".45rem 1rem",borderRadius:".5rem",fontWeight:600,color:"var(--cyan)"}}>{s}</span>
                ))}
              </div>
              <p style={{fontSize:".82rem",color:"var(--muted)",marginTop:"1rem"}}>No external government budget required — the community sustains itself.</p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* HOW THE SYSTEM WORKS */}
      <div className="sec-wrap2">
        <div className="sec">
          <FadeIn><div className="lbl">04 — Engineering Solution</div>
            <h2 className="ttl">Three Systems,<br/><em>One Healthy Lake</em></h2>
            <p className="dsc">Solar power, biology, and autonomous robotics work in concert to restore and perpetually maintain the lake ecosystem.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap",gap:".4rem",marginBottom:"2.5rem"}}>
              {["Sunlight","→","Solar Panels","→","Aerators","→","↑ Dissolved O₂","→","Cleaner Water","→","Mosquitofish","→","↓ Larvae","→","Healthier Community"].map((s,i)=>
                s==="→" ? <span key={i} style={{color:"var(--teal)",fontSize:"1.2rem"}}>→</span>
                : <span key={i} style={{background:"var(--glass)",border:"1px solid var(--gb)",padding:".4rem .9rem",borderRadius:".5rem",fontSize:".78rem",fontWeight:600,color:"var(--cyan)"}}>{s}</span>
              )}
            </div>
          </FadeIn>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem"}}>
            {[
              {img:IMG.solarAerator,icon:"☀️",title:"Solar Pulse",color:"#f59e0b",desc:"Floating photovoltaic panels power submersible aerators 24/7. Raises dissolved oxygen from <2mg/L to >8mg/L. Mechanical agitation disrupts mosquito larvae on the surface.",feats:["Floating solar array on platform","Submersible diffusers + air pumps","Battery storage for night operation","Disrupts larval surface layer"]},
              {img:IMG.mosquitofish,icon:"🐟",title:"Natural Guardian",color:"#10b981",desc:"Gambusia affinis (mosquitofish) are introduced in shoreline zones where mechanical systems can't reach. Each fish consumes 100–300 larvae per day.",feats:["Targets shoreline larval pockets","100–300 larvae consumed/fish/day","Zero chemical pesticides needed","Self-sustaining breeding population"]},
              {img:IMG.robot,icon:"🤖",title:"Smart Shield",color:"#06b6d4",desc:"Autonomous solar-powered catamaran robots with ultrasonic sensors patrol the lake surface, collecting plastics and debris to eliminate micro-breeding pockets.",feats:["Ultrasonic obstacle sensors","Conveyor-based waste collection","Eliminates floating debris zones","Remote monitoring dashboard"]},
            ].map((s,i)=>(
              <FadeIn key={i} delay={i*.1}>
                <div className="gc" style={{overflow:"hidden",transition:"all .3s"}}>
                  <div style={{height:180,position:"relative",overflow:"hidden"}}>
                    <img src={s.img} alt={s.title} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(.7)"}}/>
                    <div style={{position:"absolute",top:"1rem",left:"1rem",background:`rgba(0,0,0,.7)`,padding:".3rem .8rem",borderRadius:"2rem",fontSize:"1.1rem"}}>{s.icon}</div>
                  </div>
                  <div style={{padding:"1.5rem"}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:s.color,marginBottom:".5rem"}}>{s.title}</div>
                    <div style={{fontSize:".82rem",color:"var(--muted)",lineHeight:1.7,marginBottom:"1rem"}}>{s.desc}</div>
                    <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:".3rem"}}>
                      {s.feats.map(f=><li key={f} style={{fontSize:".75rem",color:"rgba(224,247,250,.6)",paddingLeft:".8rem",position:"relative"}}>
                        <span style={{position:"absolute",left:0,color:s.color}}>›</span>{f}
                      </li>)}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* SCALABILITY */}
      <div id="scale" className="sec-wrap">
        <div className="sec">
          <FadeIn><div className="lbl">05 — Scaling the Model</div>
            <h2 className="ttl">From One Lake to<br/><em>Every Urban Lake</em></h2>
            <p className="dsc">India has over 2,00,000 urban water bodies — 67% are degraded. Our modular, self-funding system is designed to be replicated in any city within 90 days.</p>
          </FadeIn>
          <div className="scale-grid">
            <FadeIn>
              <div>
                <div className="steps-list">
                  {[
                    {n:"01",h:"Assessment & Survey",t:"2-week field survey mapping breeding zones, water quality parameters, and encroachment boundaries for target lake."},
                    {n:"02",h:"System Deployment",t:"Standardised deployment kit: 3 solar aerators, 2 debris robots, sensor network, and 500 mosquitofish. 4-week setup."},
                    {n:"03",h:"Community Onboarding",t:"Vendor registration, recreation planning, awareness drives, and revenue model activation. Parallel to deployment."},
                    {n:"04",h:"Revenue Activation",t:"First weekend market, boat rides, and vendor permits generate revenue from Month 2. No government budget required."},
                    {n:"05",h:"Monitor & Optimise",t:"Live IoT dashboard tracks water quality. AI predicts degradation 72h in advance for proactive maintenance."},
                  ].map((s,i)=>(
                    <FadeIn key={i} delay={i*.08}>
                      <div className="step-item">
                        <div className="step-num">{s.n}</div>
                        <div className="step-text">
                          <h4>{s.h}</h4>
                          <p>{s.t}</p>
                        </div>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div>
                <div style={{background:"rgba(0,212,216,.06)",border:"1px solid rgba(0,212,216,.2)",borderRadius:"1.2rem",padding:"1.75rem",marginBottom:"1.5rem"}}>
                  <div className="lbl" style={{marginBottom:".5rem"}}>Pilot → Scale Timeline</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:"2.5rem",fontWeight:800,color:"var(--cyan)"}}>90 Days</div>
                  <div style={{fontSize:".82rem",color:"var(--muted)",marginTop:".3rem"}}>From survey to first self-sustaining revenue</div>
                </div>
                <div className="city-cards">
                  {CITIES.map((c,i)=>(
                    <div key={i} className={`city-card${scaleCity===i?" active":""}`}>
                      <div className="city-name">{c.city}</div>
                      <div className="city-lake">{c.lake}</div>
                      <div className="city-lake">{c.area}</div>
                      <span className="city-badge" style={{background:scaleCity===i?c.color+"33":"rgba(255,255,255,.06)",color:scaleCity===i?c.color:"var(--muted)",border:`1px solid ${scaleCity===i?c.color+"66":"rgba(255,255,255,.1)"}`}}>
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{marginTop:"1.2rem",fontSize:".8rem",color:"var(--muted)",textAlign:"center",padding:"1rem",background:"var(--glass)",borderRadius:".75rem",border:"1px solid var(--gb)"}}>
                  🌍 Scaling to <strong style={{color:"var(--cyan)"}}>India's 2,00,000+</strong> urban lakes could protect <strong style={{color:"var(--cyan)"}}>40 million</strong> urban residents from mosquito-borne disease
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* LIVE DASHBOARD */}
      <div className="sec-wrap2">
        <div className="sec">
          <FadeIn>
            <div className="lbl">06 — Live Monitoring</div>
            <h2 className="ttl">Smart Lake <em>Dashboard</em></h2>
            <p className="dsc">
              <span style={{display:"inline-block",width:7,height:7,borderRadius:"50%",background:"var(--emerald)",marginRight:".4rem",verticalAlign:"middle",animation:"pulse 1.5s infinite"}}/>
              Real-time IoT sensor data from the restored lake — updating every 2 seconds.
            </p>
          </FadeIn>
          <div className="dash-grid">
            {[
              {lbl:"Dissolved O₂",val:dashData.do.toFixed(1),unit:"mg/L",good:true},
              {lbl:"pH Level",val:dashData.ph.toFixed(1),unit:"pH",good:true},
              {lbl:"Water Temp",val:dashData.temp,unit:"°C",good:true},
              {lbl:"Waste Collected",val:dashData.waste,unit:"kg today",good:true},
              {lbl:"Aerator Status",val:"ON",unit:"All nominal",good:true},
              {lbl:"Robot Battery",val:dashData.robot+"%",unit:"Charge",good:dashData.robot>30},
              {lbl:"Mosquito Index",val:dashData.mosquito,unit:"larvae/L (low)",good:true},
              {lbl:"Visitors Today",val:214+dashTick*3,unit:"people",good:true},
            ].map((d,i)=>(
              <FadeIn key={i} delay={i*.06}>
                <div className="dcard">
                  <div className="dlbl">{d.lbl}</div>
                  <div className="dval" style={{color:d.good?"var(--cyan)":"var(--warn)"}}>{d.val}</div>
                  <div className="dunit">{d.unit}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* COMMUNITY VOICES */}
      <div id="voices" className="sec-wrap">
        <div className="sec">
          <FadeIn><div className="lbl">07 — Community Voice</div>
            <h2 className="ttl">The People<br/>Demand <em>Change</em></h2>
            <p className="dsc">Primary research with 200+ residents, vendors, and community leaders reveals the deep personal and economic toll of living beside a degraded lake.</p>
          </FadeIn>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"1.3rem",marginBottom:"3rem"}}>
            {[
              {pct:92,desc:"of residents report foul odors impacting daily life and property value"},
              {pct:78,desc:"would use the lake recreationally if mosquito populations were controlled"},
              {pct:85,desc:"of vendors agreed to pay maintenance fees for clean vending spaces"},
              {pct:71,desc:"have a family member who suffered a mosquito-borne illness in the last year"},
            ].map((s,i)=>(
              <FadeIn key={i} delay={i*.1}>
                <div style={{background:"var(--glass)",border:"1px solid var(--gb)",borderRadius:"1rem",padding:"2rem",textAlign:"center"}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontSize:"3rem",fontWeight:800,background:"linear-gradient(135deg,var(--cyan),var(--emerald))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
                    <AnimCounter target={s.pct} suffix="%"/>
                  </div>
                  <div style={{fontSize:".82rem",color:"var(--muted)",lineHeight:1.7,marginTop:".4rem"}}>{s.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="voice-tabs">
            <button className={`vt-btn${voiceTab==="testimonials"?" active":""}`} onClick={()=>setVoiceTab("testimonials")}>💬 Testimonials</button>
            <button className={`vt-btn${voiceTab==="youth"?" active":""}`} onClick={()=>setVoiceTab("youth")}>🧒 Youth Voices</button>
          </div>

          {voiceTab === "testimonials" && (
            <div className="testimonial-grid">
              {voices.map((v,i)=>(
                <FadeIn key={i} delay={i*.08}>
                  <div className="tcard">
                    <div className="tc-quote">"{v.quote}"</div>
                    <div className="tc-author">
                      <div className="tc-avatar" style={{background:`linear-gradient(135deg,${v.color},${v.color}88)`}}>{v.avatar}</div>
                      <div>
                        <div className="tc-name">{v.name}</div>
                        <div className="tc-role">{v.role}</div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}

          {voiceTab === "youth" && (
            <div className="testimonial-grid">
              {[
                {avatar:"AK",color:"#06b6d4",name:"Aditya K., Age 14",role:"Student, 800m from lake",quote:"We had a school project about local water bodies. I couldn't even take photos near our lake because the smell was so bad. My teacher said it didn't used to be like this."},
                {avatar:"PS",color:"#8b5cf6",name:"Priya S., Age 16",role:"Student activist",quote:"I started a petition at my school. 200 students signed. We want to be able to do NCC drills near the lake, organise clean-up drives, and actually use it for nature studies."},
                {avatar:"RN",color:"#0fa36d",name:"Rahul N., Age 13",role:"Resident, Colony B",quote:"Three kids in my class got dengue last monsoon. My mum won't let me play outside after 5pm. I just want to be able to go to the park without coming home with mosquito bites."},
              ].map((v,i)=>(
                <FadeIn key={i} delay={i*.08}>
                  <div className="tcard">
                    <div className="tc-quote">"{v.quote}"</div>
                    <div className="tc-author">
                      <div className="tc-avatar" style={{background:`linear-gradient(135deg,${v.color},${v.color}88)`}}>{v.avatar}</div>
                      <div><div className="tc-name">{v.name}</div><div className="tc-role">{v.role}</div></div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PETITION */}
      <div id="petition" className="sec-wrap2">
        <div className="sec">
          <FadeIn><div className="lbl">08 — Take Action</div>
            <h2 className="ttl">Sign the <em>Petition</em></h2>
            <p className="dsc">Add your voice to thousands of residents demanding the restoration of Pragathi Lake. Signatures are submitted as a formal petition to the GHMC and Telangana State Government.</p>
          </FadeIn>
          <div className="petition-wrap">
            <FadeIn>
              <div className="petition-card">
                <div className="pet-count"><AnimCounter target={petitionCount} /></div>
                <div className="pet-sub">signatures and counting — goal: 10,000</div>
                <div className="pet-progress">
                  <div className="pet-fill" style={{width:`${Math.min(100,(petitionCount/10000)*100)}%`}}/>
                </div>
                <div style={{fontSize:".75rem",color:"var(--muted)",textAlign:"right",marginTop:".3rem"}}>{((petitionCount/10000)*100).toFixed(1)}% of goal</div>
                <div className="pet-milestones">
                  {[
                    {n:1000,label:"GHMC formal notice issued",met:true},
                    {n:2500,label:"State Environment Dept. notified",met:true},
                    {n:5000,label:"Media coverage & press release",met:petitionCount>=5000},
                    {n:10000,label:"Direct CM petition submission",met:petitionCount>=10000},
                  ].map(m=>(
                    <div key={m.n} className="pet-milestone">
                      <div className="pm-dot" style={{background:m.met?"var(--emerald)":"rgba(255,255,255,.15)",border:m.met?"none":"1px solid rgba(255,255,255,.2)"}}/>
                      <span style={{color:m.met?"var(--light)":"var(--muted)",fontSize:".8rem"}}>
                        <strong style={{color:m.met?"var(--cyan)":"var(--muted)"}}>{m.n.toLocaleString()} signatures</strong> — {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              {petitionSigned ? (
                <div style={{background:"rgba(15,163,109,.1)",border:"1px solid rgba(15,163,109,.3)",borderRadius:"1.2rem",padding:"3rem",textAlign:"center"}}>
                  <div style={{fontSize:"3.5rem",marginBottom:"1rem"}}>✅</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.3rem",color:"var(--emerald)",marginBottom:".75rem"}}>Signature Recorded!</div>
                  <div style={{fontSize:".85rem",color:"var(--muted)",lineHeight:1.7,marginBottom:"1.5rem"}}>
                    Thank you for signing. Your voice has been added to our petition batch which will be submitted to GHMC alongside <strong style={{color:"var(--cyan)"}}>{petitionCount.toLocaleString()} other signatures</strong>.
                  </div>
                  <a href="#report" className="btn-p" style={{fontSize:".85rem",padding:".7rem 1.6rem"}}>Also Report an Issue →</a>
                </div>
              ) : (
                <div style={{background:"var(--glass)",border:"1px solid var(--gb)",borderRadius:"1.2rem",padding:"2rem"}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.15rem",marginBottom:"1.5rem"}}>Add Your Signature</div>
                  <div className="rf-label">Your Full Name *</div>
                  <input className="rf-input" placeholder="e.g. Ravi Kumar" value={petitionForm.name} onChange={e=>setPetitionForm(p=>({...p,name:e.target.value}))}/>
                  <div className="rf-label">Email Address *</div>
                  <input className="rf-input" type="email" placeholder="your@email.com" value={petitionForm.email} onChange={e=>setPetitionForm(p=>({...p,email:e.target.value}))}/>
                  <div className="rf-label">Your Area / Colony</div>
                  <select className="rf-input" value={petitionForm.area} onChange={e=>setPetitionForm(p=>({...p,area:e.target.value}))}>
                    <option value="">Select your area</option>
                    <option>Pragathi Nagar Colony</option>
                    <option>North Colony</option>
                    <option>South Extension</option>
                    <option>East Block</option>
                    <option>West Colony</option>
                    <option>Nearby Resident</option>
                    <option>Other / Online Supporter</option>
                  </select>
                  <button className="btn-p" style={{width:"100%",fontSize:".9rem",marginTop:".5rem"}}
                    disabled={!petitionForm.name||!petitionForm.email}
                    onClick={()=>{setPetitionSigned(true);setPetitionCount(p=>p+1);}}>
                    ✍️ Sign the Petition →
                  </button>
                  <div style={{fontSize:".72rem",color:"var(--muted)",marginTop:".75rem",textAlign:"center"}}>
                    Your data is used only for this petition. Submitted to GHMC & State Government.
                  </div>
                </div>
              )}
            </FadeIn>
          </div>
        </div>
      </div>

      {/* REPORT A PROBLEM */}
      <div id="report" className="sec-wrap">
        <div className="sec">
          <FadeIn><div className="lbl">09 — Citizen Action</div>
            <h2 className="ttl">Report a <em>Problem</em></h2>
            <p className="dsc">Spotted an issue at Pragathi Lake? Submit your report. We group community complaints and escalate them together to GHMC for faster action.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:"rgba(0,212,216,.1)",border:"1px solid rgba(0,212,216,.2)",borderRadius:"2rem",padding:".35rem 1rem",fontSize:".8rem",fontWeight:600,color:"var(--cyan)",marginBottom:"1.5rem"}}>
              <span style={{width:8,height:8,borderRadius:"50%",background:"var(--emerald)",display:"inline-block",animation:"pulse 1.5s infinite"}}/>
              {reportCount} reports collected — next government batch in 3 days
            </div>
          </FadeIn>
          <div className="report-layout">
            <div className="report-form">
              {reportState === "submitted" ? (
                <div style={{textAlign:"center",padding:"2rem 1.5rem"}}>
                  <div style={{fontSize:"3rem",marginBottom:".75rem"}}>✅</div>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,color:"var(--cyan)",fontSize:"1.2rem",marginBottom:".5rem"}}>Report Submitted!</div>
                  <div style={{fontSize:".85rem",color:"var(--muted)",lineHeight:1.6,marginBottom:"1.5rem"}}>Logged and added to the community batch. Will be forwarded to GHMC with {reportCount - 1} other reports.</div>
                  <div style={{height:6,background:"rgba(255,255,255,.08)",borderRadius:3,overflow:"hidden",marginBottom:".4rem"}}>
                    <div style={{height:"100%",background:"linear-gradient(90deg,var(--teal),var(--cyan))",width:"73%",borderRadius:3}}/>
                  </div>
                  <div style={{fontSize:".72rem",color:"var(--muted)",textAlign:"right"}}>73% toward submission threshold</div>
                  <button className="btn-p" style={{marginTop:"1.5rem",background:"var(--glass)",border:"1px solid var(--gb)",color:"var(--muted)",boxShadow:"none"}}
                    onClick={()=>{setReportState("idle");setReportForm({name:"",area:"",category:"",desc:""});}}>
                    Submit another report
                  </button>
                </div>
              ) : (<>
                <div className="rf-label">Your Name</div>
                <input className="rf-input" placeholder="e.g. Ravi Kumar" value={reportForm.name} onChange={e=>setReportForm(p=>({...p,name:e.target.value}))}/>
                <div className="rf-label">Area / Location</div>
                <select className="rf-input" value={reportForm.area} onChange={e=>setReportForm(p=>({...p,area:e.target.value}))}>
                  <option value="">Select area near the lake</option>
                  {["North Bank","South Gate","East Side","West Corner","Lake Inlet","Walking Path","Other"].map(a=><option key={a}>{a}</option>)}
                </select>
                <div className="rf-label">Problem Category</div>
                <select className="rf-input" value={reportForm.category} onChange={e=>setReportForm(p=>({...p,category:e.target.value}))}>
                  <option value="">Select a category</option>
                  {["Waste Dumping","Mosquito Breeding","Water Quality","Odor Issue","Encroachment","Sewage Discharge","Other"].map(c=><option key={c}>{c}</option>)}
                </select>
                <div className="rf-label">Describe the Problem</div>
                <textarea className="rf-input rf-textarea" placeholder="What did you observe? Where exactly? When did it happen?" value={reportForm.desc} onChange={e=>setReportForm(p=>({...p,desc:e.target.value}))}/>
                <button className="btn-p" style={{width:"100%"}}
                  disabled={reportState==="submitting"||!reportForm.name||!reportForm.area||!reportForm.category||!reportForm.desc}
                  onClick={()=>{
                    setReportState("submitting");
                    setTimeout(()=>{
                      const tagMap={"Waste Dumping":"🗑️","Mosquito Breeding":"🦟","Water Quality":"💧","Odor Issue":"💨","Encroachment":"🚧","Sewage Discharge":"⚠️","Other":"📋"};
                      setReports(prev=>[{id:Date.now(),name:reportForm.name.split(" ")[0]+" "+(reportForm.name.split(" ")[1]?.[0]||"")+".",area: reportForm.area,category:reportForm.category,desc:reportForm.desc,time:"just now",tag:tagMap[reportForm.category]||"📋",isNew:true},...prev.slice(0,4)]);
                      setReportCount(p=>p+1);
                      setReportState("submitted");
                    },1600);
                  }}>
                  {reportState==="submitting"?"Submitting…":"Submit to Community Batch →"}
                </button>
                {reportState==="submitting"&&<div style={{marginTop:".75rem",fontSize:".78rem",color:"var(--muted)",textAlign:"center"}}>Encrypting and logging your report…</div>}
                <div className="gov-banner">
                  <div style={{fontSize:"1.5rem",flexShrink:0}}>🏛️</div>
                  <div className="gov-text"><strong>Forwarded to GHMC</strong> — All reports are grouped by category and area, then submitted as a consolidated petition to the Greater Hyderabad Municipal Corporation every 7 days.</div>
                </div>
              </>)}
            </div>
            <div>
              <div style={{fontSize:".78rem",fontWeight:700,color:"var(--muted)",marginBottom:".85rem",textTransform:"uppercase",letterSpacing:".08em"}}>Recent Community Reports</div>
              <div className="report-feed">
                {reports.slice(0,5).map((r,i)=>(
                  <div key={r.id} className={`rcard${r.isNew?" new":""}`}>
                    <div className="rc-head">
                      <div className="rc-meta">
                        <div className="rc-av">{r.name.split(" ").map(w=>w[0]).join("").slice(0,2)}</div>
                        <div><div className="rc-name">{r.name}</div><div className="rc-time">{r.time}</div></div>
                      </div>
                      <div className="rc-badge">{r.tag} {r.category}</div>
                    </div>
                    <div className="rc-area">📍 {r.area}</div>
                    <div className="rc-desc">{r.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SDG */}
      <div className="sec-wrap2">
        <div className="sec">
          <FadeIn><div className="lbl">10 — Global Goals</div>
            <h2 className="ttl">UN Sustainable<br/><em>Development Goals</em></h2>
            <p className="dsc">Revive Pragathi Lake directly advances five of the UN's 2030 SDGs — proving that local action creates global impact.</p>
          </FadeIn>
          <div className="sdg-grid">
            {[
              {n:3,icon:"🏥",lbl:"Good Health & Well-being",color:"#4caf50",desc:"Eliminates mosquito breeding, reducing dengue, malaria, and chikungunya across the community."},
              {n:6,icon:"💧",lbl:"Clean Water & Sanitation",color:"#2196f3",desc:"Lake restoration improves local groundwater, reduces contamination, and restores clean ecosystem."},
              {n:11,icon:"🏙️",lbl:"Sustainable Cities",color:"#ff9800",desc:"Transforms a degraded urban space into a thriving, resilient community hub."},
              {n:13,icon:"🌍",lbl:"Climate Action",color:"#4db6ac",desc:"Restored wetlands sequester carbon, reduce methane, and provide urban cooling."},
              {n:15,icon:"🌊",lbl:"Life on Land",color:"#1565c0",desc:"Ecological restoration brings back native species and rebuilds urban biodiversity corridors."},
            ].map((s,i)=>(
              <FadeIn key={s.n} delay={i*.1}>
                <div className="sdg-card" style={{background:`linear-gradient(135deg,${s.color}22,${s.color}08)`,borderColor:`${s.color}44`}}>
                  <span className="sdg-icon">{s.icon}</span>
                  <span className="sdg-num" style={{color:s.color}}>SDG {s.n}</span>
                  <div className="sdg-lbl">{s.lbl}</div>
                  <div className="sdg-desc">{s.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="cta-wrap">
        <div style={{position:"relative",maxWidth:760,margin:"0 auto"}}>
          <FadeIn>
            <div className="lbl" style={{textAlign:"center",marginBottom:"1rem"}}>Join the Movement</div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(2rem,5vw,3.5rem)",fontWeight:800,lineHeight:1.08,marginBottom:"1.2rem"}}>
              The Lake Can <em style={{color:"var(--cyan)"}}>Live Again.</em><br/>Will You Help?
            </h2>
            <p style={{fontSize:"1.05rem",color:"var(--muted)",lineHeight:1.8,maxWidth:580,margin:"0 auto 2.5rem"}}>
              Revive Pragathi Lake is not just a cleanup — it is a self-sustaining ecological and community-driven system designed to protect lives, restore nature, and inspire cities across India.
            </p>
            <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
              <a href="#petition" className="btn-p">✍️ Sign the Petition</a>
              <a href="#report" className="btn-p" style={{background:"linear-gradient(135deg,var(--emerald),var(--lime))"}}>🌿 Report an Issue</a>
              <a href="#activities" className="btn-o">🚣 See Activities</a>
            </div>
            <div style={{marginTop:"2rem",fontSize:".75rem",color:"rgba(255,255,255,.25)",fontFamily:"'Space Grotesk',sans-serif",letterSpacing:".12em",textTransform:"uppercase"}}>
              A Mahindra University Design Thinking Project · Pragathi Nagar Lake Restoration · 2025
            </div>
          </FadeIn>
        </div>
      </div>

      <footer>
        <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",background:"linear-gradient(90deg,var(--cyan),var(--emerald))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Revive Pragathi Lake</div>
        <div style={{fontSize:".8rem",color:"rgba(255,255,255,.35)"}}>Technology drives the restoration. Community sustains the future.</div>
        <div style={{fontSize:".78rem",color:"rgba(255,255,255,.35)",textAlign:"right"}}>A <strong style={{color:"var(--cyan)"}}>Mahindra University</strong> Initiative</div>
      </footer>
    </div>
  );
}