export const business = {
  name: "UNLIM CAR SPA",
  address: "Boczna 8, 59-300 Lubin",
  phone: "574 084 272",
  booking: "https://unlimcarspa.booksy.com",
  maps: "https://www.google.com/maps/dir/?api=1&destination=Boczna+8%2C+59-300+Lubin",
  rating: "5,0",
  reviewCount: 36,
};
export const services = [
  { id: "01", title: "Pielęgnacja auta", description: "Dokładna pielęgnacja samochodu z dbałością o detale.", image: "https://images.unsplash.com/photo-1607860108855-64acet0a6d8a?auto=format&fit=crop&w=1200&q=85" },
  { id: "02", title: "Polerowanie lakieru", description: "Przywróć lakierowi głębię i zadbany wygląd.", image: "https://images.unsplash.com/photo-1632823471565-1ecdf5c7c5e8?auto=format&fit=crop&w=1200&q=85" },
  { id: "03", title: "Pranie tapicerki", description: "Odświeżenie wnętrza i troska o komfort podróży.", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=85" },
  { id: "04", title: "Powłoka ceramiczna", description: "W opiniach klienci wspominają o aplikacji powłoki ceramicznej. Szczegóły ustalisz bezpośrednio z nami.", image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1200&q=85" },
];
export const faqs = [
  { q: "Jak umówić wizytę?", a: "Rezerwację online znajdziesz na Booksy. Możesz też zadzwonić pod numer 574 084 272.", keys: ["rezerw", "umów", "termin", "booksy", "wizyta"] },
  { q: "Gdzie znajduje się UNLIM CAR SPA?", a: "Jesteśmy przy ul. Bocznej 8, 59-300 Lubin.", keys: ["adres", "gdzie", "dojazd", "map", "lokaliz"] },
  { q: "Jak się skontaktować?", a: "Zadzwoń pod numer 574 084 272 lub skorzystaj z rezerwacji online na Booksy.", keys: ["kontakt", "telefon", "dzwonić", "numer"] },
  { q: "Ile kosztują usługi?", a: "Nie mam potwierdzonego cennika. Cena zależy od wybranej usługi i zakresu prac. Najlepiej skontaktować się z firmą lub sprawdzić Booksy.", keys: ["cena", "cennik", "koszt", "ile", "zł"] },
  { q: "Jakie są godziny otwarcia?", a: "Nie mam potwierdzonych stałych godzin otwarcia. Aktualne terminy sprawdzisz w Booksy lub telefonicznie.", keys: ["godzin", "otwarte", "zamknięte", "czynne"] },
];
export function answerQuestion(input: string): string {
  const text = input.toLocaleLowerCase("pl").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const match = faqs.find(f => f.keys.some(k => text.includes(k.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))));
  if (match) return match.a;
  if (/(uslug|ofert|poler|tapicer|ceram|myj|detailing)/.test(text)) return "W ofercie znajdują się m.in. pielęgnacja auta, polerowanie lakieru i pranie tapicerki. Szczegóły oraz dostępność usług potwierdzisz telefonicznie lub na Booksy.";
  return "Nie mam potwierdzonej informacji na ten temat. Możesz zadzwonić pod 574 084 272 albo sprawdzić rezerwację online na Booksy.";
}
