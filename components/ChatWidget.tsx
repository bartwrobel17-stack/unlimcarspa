"use client";
import { useState } from "react";
import { answerQuestion, business, faqs } from "@/lib/chatbot-data";

type Message = { from: "bot" | "user"; text: string };
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ from: "bot", text: "Cześć! Jestem wirtualnym asystentem UNLIM CAR SPA. W czym mogę pomóc?" }]);
  function send(text = draft) {
    const value = text.trim();
    if (!value) return;
    setMessages(old => [...old, { from: "user", text: value }, { from: "bot", text: answerQuestion(value) }]);
    setDraft("");
  }
  return <>
    <button className="chat-launch" aria-label={open ? "Zamknij czat" : "Otwórz czat"} onClick={() => setOpen(v => !v)}>{open ? "×" : <><span className="chat-dot" /> Porozmawiaj z nami</>}</button>
    {open && <section className="chat-panel" aria-label="Czat UNLIM CAR SPA">
      <header className="chat-head"><div><span className="eyebrow">UNLIM CAR SPA</span><h3>W czym pomożemy?</h3><p>Asystent informacyjny · odpowiedzi automatyczne</p></div><button aria-label="Zamknij czat" onClick={() => setOpen(false)}>×</button></header>
      <div className="chat-messages" aria-live="polite">{messages.map((m, i) => <p key={i} className={m.from === "user" ? "message user-message" : "message"}>{m.text}</p>)}</div>
      <div className="quick-questions">{faqs.filter(f => ["Jak umówić wizytę?","Gdzie znajduje się UNLIM CAR SPA?","Ile kosztują usługi?"].includes(f.q)).map(f => <button key={f.q} onClick={() => send(f.q)}>{f.q}</button>)}</div>
      <form className="chat-form" onSubmit={e => { e.preventDefault(); send(); }}><input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Napisz wiadomość…" aria-label="Wiadomość do asystenta" /><button type="submit" aria-label="Wyślij wiadomość">↗</button></form>
      <a className="chat-booking" href={business.booking} target="_blank" rel="noreferrer">Rezerwacja online na Booksy ↗</a>
    </section>}
  </>;
}
