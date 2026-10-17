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

const welcome = "Cześć! 👋 Jestem wirtualnym asystentem UNLIM CAR SPA. Pomogę Ci dobrać usługę, znaleźć informacje i przejść do rezerwacji. Nie zgaduję cen ani wolnych terminów — te potwierdzisz w Booksy lub bezpośrednio w studiu.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ from: "bot", text: welcome }]);

  function send(text = draft) {
    const value = text.trim();
    if (!value) return;
    setMessages(old => [...old, { from: "user", text: value }, { from: "bot", text: answerQuestion(value) }]);
    setDraft("");
  }

  function resetChat() {
    setMessages([{ from: "bot", text: welcome }]);
    setDraft("");
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
          <p>Asystent online · szybkie wskazówki i rezerwacje</p>
        </div>
        <button aria-label="Rozpocznij nową rozmowę" title="Nowa rozmowa" onClick={resetChat}>↻</button>
      </header>
      <div className="chat-messages" aria-live="polite" aria-relevant="additions">
        {messages.map((m, i) => <p key={i} className={m.from === "user" ? "message user-message" : "message"}>{m.text}</p>)}
      </div>
      <div className="chat-shortcut-label">W czym pomóc?</div>
      <div className="quick-questions">
        {shortcuts.map(item => <button key={item.label} onClick={() => send(item.prompt)}>{item.label}</button>)}
      </div>
      <form className="chat-form" onSubmit={e => { e.preventDefault(); send(); }}>
        <input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Np. chcę odświeżyć lakier…" aria-label="Wiadomość do asystenta" maxLength={500} />
        <button type="submit" aria-label="Wyślij wiadomość" disabled={!draft.trim()}>↗</button>
      </form>
      <div className="chat-footer-links">
        <a className="chat-booking" href={business.booking} target="_blank" rel="noreferrer">Rezerwuj na Booksy ↗</a>
        <a className="chat-booking" href={business.maps} target="_blank" rel="noreferrer">Dojazd ↗</a>
        <a className="chat-booking" href={`tel:${business.phone.replace(/\s/g, "")}`}>Zadzwoń ↗</a>
      </div>
      <p className="chat-disclaimer">Odpowiedzi automatyczne na podstawie dostępnych informacji. Ceny, zakres usług i terminy potwierdza studio.</p>
    </section>}
  </>;
}
