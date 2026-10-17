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
  { id: "01", title: "Pielęgnacja auta", description: "Dokładna pielęgnacja samochodu z dbałością o detale.", image: "https://images.unsplash.com/photo-1607860108855-64acet0a6d8a?auto=format&fit=crop&w=3840&q=95" },
  { id: "02", title: "Polerowanie lakieru", description: "Przywróć lakierowi głębię i zadbany wygląd.", image: "https://images.unsplash.com/photo-1607860108855-64acet0a6d8a?auto=format&fit=crop&w=3840&q=95" },
  { id: "03", title: "Pranie tapicerki", description: "Odświeżenie wnętrza i troska o komfort podróży.", image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=3840&q=95" },
  { id: "04", title: "Powłoka ceramiczna", description: "Zapytaj o dostępność i dobór zabezpieczenia do stanu lakieru.", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=3840&q=95" },
];

export const faqs = [
  { q: "Jak umówić wizytę?", a: "Najprościej zarezerwować termin przez Booksy — przycisk znajduje się poniżej. Możesz też zadzwonić pod 574 084 272. Przed potwierdzeniem sprawdź w Booksy wybraną usługę i dostępny termin.", keys: ["rezerw", "umow", "termin", "booksy", "wizyta", "zapis", "zarezer"] },
  { q: "Gdzie znajduje się UNLIM CAR SPA?", a: "Znajdziesz nas przy ul. Bocznej 8, 59-300 Lubin. Użyj przycisku „Dojazd”, aby otworzyć trasę w mapach.", keys: ["adres", "gdzie", "dojazd", "map", "lokaliz", "trafic"] },
  { q: "Jak się skontaktować?", a: "Możesz zadzwonić pod 574 084 272 lub przejść do rezerwacji online na Booksy.", keys: ["kontakt", "telefon", "dzwonic", "numer", "zadzwon", "mail", "email"] },
  { q: "Ile kosztują usługi?", a: "Nie mam zweryfikowanego, aktualnego cennika w swojej bazie, więc nie chcę zgadywać. Sprawdź ceny i szczegóły usług na Booksy albo zadzwoń pod 574 084 272. Przy indywidualnej wycenie przyda się informacja o aucie i oczekiwanym efekcie.", keys: ["cena", "cennik", "koszt", "ile koszt", "ile zaplace", "zl", "wycen", "taniej", "drogo"] },
  { q: "Jakie są godziny otwarcia?", a: "Nie mam potwierdzonych godzin otwarcia. Najbezpieczniej sprawdzić dostępne terminy na Booksy lub potwierdzić je telefonicznie pod 574 084 272.", keys: ["godzin", "otwarte", "zamkniete", "czynne", "otwier", "pracujecie"] },
  { q: "Jakie usługi są dostępne?", a: "W podstawowej informacji o ofercie mam pielęgnację auta, polerowanie lakieru i pranie tapicerki. Możesz też zapytać o powłokę ceramiczną — jej dostępność i zakres warto potwierdzić bezpośrednio w studiu.", keys: ["uslug", "ofert", "poler", "tapicer", "ceram", "myj", "detailing", "lakier", "wnetrz", "srodek auta"] },
  { q: "Jak przygotować auto?", a: "To zależy od wybranej usługi. Przy rezerwacji sprawdź wskazówki w Booksy, a jeśli nie masz pewności, zadzwoń przed wizytą. Nie musisz zgadywać — studio potwierdzi, co będzie potrzebne dla konkretnej usługi.", keys: ["przygot", "przed wizyt", "przed przyjazd", "co zabrac", "jak oddac"] },
  { q: "Czy możecie wycenić moje auto?", a: "Jasne — mogę pomóc przygotować zapytanie. Podaj markę i model, rocznik, interesującą Cię usługę oraz krótko opisz stan auta i oczekiwany efekt. Ostateczną cenę musi potwierdzić studio.", keys: ["moje auto", "wycena", "wycenic", "marka", "model", "rocznik", "indywidualn"] },
];

const normalize = (value: string) =>
  value.toLocaleLowerCase("pl").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ł/g, "l");

