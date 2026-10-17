# UNLIM CAR SPA

Premiumowa, responsywna strona wizytówkowa dla studia pielęgnacji samochodów w Lubinie. Zbudowana w Next.js, React i TypeScript, gotowa do uruchomienia na Vercel.

## Stack
- Next.js App Router + React + TypeScript
- Global CSS, bez dodatkowych bibliotek UI
- Chatbot informacyjny oparty na regułach, bez płatnego API
- SEO metadata, robots i sitemap

## Uruchomienie lokalne
Wymagany Node.js 20 lub nowszy. Ustaw `NEXT_PUBLIC_SITE_URL` na docelowy adres strony (np. domenę produkcyjną), aby wygenerować poprawne canonical, sitemap i adres sitemap w robots.txt. Nie ustawiaj tu adresu Booksy.

```bash
npm install
npm run dev
```

Otwórz http://localhost:3000. Build produkcyjny: `npm run build`, a następnie `npm start`.

## Panel właściciela i zdjęcia
Kliknij „Panel właściciela” w stopce lub „Zarządzaj galerią” w sekcji realizacji. Możesz dodawać wiele zdjęć, usuwać je i zmieniać ich kolejność. Panel pozwala też edytować nazwy, opisy i adresy zdjęć usług oraz dodawać i usuwać pozycje oferty. Pliki są ograniczone do 2,5 MB i przechowywane jako data URL w localStorage przeglądarki.

**Ograniczenie wersji demo:** galeria jest zapisywana tylko w bieżącej przeglądarce i urządzeniu. Nie publikuje zmian globalnie, nie ma uwierzytelniania ani trwałego magazynu plików. Nie przechowuj tu danych wrażliwych. Przed publicznym użyciem panel należy zabezpieczyć.

## Oferta i dane firmy
Dane kontaktowe, Booksy, usługi i odpowiedzi chatbota znajdują się w `lib/chatbot-data.ts`. Ceny i godziny otwarcia nie są zgadywane. Zdjęcia usług i część galerii są zdjęciami poglądowymi ze źródła Unsplash; należy je zastąpić własnymi zdjęciami firmy przed publikacją.

## Chatbot
Komponent `components/ChatWidget.tsx` korzysta z reguł i FAQ z `lib/chatbot-data.ts`. Nie używa płatnego modelu AI, nie wysyła wiadomości do zewnętrznej usługi i trzyma historię wyłącznie w stanie bieżącej sesji. Odpowiedzi są ograniczone do skonfigurowanych tematów, więc nie zastępują kontaktu z firmą. Edytuj listę `faqs` oraz funkcję `answerQuestion`, aby zmienić odpowiedzi.

## Migracja do Supabase
1. Utwórz tabele na ustawienia firmy, pozycje oferty, galerię i FAQ.
2. Użyj Supabase Storage do przechowywania plików zamiast data URL w localStorage.
3. Wydziel interfejs repozytorium danych (odczyt/zapis galerii i FAQ) i zastąp implementację lokalną klientem Supabase.
4. Włącz Row Level Security, polityki dostępu oraz uwierzytelnianie właściciela. Nigdy nie umieszczaj klucza service-role w kodzie przeglądarki.
5. Rozdziel publiczny odczyt danych od operacji administracyjnych i dodaj walidację uploadów po stronie serwera.

## Vercel
Zaimportuj repozytorium GitHub do Vercel, pozostaw wykrywanie Next.js i uruchom deployment. Przed produkcją ustaw prawdziwą domenę, zaktualizuj canonical/metadataBase, robots i sitemap. W tej wersji nie ma backendu, logowania do panelu ani współdzielonego CMS.
