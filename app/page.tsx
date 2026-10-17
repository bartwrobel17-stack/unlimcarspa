"use client";

import { useEffect, useState } from "react";
import ChatWidget from "@/components/ChatWidget";
import { business, services } from "@/lib/chatbot-data";

type Tab = "start" | "uslugi" | "galeria" | "studio" | "kontakt";
const photos = [
  { src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=2400&q=90", alt: "Czerwone sportowe auto w eleganckim świetle" },
  { src: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=2400&q=90", alt: "Ciemny samochód z wyrazistą linią nadwozia" },
  { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=90", alt: "Sportowe auto w dopracowanej kompozycji" },
  { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=90", alt: "Sportowe auto w dopracowanej kompozycji" },
  { src: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=2400&q=90", alt: "Detale wnętrza samochodu premium" },
  { src: "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=2400&q=90", alt: "Starannie wykończone wnętrze auta" },
];
const servicePhotos: Record<string, string> = {
  "Pielęgnacja auta": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1800&q=90",
  "Polerowanie lakieru": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=90",
  "Pranie tapicerki": "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1800&q=90",
  "Powłoka ceramiczna": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=90",
};
const serviceDetails: Record<string, { intro: string; points: string[] }> = {
  "Pielęgnacja auta": { intro: "Dokładna pielęgnacja nadwozia i detali, dobrana do potrzeb samochodu. Dobry wybór, jeśli chcesz zadbać o wygląd auta i regularnie utrzymywać je w świetnej kondycji.", points: ["Staranna pielęgnacja powierzchni", "Dbałość o trudno dostępne detale", "Zakres ustalany do stanu auta"] },
  "Polerowanie lakieru": { intro: "Korekta lakieru pomaga poprawić głębię koloru i połysk oraz ograniczyć widoczność części drobnych rys i śladów mycia. Zakres i możliwy efekt zależą od stanu oraz grubości lakieru.", points: ["Ocena stanu lakieru przed pracą", "Dobór zakresu korekty do powierzchni", "Możliwość polerowania pojedynczego elementu — po potwierdzeniu zakresu"] },
  "Pranie tapicerki": { intro: "Odświeżenie wnętrza z uwzględnieniem rodzaju materiałów i zabrudzeń. Przed pracą warto opisać plamy lub zapachy, aby dobrać odpowiedni zakres.", points: ["Fotele i inne elementy tapicerowane — według ustaleń", "Podejście dopasowane do materiału", "Efekt zależy od rodzaju i wieku zabrudzeń"] },
  "Powłoka ceramiczna": { intro: "Powłoka ceramiczna to sposób na dodatkową ochronę odpowiednio przygotowanego lakieru, łatwiejszą pielęgnację i atrakcyjny połysk. Dostępność i szczegóły potwierdź w studiu.", points: ["Przygotowanie powierzchni przed aplikacją", "Ochrona i właściwości zależne od produktu", "Zalecenia pielęgnacyjne po wykonaniu usługi"] },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("start");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<"all" | "lakier" | "wnetrze" | "blask">("all");
  const [videoFailed, setVideoFailed] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTopButton(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const galleryCategories = ["blask", "lakier", "blask", "blask", "wnetrze", "wnetrze"] as const;
  const visiblePhotos = photos.map((photo, index) => ({ ...photo, index, category: galleryCategories[index] })).filter(photo => galleryFilter === "all" || photo.category === galleryFilter);
  const tabItems: { id: Tab; label: string }[] = [
    { id: "start", label: "Start" }, { id: "uslugi", label: "Usługi" }, { id: "galeria", label: "Galeria" }, { id: "studio", label: "Studio" }, { id: "kontakt", label: "Kontakt" },
  ];
  const go = (tab: Tab) => { setActiveTab(tab); setLightbox(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const bookingFor = (title: string) => business.booking + "?service=" + encodeURIComponent(title);

  return <main className="premium-site">
    <div className="premium-topline"><span>UNLIM CAR SPA <i>·</i> LUBIN</span><a href={"tel:+48" + business.phone.replace(/\s/g, "")}>{business.phone}</a></div>
    <header className="premium-nav">
      <button className="premium-brand" onClick={() => go("start")} aria-label="UNLIM CAR SPA — strona główna"><span className="premium-logo">U<span>.</span></span><span>UNLIM <b>CAR SPA</b><small>CAR CARE STUDIO · LUBIN</small></span></button>
      <nav aria-label="Główna nawigacja">{tabItems.map(item => <button key={item.id} className={activeTab === item.id ? "active" : ""} onClick={() => go(item.id)}>{item.label}</button>)}</nav>
      <a className="premium-book" href={business.booking} target="_blank" rel="noreferrer">Umów wizytę <span>↗</span></a>
    </header>

    {activeTab === "start" && <>
      <section className="premium-hero">
        <video className="hero-video" autoPlay muted loop playsInline preload="auto" poster={photos[3].src} aria-label="Film przedstawiający polerowanie lakieru samochodowego" onCanPlay={() => setVideoFailed(false)} onError={() => setVideoFailed(true)}>
          <source src="https://videos.pexels.com/video-files/6159183/6159183-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        {videoFailed && <div className="premium-video-error" role="status">Film nie załadował się — odśwież stronę, aby spróbować ponownie.</div>}
        <div className="premium-hero-shade" />
        <div className="premium-hero-content"><span className="premium-eyebrow"><i /> DETAILING SAMOCHODOWY · LUBIN</span><h1>Charakter auta.<br /><em>Wydobyty w detalu.</em></h1><p>Polerowanie lakieru, pielęgnacja wnętrza i dbałość o wykończenie. Zobacz, co możemy zrobić dla Twojego samochodu.</p><div className="premium-actions"><button className="premium-primary" onClick={() => go("uslugi")}>Poznaj usługi <span>↗</span></button><button className="premium-secondary" onClick={() => go("galeria")}>Zobacz galerię <span>↗</span></button></div></div>
        <div className="premium-hero-bottom"><span>PRECYZJA W KAŻDYM RUCHU</span><span>01 — 05</span></div>
        <div className="video-credit">Wideo poglądowe · Pexels</div>
      </section>
      <div className="premium-strip"><span>PAINT CORRECTION</span><b>✳</b><span>INTERIOR CARE</span><b>✳</b><span>PROTECT & SHINE</span><b>✳</b><span>UNLIM CAR SPA</span></div>
      <section className="premium-audi-feature"><div className="premium-audi-copy"><span className="premium-eyebrow"><i /> DETALING · PRECYZJA · POŁYSK</span><h2>Niech robi<br/><em>wrażenie.</em></h2><p>Każdy refleks, każda linia nadwozia i każdy detal mają znaczenie. Dobierzemy pielęgnację do charakteru Twojego auta.</p><button className="premium-text-link" onClick={() => go("galeria")}>Zobacz realizacje <span>↗</span></button></div><img src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=85" alt="Sportowe Audi w ciemnej, eleganckiej scenerii" loading="lazy" onError={(event)=>{event.currentTarget.src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85";}}/><span className="premium-audi-caption">SPORT / DESIGN / DETAIL <b>UNLIM CAR SPA</b></span></section>
      <section className="premium-home-intro"><div><span className="premium-eyebrow dark">NASZE PODEJŚCIE</span><h2>Nie na skróty.<br /><em>Z dbałością o detal.</em></h2></div><div><p>Każdy samochód ma inną historię i potrzeby. Dlatego zakres prac dobieramy do stanu lakieru, wnętrza i efektu, na którym Ci zależy.</p><button className="premium-text-link" onClick={() => go("studio")}>Poznaj studio <span>↗</span></button></div></section>
      <section className="premium-feature"><img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=90" alt="Sportowe auto z dopracowanym lakierem" loading="lazy" /><div><span className="premium-eyebrow">01 / PRECYZJA</span><h2>Światło pokazuje<br /><em>każdy szczegół.</em></h2><p>Od poprawy wyglądu lakieru po odświeżenie wnętrza — wybierz usługę i poznaj jej zakres.</p><button className="premium-primary" onClick={() => go("uslugi")}>Przeglądaj usługi <span>↗</span></button></div></section>
    </>}

    {activeTab === "uslugi" && <section className="premium-page-section"><div className="premium-page-heading"><span className="premium-eyebrow dark">OFERTA UNLIM CAR SPA</span><h1>Usługi, które robią<br /><em>różnicę.</em></h1><p>Sprawdź, na czym polegają poszczególne usługi. Kliknij kartę, aby przejść do Booksy i sprawdzić szczegóły rezerwacji.</p></div><div className="premium-services">{services.map((service, index) => { const detail = serviceDetails[service.title] ?? { intro: service.description, points: ["Zakres ustalany indywidualnie", "Dobór do stanu i potrzeb samochodu", "Szczegóły do potwierdzenia w studiu"] }; return <article className="premium-service-card" key={service.id}><a href={bookingFor(service.title)} target="_blank" rel="noreferrer" className="premium-service-photo" aria-label={"Przejdź do Booksy: " + service.title}><img src={servicePhotos[service.title] ?? service.image} alt={service.title} loading="lazy" onError={(event) => { const img = event.currentTarget; if (img.dataset.fallbackApplied) return; img.dataset.fallbackApplied = "true"; img.src = photos[3].src; }} /><span>0{index + 1} <b>↗</b></span></a><div className="premium-service-copy"><span className="premium-eyebrow dark">USŁUGA 0{index + 1}</span><h2>{service.title}</h2><p>{detail.intro}</p><ul>{detail.points.map(point => <li key={point}>{point}</li>)}</ul><a className="premium-service-link" href={bookingFor(service.title)} target="_blank" rel="noreferrer">Sprawdź w Booksy <span>↗</span></a></div></article>; })}</div><p className="premium-disclaimer">Ostateczny zakres i cena zależą od stanu pojazdu oraz ustaleń ze studiem. Dostępność usług potwierdź w Booksy.</p></section>}

    {activeTab === "galeria" && <section className="premium-page-section"><div className="premium-page-heading"><span className="premium-eyebrow dark">DETAL W KADRZE</span><h1>Galeria<br /><em>samochodowych detali.</em></h1><p>Czerń, głębokie refleksy i mocne kolory. To inspiracyjna galeria motoryzacyjna — docelowo najlepiej uzupełnić ją własnymi realizacjami studia.</p></div><div className="premium-gallery-toolbar"><div className="premium-gallery-filters" role="group" aria-label="Filtruj galerię">{([{id:"all",label:"Wszystko"},{id:"lakier",label:"Lakier"},{id:"wnetrze",label:"Wnętrze"},{id:"blask",label:"Połysk"}] as const).map(filter => <button key={filter.id} className={galleryFilter === filter.id ? "active" : ""} onClick={() => setGalleryFilter(filter.id)}>{filter.label}</button>)}</div><span className="premium-gallery-count">{String(visiblePhotos.length).padStart(2,"0")} / 06 KADRÓW</span></div><div className="premium-gallery">{visiblePhotos.map((photo, index) => <button key={photo.src} className={"premium-gallery-item gallery-item-" + index} onClick={() => setLightbox(photo.index)} aria-label={"Powiększ zdjęcie: " + photo.alt}><img src={photo.src} alt={photo.alt} loading="lazy" onError={(event) => { const img = event.currentTarget; if (img.dataset.fallbackApplied) return; img.dataset.fallbackApplied = "true"; img.src = photos[(photo.index + 1) % photos.length].src; }} /><span>0{photo.index + 1} <b>↗</b></span><small>{photo.category === "lakier" ? "KOREKTA LAKIERU" : photo.category === "wnetrze" ? "WNĘTRZE" : "REFLEKSY I POŁYSK"}</small></button>)}</div><div className="premium-gallery-bottom"><span>UNLIM CAR SPA · LUBIN</span><button className="premium-text-link" onClick={() => go("kontakt")}>Pokaż nam swoje auto <span>↗</span></button></div></section>}

    {activeTab === "studio" && <section className="premium-studio-page"><div className="premium-studio-image" style={{ backgroundImage: "url(" + photos[3].src + ")" }} /><div className="premium-studio-copy"><span className="premium-eyebrow">O STUDIO</span><h1>Twoje auto.<br /><em>Nasza uwaga.</em></h1><p>UNLIM CAR SPA w Lubinie to miejsce dla kierowców, którzy chcą zadbać o wygląd swojego samochodu. Stawiamy na staranność, odpowiednio dobrany zakres prac i uczciwą rozmowę o możliwym efekcie.</p><p>Nie każde auto potrzebuje tego samego. Zaczynamy od potrzeb samochodu, a potem dobieramy usługę i zakres do oczekiwań.</p><button className="premium-primary" onClick={() => go("kontakt")}>Skontaktuj się <span>↗</span></button></div></section>}

    {activeTab === "kontakt" && <section className="premium-page-section premium-contact-page"><div className="premium-page-heading"><span className="premium-eyebrow dark">POROZMAWIAJMY</span><h1>Zadbajmy o auto.<br /><em>Zacznijmy tutaj.</em></h1><p>Masz pytanie o polerowanie, pielęgnację lub wnętrze? Zadzwoń albo sprawdź dostępne terminy online.</p></div><div className="premium-contact-grid"><div><span>ADRES</span><h2>{business.address}</h2><a href={business.maps} target="_blank" rel="noreferrer">Wyznacz trasę ↗</a></div><div><span>TELEFON</span><h2>{business.phone}</h2><a href={"tel:+48" + business.phone.replace(/\s/g, "")}>Zadzwoń teraz ↗</a></div><div><span>REZERWACJA</span><h2>Umów dogodny termin</h2><a href={business.booking} target="_blank" rel="noreferrer">Otwórz Booksy ↗</a></div><div className="premium-map"><iframe title="Mapa dojazdu do UNLIM CAR SPA" src="https://maps.google.com/maps?q=Boczna%208%2C%20Lubin&t=&z=14&ie=UTF8&iwloc=&output=embed" loading="lazy" /></div></div></section>}

    <footer className="premium-footer"><button className="premium-brand" onClick={() => go("start")}><span className="premium-logo">U<span>.</span></span><span>UNLIM <b>CAR SPA</b><small>CAR CARE STUDIO · LUBIN</small></span></button><span>Staranność, którą widać.</span><span>© {new Date().getFullYear()} UNLIM CAR SPA</span><a href="/panel-wlasciciela">Panel właściciela ↗</a><a href={business.booking} target="_blank" rel="noreferrer">Booksy ↗</a></footer>
    {lightbox !== null && <div className="premium-lightbox" role="dialog" aria-modal="true" aria-label="Powiększone zdjęcie" onClick={() => setLightbox(null)}><button className="premium-lightbox-close" onClick={() => setLightbox(null)} aria-label="Zamknij">×</button><button className="premium-lightbox-prev" onClick={e => { e.stopPropagation(); setLightbox((lightbox + photos.length - 1) % photos.length); }} aria-label="Poprzednie zdjęcie">←</button><img src={photos[lightbox].src} alt={photos[lightbox].alt} onClick={e => e.stopPropagation()} /><button className="premium-lightbox-next" onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }} aria-label="Następne zdjęcie">→</button><span>{lightbox + 1} / {photos.length}</span></div>}
    {showTopButton && <button className="premium-back-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Wróć na górę strony"><span>↑</span><small>NA GÓRĘ</small></button>}
    <ChatWidget />
  </main>;
}