export function answerQuestion(input: string): string {
  const text = normalize(input).replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();

  if (/^(czesc|hej|witam|dzien dobry|dobry wieczor|siema)$/.test(text)) {
    return "Cześć! 👋 Pomogę Ci znaleźć odpowiednią usługę, sprawdzić informacje o studiu albo przejść do rezerwacji. Co planujesz zrobić z autem?";
  }
  if (/(dobierz|jaka uslug|co polecasz|potrzebuje pomocy|nie wiem co)/.test(text)) {
    return "Jasne, dobierzmy usługę. ✨\n• Chcesz poprawić wygląd lakieru? Zapytaj o polerowanie.\n• Chcesz odświeżyć fotele lub wnętrze? Wybierz pranie tapicerki.\n• Szukasz regularnej pielęgnacji? Zapytaj o pielęgnację auta.\n• Interesuje Cię ochrona lakieru? Potwierdź dostępność powłoki ceramicznej.\n\nNapisz, na czym najbardziej Ci zależy — nie będę zgadywać ceny ani efektu bez szczegółów.";
  }
  if (/(poler|rysy|rysach|zarys|swirl|matowy lakier|odswiez.*lakier)/.test(text)) {
    return "Jeśli zależy Ci na poprawie wyglądu lakieru, warto zapytać o polerowanie. Zakres zależy od stanu lakieru i oczekiwanego efektu, dlatego nie obiecam konkretnego rezultatu bez oględzin. Przygotuj markę, model i krótki opis problemu, a studio pomoże dobrać zakres prac.";
  }
  if (/(tapicer|fotel|siedzen|plam|zapach|wnetrz|dywanik)/.test(text)) {
    return "W takim przypadku warto zapytać o pranie tapicerki. Opisz, czy chodzi o fotele, kanapę, dywaniki czy całe wnętrze oraz czy są konkretne plamy. Możliwość usunięcia plam zależy od materiału i ich rodzaju — najlepiej potwierdzić zakres ze studiem.";
  }
  if (/(ceram|zabezpiecz|ochron.*lakier|powłok|powlok|hydrofob)/.test(text)) {
    return "Możesz zapytać studio o powłokę ceramiczną i inne dostępne opcje zabezpieczenia lakieru. Dobór zależy m.in. od stanu lakieru, przygotowania powierzchni i oczekiwanej pielęgnacji. Potwierdź aktualną dostępność, trwałość i cenę bezpośrednio z UNLIM CAR SPA.";
  }
  if (/(mycie|umy[cć]|brudny|regularn.*piel|pielegnac)/.test(text)) {
    return "Mogę wskazać pielęgnację auta jako punkt wyjścia. Dokładny zakres usługi może się różnić, więc sprawdź szczegóły w Booksy albo zapytaj studio, jaki wariant będzie odpowiedni dla Twojego auta.";
  }
  const match = faqs.find(f => f.keys.some(k => text.includes(normalize(k))));
  if (match) return match.a;
  if (/(uslug|ofert|poler|tapicer|ceram|myj|detailing|lakier)/.test(text)) {
    return "Mogę pomóc z pielęgnacją auta, polerowaniem lakieru, praniem tapicerki lub pytaniem o powłokę ceramiczną. Napisz, jaki efekt chcesz osiągnąć — albo wybierz jedną z podpowiedzi poniżej.";
  }
  return "Nie mam pewnej odpowiedzi na to pytanie i nie chcę wprowadzić Cię w błąd. Mogę pomóc z doborem usługi, rezerwacją, lokalizacją, kontaktem lub orientacją w cenach. W sprawie szczegółów zadzwoń pod 574 084 272 albo sprawdź Booksy.";
}
