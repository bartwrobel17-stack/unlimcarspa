"use client";

import { useState } from "react";
import { answerQuestion, business } from "@/lib/chatbot-data";

type Message = { from: "bot" | "user"; text: string };

const shortcuts = [
  { label: "✨ Dobierz usługę", prompt: "Pomóż mi dobrać usługę" },
  { label: "💰 Ceny usług", prompt: "Ile kosztują usługi?" },
  { label: "🚘 Polerowanie", prompt: "Chcę poprawić wygląd lakieru i zapytać o polerowanie" },
  { label: "🧽 Pranie tapicerki", prompt: "Chcę odświeżyć tapicerkę" },
  { label: "🛡️ Zabezpieczenie lakieru", prompt: "Chcę zabezpieczyć lakier powłoką ceramiczną" },
  { label: "📍 Dojazd", prompt: "Gdzie znajduje się UNLIM CAR SPA?" },
];

const welcome = "Cześć! 👋 Jestem wirtualnym asystentem UNLIM CAR SPA. Pomogę Ci dobrać usługę, znaleźć informacje i przygotować zapytanie o wycenę. Nie zgaduję cen ani wolnych terminów — te potwierdzisz w Booksy lub bezpośrednio w studiu.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ from: "bot", text: welcome }]);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [car, setCar] = useState("");
  const [year, setYear] = useState("");
  const [service, setService] = useState("Polerowanie lakieru");
  const [details, setDetails] = useState("");
  const [copied, setCopied] = useState(false);
  const [quoteReady, setQuoteReady] = useState(false);

  function send(text = draft) {
    const value = text.trim();
    if (!value) return;
    setMessages(old => [...old, { from: "user", text: value }, { from: "bot", text: answerQuestion(value) }]);
    setDraft("");
  }

  function resetChat() {
    setMessages([{ from: "bot", text: welcome }]);
    setDraft("");
    setQuoteOpen(false);
    setCar("");
    setYear("");
    setService("Polerowanie lakieru");
    setDetails("");
    setCopied(false);
    setQuoteReady(false);
  }

  const quoteMessage = [
    "Dzień dobry, proszę o wycenę usługi w UNLIM CAR SPA.",
    "Samochód: " + (car.trim() || "do uzupełnienia"),
    "Rocznik: " + (year.trim() || "do uzupełnienia"),
    "Interesująca usługa: " + service,
    "Opis / oczekiwany efekt: " + (details.trim() || "proszę o kontakt w celu ustalenia szczegółów"),
    "Proszę o informację o orientacyjnej cenie, zakresie prac i dostępnych terminach. Dziękuję!",
  ].join("\n");

  async function prepareQuote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessages(old => [...old,
      { from: "user", text: "Chcę przygotować zapytanie o wycenę." },
      { from: "bot", text: "Gotowe! Przygotowałem wiadomość na podstawie podanych informacji. Skopiuj ją i wyślij do studia przez wybrany kanał kontaktu. To jeszcze nie jest wysłane zapytanie." },
      { from: "bot", text: quoteMessage },
    ]);
    setQuoteOpen(false);
    setCopied(false);
    setQuoteReady(true);
  }

  async function copyQuote() {
    try {
      await navigator.clipboard.writeText(quoteMessage);
      setCopied(true);
    } catch {
      setMessages(old => [...old, { from: "bot", text: "Automatyczne kopiowanie jest niedostępne w tej przeglądarce. Zaznacz przygotowaną wiadomość powyżej i skopiuj ją ręcznie." }]);
    }
  }

  return <>
    <button className="chat-launch" aria-label={open ? "Zamknij czat" : "Otwórz czat"} aria-expanded={open} onClick={() => setOpen(v => !v)}>
      {open ? "× Zamknij" : <><span className="chat-dot" /> Porozmawiaj z nami</>}
    </button>
    {open && <section className="chat-panel" aria-label="Czat UNLIM CAR SPA">
      <header className="chat-head">
        <div>
          <span className="eyebrow"><span className="chat-dot" /> UNLIM CAR SPA</span>
          <h3>Znajdźmy coś dla Twojego auta.</h3>
          <p>Asystent online · dobór usługi i zapytanie o wycenę</p>
        </div>
        <button aria-label="Rozpocznij nową rozmowę" title="Nowa rozmowa" onClick={resetChat}>↻</button>
      </header>
      <div className="chat-messages" aria-live="polite" aria-relevant="additions">
        {messages.map((m, i) => <p key={i} className={m.from === "user" ? "message user-message" : "message"}>{m.text}</p>)}
      </div>
      <div className="chat-shortcut-label">W czym pomóc?</div>
      <div className="quick-questions">
        {shortcuts.map(item => <button key={item.label} onClick={() => send(item.prompt)}>{item.label}</button>)}
        <button className="quote-shortcut" onClick={() => setQuoteOpen(v => !v)}>{quoteOpen ? "× Zamknij formularz" : "📝 Poproś o wycenę"}</button>
      </div>
      {quoteOpen && <form className="quote-form" onSubmit={prepareQuote}>
        <div className="quote-form-title">Przygotuj zapytanie o wycenę</div>
        <p>Podaj tylko to, co wiesz. Nie wysyłamy danych automatycznie.</p>
        <label>Marka i model auta
          <input value={car} onChange={e => setCar(e.target.value)} placeholder="Np. BMW 3, Toyota Corolla" maxLength={100} />
        </label>
        <label>Rocznik
          <input value={year} onChange={e => setYear(e.target.value)} placeholder="Np. 2019" inputMode="numeric" maxLength={4} />
        </label>
        <label>Interesująca usługa
          <select value={service} onChange={e => setService(e.target.value)}>
            <option>Polerowanie lakieru</option>
            <option>Pranie tapicerki</option>
            <option>Pielęgnacja auta</option>
            <option>Powłoka ceramiczna / zabezpieczenie lakieru</option>
            <option>Nie wiem — proszę o doradztwo</option>
            <option>Inna usługa</option>
          </select>
        </label>
        <label>Opis i oczekiwany efekt
          <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Np. lekkie rysy na lakierze, plamy na fotelach, chcę odświeżyć auto…" rows={3} maxLength={600} />
        </label>
        <button className="quote-submit" type="submit">Przygotuj wiadomość ↗</button>
      </form>}
      <form className="chat-form" onSubmit={e => { e.preventDefault(); send(); }}>
        <input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Np. chcę odświeżyć lakier…" aria-label="Wiadomość do asystenta" maxLength={500} />
        <button type="submit" aria-label="Wyślij wiadomość" disabled={!draft.trim()}>↗</button>
      </form>
      <div className="chat-footer-links">
        <a className="chat-booking" href={business.booking} target="_blank" rel="noreferrer">Rezerwuj na Booksy ↗</a>
        <a className="chat-booking" href={business.maps} target="_blank" rel="noreferrer">Dojazd ↗</a>
        <a className="chat-booking" href={`tel:${business.phone.replace(/\s/g, "")}`}>Zadzwoń ↗</a>
        {quoteReady && <button type="button" className="chat-booking chat-copy" onClick={copyQuote}> {copied ? "Skopiowano ✓" : "Kopiuj zapytanie"} </button>}
      </div>
      <p className="chat-disclaimer">Wiadomość nie jest wysyłana automatycznie. Ceny, zakres usług i terminy potwierdza studio.</p>
    </section>}
  </>;
}
