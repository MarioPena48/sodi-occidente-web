import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Menu,
  MessageCircle,
  Minus,
  Moon,
  Plus,
  Sun,
  X,
} from "lucide-react";
import {
  DESTINATIONS,
  EXPERIENCES,
  FAQS,
  FLEET,
  REVIEWS,
} from "./data/sodiData";

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, delay: i * 0.08, ease: EASE },
  }),
};

function defaultDate() {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split("T")[0];
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [mobileMenu, setMobileMenu] = useState(false);

  // Hero & Reservation synced state
  const [pickupDate, setPickupDate] = useState(defaultDate);
  const [days, setDays] = useState(1);
  const [selectedDest, setSelectedDest] = useState("Tequila, Jalisco");
  const [selectedUnit, setSelectedUnit] = useState(FLEET[0].name);
  const [fleetFilter, setFleetFilter] = useState("all");
  const [activeDestId, setActiveDestId] = useState(DESTINATIONS[0].id);
  const [openFaq, setOpenFaq] = useState(0);

  // Quote Form fields
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [pickupPoint, setPickupPoint] = useState(
    "Guadalajara / Zona Metropolitana"
  );
  const [notes, setNotes] = useState("");
  const [submittedMsg, setSubmittedMsg] = useState("");

  // Hero subtle parallax
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 950);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const activeDest =
    DESTINATIONS.find((d) => d.id === activeDestId) || DESTINATIONS[0];

  const filteredFleet =
    fleetFilter === "all"
      ? FLEET
      : FLEET.filter((u) => u.category === fleetFilter);

  const scrollTo = (id) => {
    setMobileMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChooseUnit = (unitName) => {
    setSelectedUnit(unitName);
    scrollTo("reservar");
  };

  const handleChooseDest = (destName) => {
    setSelectedDest(destName);
    scrollTo("reservar");
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    scrollTo("flotilla");
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const msg = `Hola SODI de Occidente, soy ${clientName}. Quisiera cotizar ${selectedUnit} (100% con chofer) para ${selectedDest}, saliendo de ${pickupPoint} el ${pickupDate} por ${days} ${
      days === 1 ? "día" : "días"
    }. Tel: ${clientPhone}.${notes ? " Notas: " + notes : ""}`;
    setSubmittedMsg(msg);
  };

  return (
    <>
      {/* KORVANT-STYLE SPLASH PRELOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.55, ease: EASE } }}
          >
            <motion.img
              src="./images/logo-dark.png"
              alt="SODI de Occidente"
              className="preloader-logo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            />
            <div className="preloader-bar-wrap">
              <motion.div
                className="preloader-bar"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: EASE }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING GLASS PILL NAVBAR */}
      <header className="nav-wrap">
        <div className="nav-pill">
          <a href="#inicio" className="nav-brand">
            <img
              src={
                theme === "dark"
                  ? "./images/logo-dark.png"
                  : "./images/logo-light.png"
              }
              alt="SODI de Occidente S.A. de C.V."
            />
          </a>

          <nav className="nav-links">
            <a href="#flotilla">Flotilla</a>
            <a href="#destinos">Destinos</a>
            <a href="#experiencias">Experiencias</a>
            <a href="#estandar">Nosotros</a>
            <a href="#preguntas">Preguntas</a>
          </nav>

          <div className="nav-right">
            <button
              type="button"
              className="theme-btn"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Cambiar tema claro u oscuro"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button
              type="button"
              className="btn-ivory"
              onClick={() => scrollTo("reservar")}
            >
              Reservar
            </button>
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenu((v) => !v)}
              aria-label="Menú"
            >
              {mobileMenu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            style={{
              position: "fixed",
              top: 90,
              left: 20,
              right: 20,
              zIndex: 99,
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {[
              ["Flotilla", "flotilla"],
              ["Destinos en Jalisco", "destinos"],
              ["Experiencias", "experiencias"],
              ["Nosotros", "estandar"],
              ["Preguntas", "preguntas"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--fg)",
                  textAlign: "left",
                  fontSize: "1rem",
                  padding: "6px 0",
                  cursor: "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECTION 1: FULL-BLEED CINEMATIC HERO */}
      <section className="hero" id="inicio" ref={heroRef}>
        <motion.div className="hero-bg" style={{ y: heroImgY }}>
          <img
            src="./images/hero-tequila-sprinter.jpg"
            alt="Camioneta Mercedes-Benz Sprinter SODI en los campos de agave de Tequila, Jalisco"
          />
        </motion.div>
        <div className="hero-scrim" />

        <div className="container hero-content">
          <div className="hero-copy">
            <motion.p
              className="hero-eyebrow"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
            >
              TRANSPORTE PRIVADO CON CHOFER, JALISCO
            </motion.p>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.0, ease: EASE }}
            >
              Camionetas ejecutivas,
              <br />
              <span>con chofer a tu puerta.</span>
            </motion.h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.12, ease: EASE }}
            >
              Unidades amplias para grupos grandes, empresas y familias. 100% de
              nuestros servicios incluyen chofer profesional, recolección en tu
              hotel, domicilio o aeropuerto en Guadalajara.
            </motion.p>

            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.22, ease: EASE }}
            >
              <button
                type="button"
                className="btn-ivory"
                style={{ background: "#f0efea", color: "#0e0e10" }}
                onClick={() => scrollTo("flotilla")}
              >
                Explorar flotilla <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="btn-glass"
                onClick={() => scrollTo("reservar")}
              >
                <MessageCircle size={16} /> Cotizar con asesor
              </button>
            </motion.div>
          </div>

          {/* KORVANT FLOATING GLASS AVAILABILITY BAR */}
          <motion.form
            className="hero-bar"
            onSubmit={handleHeroSearch}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.3, ease: EASE }}
          >
            <div className="hb-col">
              <label className="hb-label" htmlFor="heroDate">
                Fecha de salida
              </label>
              <input
                id="heroDate"
                type="date"
                className="hb-input"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>

            <div className="hb-col">
              <span className="hb-label">Días</span>
              <div className="stepper">
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setDays((d) => Math.max(1, d - 1))}
                  aria-label="Restar día"
                >
                  <Minus size={14} />
                </button>
                <span style={{ fontWeight: 500, minWidth: 18, textAlign: "center" }}>
                  {days}
                </span>
                <button
                  type="button"
                  className="step-btn"
                  onClick={() => setDays((d) => Math.min(15, d + 1))}
                  aria-label="Sumar día"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="hb-col">
              <label className="hb-label" htmlFor="heroDest">
                Destino (100% con chofer)
              </label>
              <select
                id="heroDest"
                className="hb-select"
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
                <option value="Otro destino (cualquier ciudad de México)">
                  Otro destino (vamos a donde sea)
                </option>
              </select>
            </div>

            <button type="submit" className="btn-ivory">
              Ver disponibilidad <ArrowRight size={16} />
            </button>
          </motion.form>
        </div>
      </section>

      {/* SECTION 2: STATEMENT + INTERIOR SPLIT (korvant_2) */}
      <section className="section">
        <div className="container statement-grid">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="statement-h2">
              Una flotilla propia, un calendario y una persona directa en tu
              chat.{" "}
              <span className="h-muted">
                Cada camioneta se revisa dos veces y siempre llega conducida por
                un chofer profesional de nuestro equipo.
              </span>
            </h2>

            <div className="statement-metrics">
              <div>
                <div className="sm-label">Operador</div>
                <div className="sm-val">100% con chofer incluido</div>
              </div>
              <div>
                <div className="sm-label">Cobertura</div>
                <div className="sm-val">Seguro de viajero vigente</div>
              </div>
              <div>
                <div className="sm-label">Respuesta</div>
                <div className="sm-val">En menos de una hora</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="editorial-photo"
            style={{ aspectRatio: "4 / 3.6" }}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <img
              src="./images/interior-leather.jpg"
              alt="Interiores en piel de camioneta ejecutiva SODI de Occidente"
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: THE FLEET (3-Column Borderless Showroom Grid — korvant_3) */}
      <section className="section" id="flotilla" style={{ paddingTop: 24 }}>
        <div className="container">
          <motion.div
            className="section-head"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="h-display">
              La flotilla.{" "}
              <span className="h-muted">Cada unidad, impecable y con chofer.</span>
            </h2>
            <p>
              Camionetas para grupos pequeños, familias numerosas y eventos
              corporativos. En ningún servicio tienes que manejar.
            </p>
          </motion.div>

          <div className="fleet-toolbar">
            <span className="fleet-caption">
              Todas las unidades incluyen operador profesional, A/C y seguro de
              viajero.
            </span>
            <div className="fleet-filters">
              {[
                ["all", "Todas"],
                ["vip", "Ejecutiva (6–7)"],
                ["med", "Grupos (14)"],
                ["large", "Sprinter (15–19)"],
                ["xl", "Eventos (20+)"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`chip-filter ${fleetFilter === key ? "active" : ""}`}
                  onClick={() => setFleetFilter(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="fleet-grid">
            <AnimatePresence mode="popLayout">
              {filteredFleet.map((unit, idx) => (
                <motion.article
                  key={unit.id}
                  layout
                  className="fleet-item"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: idx * 0.05, ease: EASE }}
                >
                  <div className="fleet-img-wrap">
                    <img src={unit.image} alt={unit.name} />
                  </div>
                  <div className="fleet-meta-top">
                    <h3 className="fleet-name">{unit.name}</h3>
                    <div className="fleet-cap">
                      {unit.capacity} <span>/ con chofer</span>
                    </div>
                  </div>
                  <div className="fleet-meta-mid">
                    <span>{unit.subtitle}</span>
                    <span>{unit.specs}</span>
                  </div>
                  <button
                    type="button"
                    className="link-underline"
                    onClick={() => handleChooseUnit(unit.name)}
                  >
                    Cotizar unidad <ArrowRight size={14} />
                  </button>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          <div style={{ marginTop: 52, textAlign: "center" }}>
            <button
              type="button"
              className="btn-outline-dark"
              onClick={() => scrollTo("reservar")}
            >
              Cotizar grupo grande o varias camionetas <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE JALISCO DESTINATIONS (korvant_4) */}
      <section className="section" id="destinos">
        <div className="container">
          <motion.div
            className="section-head"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="h-display">
              Te llevamos a donde sea.{" "}
              <span className="h-muted">Algunas recomendaciones en Jalisco.</span>
            </h2>
            <p>
              Estos destinos son solo recomendaciones de los viajes más
              solicitados. <strong>Vamos a cualquier destino, playa, hacienda o estado de México</strong>{" "}
              — tú eliges el lugar y nuestro chofer te lleva.
            </p>
          </motion.div>

          <div className="dest-grid">
            <div className="dest-list">
              {DESTINATIONS.map((dest) => {
                const isActive = dest.id === activeDestId;
                return (
                  <div
                    key={dest.id}
                    className={`dest-row ${isActive ? "active" : ""}`}
                    onClick={() => setActiveDestId(dest.id)}
                    onMouseEnter={() => setActiveDestId(dest.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveDestId(dest.id);
                      }
                    }}
                  >
                    <div className="dest-row-head">
                      <span className="dest-row-title">{dest.name}</span>
                      <span className="dest-row-time">{dest.time}</span>
                    </div>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          style={{ overflow: "hidden" }}
                        >
                          <p className="dest-row-desc">{dest.desc}</p>
                          {/* Inline photo card visible on mobile & tablet right inside the selected destination */}
                          <div className="dest-mobile-card">
                            <img src={dest.image} alt={dest.name} />
                            <div className="dest-mobile-overlay">
                              <span style={{ fontSize: "0.78rem", opacity: 0.9 }}>
                                Chofer incluido
                              </span>
                              <button
                                type="button"
                                className="btn-ivory"
                                style={{
                                  background: "#f0efea",
                                  color: "#0e0e10",
                                  height: 36,
                                  padding: "0 14px",
                                  fontSize: "0.82rem",
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleChooseDest(dest.name);
                                }}
                              >
                                Cotizar ruta <ArrowRight size={13} />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="dest-photo-box">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeDest.id}
                  src={activeDest.image}
                  alt={activeDest.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.48, ease: EASE }}
                />
              </AnimatePresence>
              <div className="dest-photo-overlay">
                <div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.72, marginBottom: 4 }}>
                    {activeDest.time} • Chofer profesional incluido
                  </div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 500 }}>
                    {activeDest.name}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-ivory"
                  style={{ background: "#f0efea", color: "#0e0e10", height: 40, padding: "0 18px" }}
                  onClick={() => handleChooseDest(activeDest.name)}
                >
                  Cotizar ruta <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="dest-anywhere-bar">
            <p>
              <strong>¿Tu destino no está en la lista?</strong> Estos lugares son
              solo recomendaciones. Te llevamos a{" "}
              <strong>cualquier ciudad, playa, evento o estado del país</strong>{" "}
              con chofer profesional incluido.
            </p>
            <button
              type="button"
              className="btn-outline-dark"
              onClick={() =>
                handleChooseDest("Otro destino (cualquier ciudad de México)")
              }
            >
              Cotizar otro destino <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: EXPERIENCES FULL-BLEED VERTICAL CARDS (korvant_5) */}
      <section className="section" id="experiencias" style={{ paddingTop: 24 }}>
        <div className="container">
          <motion.div
            className="section-head"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="h-display">
              No es solo una camioneta.{" "}
              <span className="h-muted">Es todo el viaje.</span>
            </h2>
            <p>
              Cuatro experiencias con la ruta, las paradas y el chofer
              profesional ya planeados para tu grupo.
            </p>
          </motion.div>

          <div className="exp-strip">
            {EXPERIENCES.map((exp, idx) => (
              <motion.article
                key={exp.id}
                className="exp-card"
                onClick={() => handleChooseDest(exp.destName)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: idx * 0.08, ease: EASE }}
              >
                <img src={exp.image} alt={exp.title} />
                <div className="exp-scrim">
                  <h3>{exp.title}</h3>
                  <p>{exp.desc}</p>
                  <div className="exp-meta">
                    <span>{exp.duration}</span>
                    <span>{exp.note}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: CHAUFFEUR STANDARD 50/50 (korvant_6) */}
      <section className="section" id="estandar">
        <div className="container standard-grid">
          <motion.div
            className="standard-photo"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: EASE }}
          >
            <img
              src="./images/chauffeur-handover.jpg"
              alt="Chofer profesional de SODI de Occidente abriendo puerta de camioneta ejecutiva"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="h-display" style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)" }}>
              Tu camioneta está lista
              <br />
              <span className="h-muted">antes que tú.</span>
            </h2>

            <div className="standard-list">
              <div className="standard-row">
                <h3>100% con chofer profesional</h3>
                <p>
                  Todas nuestras camionetas incluyen operador uniformado y
                  capacitado en carretera. Tú solo disfrutas el destino con tu
                  grupo.
                </p>
              </div>
              <div className="standard-row">
                <h3>Seguridad y seguro de viajero</h3>
                <p>
                  Mantenimiento preventivo riguroso, seguro vigente de viajero y
                  respaldo formal de Servicios y Transportes SODI de Occidente
                  S.A. de C.V.
                </p>
              </div>
              <div className="standard-row">
                <h3>Una persona, no un ticket</h3>
                <p>
                  Un solo chat directo con nuestro equipo en Guadalajara.
                  Cotizaciones transparentes y respuesta en menos de una hora.
                </p>
              </div>
              <div className="standard-row">
                <h3>Puntualidad al detalle</h3>
                <p>
                  Llegamos antes de la hora acordada a tu hotel, domicilio o
                  llegadas del Aeropuerto de Guadalajara, con unidades limpias y
                  climatizadas.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 7: WARM IVORY PROCESS BLOCK (korvant_7) */}
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <motion.div
            className="ivory-block"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <h2 className="h-display">
              De tu primer mensaje{" "}
              <span className="h-muted">hasta tu destino.</span>
            </h2>

            <div className="steps-grid">
              <div className="step-col">
                <div className="step-num">01</div>
                <h3>Elige fecha y destino</h3>
                <p>
                  Indícanos fecha, número de pasajeros y si van a Tequila,
                  Mazamitla, Tapalpa, aeropuerto o evento.
                </p>
              </div>
              <div className="step-col">
                <div className="step-num">02</div>
                <h3>Envía tu mensaje</h3>
                <p>
                  Por WhatsApp o en el formulario de abajo. Te enviamos
                  cotización clara en menos de una hora.
                </p>
              </div>
              <div className="step-col">
                <div className="step-num">03</div>
                <h3>Aparta tu fecha</h3>
                <p>
                  Confirma con anticipo, recibe tu factura CFDI si la requieres
                  y los datos de tu operador asignado.
                </p>
              </div>
              <div className="step-col">
                <div className="step-num">04</div>
                <h3>Tu chofer pasa por ti</h3>
                <p>
                  Recogemos a tu grupo puntual en la puerta y te llevamos de ida
                  y vuelta con total tranquilidad.
                </p>
              </div>
            </div>

            <div className="ivory-actions">
              <button
                type="button"
                className="btn-solid-inv"
                onClick={() => scrollTo("reservar")}
              >
                Consultar fechas <ArrowRight size={15} />
              </button>
              <button
                type="button"
                className="btn-outline-inv"
                onClick={() => scrollTo("reservar")}
              >
                <MessageCircle size={15} /> Hablar con un asesor
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 8: TESTIMONIALS INFINITE MARQUEE */}
      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container">
          <div className="section-head">
            <h2 className="h-display">
              Lo que escriben{" "}
              <span className="h-muted">después del viaje.</span>
            </h2>
            <p>Experiencias reales de grupos, familias y empresas en Jalisco.</p>
          </div>
        </div>

        <div className="marquee-viewport">
          <motion.div
            className="marquee-track"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 34, ease: "linear", repeat: Infinity }}
          >
            {[...REVIEWS, ...REVIEWS].map((rev, i) => (
              <div key={i} className="review-card">
                <p className="review-quote">“{rev.quote}”</p>
                <div className="review-footer">
                  <div className="review-initials">{rev.initials}</div>
                  <div>
                    <div className="review-name">{rev.name}</div>
                    <div className="review-trip">{rev.trip}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 9: BEFORE YOU ASK — 2-COL FAQ (korvant_8) */}
      <section className="section" id="preguntas">
        <div className="container faq-grid">
          <div className="faq-sticky">
            <h2
              className="h-display"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", marginBottom: 14 }}
            >
              Antes de <span className="h-muted">preguntar.</span>
            </h2>
            <p style={{ color: "var(--fg-muted)", marginBottom: 24, maxWidth: "34ch" }}>
              Respuestas cortas y claras. Para cualquier ruta especial,
              escríbenos directo.
            </p>
            <button
              type="button"
              className="link-underline"
              onClick={() => scrollTo("reservar")}
            >
              Cotizar o escribir a un asesor <ArrowRight size={14} />
            </button>
          </div>

          <div className="faq-list">
            {FAQS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`faq-card ${isOpen ? "open" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-btn"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-plus">
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: EASE }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="faq-body">{item.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 10: RESERVATION FORM */}
      <section className="section" id="reservar" style={{ paddingTop: 24 }}>
        <div className="container reserve-grid">
          <div>
            <h2
              className="h-display"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.6rem)", marginBottom: 16 }}
            >
              Dinos el día.{" "}
              <span className="h-muted">Nosotros llevamos la camioneta.</span>
            </h2>
            <p style={{ color: "var(--fg-muted)", maxWidth: "40ch", marginBottom: 28 }}>
              La fecha y el destino que elegiste arriba ya vienen cargados.
              Respondemos en menos de una hora con tu cotización con chofer
              incluido.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.9rem", color: "var(--fg-subtle)" }}>
              <div>• 100% servicio con chofer profesional</div>
              <div>• Salidas desde Guadalajara, Zapopan y Aeropuerto GDL</div>
              <div>• Facturación CFDI y seguro de viajero incluidos</div>
            </div>
          </div>

          <form className="form-box" onSubmit={handleQuoteSubmit}>
            <div className="form-2col">
              <div className="field">
                <label htmlFor="fName">Nombre</label>
                <input
                  id="fName"
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="fPhone">WhatsApp / Teléfono</label>
                <input
                  id="fPhone"
                  type="tel"
                  required
                  placeholder="33 0000 0000"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="fUnit">Unidad con chofer</label>
                <select
                  id="fUnit"
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                >
                  {FLEET.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name} ({u.capacity})
                    </option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="fDest">Destino</label>
                <select
                  id="fDest"
                  value={selectedDest}
                  onChange={(e) => setSelectedDest(e.target.value)}
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                  <option value="Otro destino (cualquier ciudad de México)">
                    Otro destino (cualquier ciudad de México)
                  </option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="fDate">Fecha de salida</label>
                <input
                  id="fDate"
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="fPickup">Punto de recolección</label>
                <input
                  id="fPickup"
                  type="text"
                  required
                  value={pickupPoint}
                  onChange={(e) => setPickupPoint(e.target.value)}
                />
              </div>
              <div className="field field-full">
                <label htmlFor="fNotes">Detalles del viaje (pasajeros, horarios o factura)</label>
                <textarea
                  id="fNotes"
                  rows={3}
                  placeholder="Ej. Somos 17 personas, salimos a las 9:00 AM y regresamos a las 8:00 PM..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            <div className="form-summary">
              Solicitud: <strong>{selectedUnit}</strong> con{" "}
              <strong>chofer incluido</strong> hacia{" "}
              <strong>{selectedDest}</strong> ({days}{" "}
              {days === 1 ? "día" : "días"} • salida {pickupDate}).
            </div>

            <button
              type="submit"
              className="btn-ivory"
              style={{ width: "100%", height: 50, marginTop: 18 }}
            >
              Solicitar esta fecha <ArrowRight size={16} />
            </button>

            {submittedMsg && (
              <div className="form-toast">
                <strong>¡Solicitud lista para enviar!</strong>
                <div style={{ marginTop: 6, opacity: 0.9 }}>{submittedMsg}</div>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <img
                src={
                  theme === "dark"
                    ? "./images/logo-dark.png"
                    : "./images/logo-light.png"
                }
                alt="SODI de Occidente"
                style={{ height: 38, marginBottom: 16 }}
              />
              <p style={{ fontSize: "0.88rem", color: "var(--fg-muted)", maxWidth: "34ch" }}>
                Tu camioneta con chofer a un mensaje de distancia. Servicios y
                Transportes SODI de Occidente S.A. de C.V.
              </p>
            </div>
            <div className="footer-col">
              <h4>Flotilla</h4>
              <ul>
                <li><a href="#flotilla">Mercedes-Benz Sprinter 19</a></li>
                <li><a href="#flotilla">Toyota Hiace 14</a></li>
                <li><a href="#flotilla">Suburban Ejecutiva VIP</a></li>
                <li><a href="#flotilla">Flotilla para Eventos</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Destinos Jalisco</h4>
              <ul>
                <li><a href="#destinos">Tequila, Jalisco</a></li>
                <li><a href="#destinos">Mazamitla, Jalisco</a></li>
                <li><a href="#destinos">Tapalpa, Jalisco</a></li>
                <li><a href="#destinos">Chapala y Puerto Vallarta</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Empresa</h4>
              <ul>
                <li><a href="#experiencias">Experiencias</a></li>
                <li><a href="#estandar">Estándar SODI</a></li>
                <li><a href="#preguntas">Preguntas frecuentes</a></li>
                <li><a href="#reservar">Cotizar viaje</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Servicios y Transportes SODI de Occidente S.A. de C.V.</span>
            <span style={{ letterSpacing: "0.14em", fontSize: "0.72rem" }}>
              SEGURIDAD • CONFIANZA • PUNTUALIDAD • EXPERIENCIA
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
