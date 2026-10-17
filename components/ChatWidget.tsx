"use client";

import { useState, type FormEvent } from "react";
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
  const [carSize, setCarSize] = useState("Małe / sedan / kombi");
  const [year, setYear] = useState("");
  const [service, setService] = useState("Polerowanie lakieru");
  const [details, setDetails] = useState("");

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
    setCarSize("Małe / sedan / kombi");
    setYear("");
    setService("Polerowanie lakieru");
    setDetails("");
  }

  function estimateQuote() {
    const normalizedDetails = details.toLocaleLowerCase("pl");
    const isLeather = /skor|skór/.test(normalizedDetails);
    let estimate: string;
    let note: string;

    if (service === "Pielęgnacja auta") {
      const prices: Record<string, number> = {
        "Małe / sedan / kombi": 140,
        "SUV / crossover": 150,
        "Bus / duży samochód": 170,
      };
      estimate = `${prices[carSize]} zł`;
      note = "Orientacyjna cena za pakiet „Komplet” (mycie zewnętrzne + czyszczenie wnętrza), według aktualnej oferty Booksy.";
    } else if (service === "Pranie tapicerki") {
      estimate = isLeather ? "od 500 zł" : "od 100 zł";
      note = isLeather
        ? "Booksy podaje czyszczenie tapicerki skórzanej od 500 zł. Ostateczna cena zależy od wielkości auta i zakresu."
        : "Booksy podaje pranie tapicerki materiałowej od 100 zł; to cena początkowa, a nie gwarantowana cena za całe auto.";
    } else if (service === "Polerowanie lakieru") {
      if (/jeden element|pojedyncz|maska|zderzak|drzwi|błotnik|blotnik/i.test(normalizedDetails)) {
        estimate = "od 100 zł za jeden element";
        note = "W cenniku Booksy polerowanie jednego elementu karoserii zaczyna się od 100 zł. Jeśli chodzi o więcej elementów, cena będzie inna.";
      } else if (carSize === "SUV / crossover") {
        estimate = "od 1 200 zł";
        note = "W cenniku Booksy jednoetapowa korekta lakieru dla crossovera/SUV kosztuje od 1 200 zł. Stan lakieru i zakres prac mogą zmienić wycenę.";
      } else if (carSize === "Bus / duży samochód") {
        estimate = "wymaga indywidualnej wyceny";
        note = "Nie widzę potwierdzonej ceny korekty dla busa/dużego auta w cenniku Booksy, więc nie będę jej zgadywać.";
      } else {
        estimate = "od 1 000 zł";
        note = "W cenniku Booksy jednoetapowa korekta lakieru dla samochodu osobowego kosztuje od 1 000 zł. Stan lakieru i zakres prac mogą zmienić wycenę.";
      }
    } else if (service === "Powłoka ceramiczna / zabezpieczenie lakieru") {
      estimate = "od 2 249 zł";
      note = "Aktualna oferta Booksy podaje powłokę ceramiczną na lakier od 2 249 zł. Cena i zakres wymagają potwierdzenia w studiu.";
    } else {
      estimate = "potrzebne doprecyzowanie";
      note = "Wybierz konkretną usługę, a pokażę dostępną orientacyjną cenę. Przy niestandardowej usłudze cenę potwierdzi studio.";
    }

    const result = [
      `Wstępna wycena: ${estimate}`,
      note,
      "To szacunek informacyjny, nie wiążąca oferta. Aktualny zakres i cenę potwierdź w studiu.",
    ].filter(Boolean).join("\n");

    return result;
  }

  function prepareQuote(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const estimate = estimateQuote();
    setMessages(old => [...old,
      { from: "user", text: `Proszę o wycenę: ${service}.` },
      { from: "bot", text: estimate },
    ]);
    setQuoteOpen(false);
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
        <div className="quote-form-title">Sprawdź orientacyjną cenę</div>
        <p>Podaj tylko to, co wiesz. Nie wysyłamy danych automatycznie.</p>
        <label>Marka i model auta
          <input value={car} onChange={e => setCar(e.target.value)} placeholder="Np. BMW 3, Toyota Corolla" maxLength={100} />
        </label>
        <label>Wielkość samochodu
          <select value={carSize} onChange={e => setCarSize(e.target.value)}>
            <option>Małe / sedan / kombi</option>
            <option>SUV / crossover</option>
            <option>Bus / duży samochód</option>
          </select>
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
        <button className="quote-submit" type="submit">Wylicz orientacyjną cenę ↗</button>
      </form>}
      <form className="chat-form" onSubmit={e => { e.preventDefault(); send(); }}>
        <input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Np. chcę odświeżyć lakier…" aria-label="Wiadomość do asystenta" maxLength={500} />
        <button type="submit" aria-label="Wyślij wiadomość" disabled={!draft.trim()}>↗</button>
      </form>
      <div className="chat-footer-links">
        <a className="chat-booking" href={business.booking} target="_blank" rel="noreferrer">Rezerwuj na Booksy ↗</a>
        <a className="chat-booking" href={business.maps} target="_blank" rel="noreferrer">Dojazd ↗</a>
        <a className="chat-booking" href={`tel:${business.phone.replace(/\s/g, "")}`}>Zadzwoń ↗</a>

      </div>
      <p className="chat-disclaimer">Wycena jest orientacyjna i nie stanowi oferty. Ostateczną cenę oraz zakres prac potwierdza studio.</p>
    </section>}
  </>;
}
