"use client";
import { useEffect, useState } from "react";

type Photo = { id: number; title: string; url: string; category: string };
type Service = { id: string; title: string; price: string; active: boolean; image: string };
type Data = { photos: Photo[]; services: Service[]; tasks: { id: number; text: string; done: boolean }[]; phone: string; booking: string; instagram: string };
const defaults: Data = {
  photos: [
    { id: 1, title: "Lakier w świetle", url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=85", category: "Lakier" },
    { id: 2, title: "Ciemne wykończenie", url: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=85", category: "Połysk" },
    { id: 3, title: "Sportowa sylwetka", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85", category: "Realizacje" }
  ],
  services: [
    { id: "01", title: "Pielęgnacja auta", price: "", active: true, image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=85" },
    { id: "02", title: "Polerowanie lakieru", price: "", active: true, image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85" },
    { id: "03", title: "Pranie tapicerki", price: "", active: true, image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1200&q=85" },
    { id: "04", title: "Powłoka ceramiczna", price: "", active: true, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85" }
  ],
  tasks: [
    { id: 1, text: "Dodać własne zdjęcia realizacji", done: false },
    { id: 2, text: "Sprawdzić linki do Booksy", done: false },
    { id: 3, text: "Uzupełnić potwierdzony cennik", done: false },
    { id: 4, text: "Uzyskać zgodę klientów na publikację zdjęć", done: false }
  ],
  phone: "574 084 272", booking: "https://unlimcarspa.booksy.com", instagram: ""
};

export default function OwnerPanel() {
  const [tab, setTab] = useState("Przegląd");
  const [data, setData] = useState<Data>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("Realizacje");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try { const raw = localStorage.getItem("unlim-owner-panel-v1"); if (raw) setData({ ...defaults, ...JSON.parse(raw) }); } catch {}
    setLoaded(true);
  }, []);
  const patch = (next: Partial<Data>) => setData(current => ({ ...current, ...next }));
  const save = () => { try { localStorage.setItem("unlim-owner-panel-v1", JSON.stringify(data)); setSaved(true); setNotice("Zapisano dane w tej przeglądarce."); window.setTimeout(() => setSaved(false), 2000); } catch { setNotice("Nie udało się zapisać danych."); } };
  const exportData = () => { const a = document.createElement("a"); const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }); a.href = URL.createObjectURL(blob); a.download = "unlim-car-spa-panel.json"; a.click(); URL.revokeObjectURL(a.href); };
  const nav = ["Przegląd", "Galeria", "Usługi", "Lista zadań", "Ustawienia"];
  return <main className="owner-shell">
    <aside className="owner-sidebar"><a className="owner-brand" href="/"><span>U<span>.</span></span><div>UNLIM <b>CAR SPA</b><small>OWNER WORKSPACE</small></div></a><p className="owner-side-label">ZARZĄDZANIE</p><nav>{nav.map((item, i) => <button key={item} className={tab === item ? "active" : ""} onClick={() => { setTab(item); setNotice("Otworzono sekcję: " + item); }}><span>{["◫","▧","✳","☑","⚙"][i]}</span>{item}</button>)}</nav><div className="owner-sidebar-bottom">● PANEL ROBOCZY<small>UNLIM · LUBIN</small><a href="/">↖ Wróć na stronę</a></div></aside>
    <section className="owner-main"><header className="owner-header"><div><span className="owner-eyebrow">CENTRUM DOWODZENIA / UNLIM</span><h1>{tab}</h1></div><button className="owner-save" onClick={save}>{saved ? "✓ Zapisano" : "Zapisz zmiany"}</button></header>
    <div className="owner-local-notice"><b>Tryb roboczy</b><span>Dane zapisują się tylko w tej przeglądarce i nie publikują się automatycznie na stronie. Do bezpiecznego logowania i współdzielenia zmian potrzebna jest baza danych.</span></div>
    {notice && <p className="owner-toast">{notice}</p>}
    {tab === "Przegląd" && <div className="owner-content"><div className="owner-welcome"><span className="owner-eyebrow">OWNER DESK · LUBIN</span><h2>Dobry detal.<br/><em>Dobra organizacja.</em></h2><p>Panel do pilnowania wizerunku, oferty i najważniejszych zadań studia.</p></div><div className="owner-stat-grid"><article><span>POZYCJE W GALERII</span><strong>{data.photos.length.toString().padStart(2,"0")}</strong></article><article><span>AKTYWNE USŁUGI</span><strong>{data.services.filter(s=>s.active).length.toString().padStart(2,"0")}</strong></article><article><span>OTWARTE ZADANIA</span><strong>{data.tasks.filter(t=>!t.done).length.toString().padStart(2,"0")}</strong></article></div><div className="owner-shortcuts"><button onClick={()=>{setTab("Galeria");setNotice("Galeria gotowa — dodaj zdjęcie i zapisz zmiany.");}}>＋ Dodaj zdjęcia ↗</button><button onClick={()=>{setTab("Usługi");setNotice("Możesz edytować ofertę i podgląd zdjęć usług.");}}>✳ Edytuj usługi ↗</button><button onClick={()=>{setTab("Ustawienia");setNotice("Edytuj dane kontaktowe, a następnie zapisz zmiany.");}}>⚙ Dane kontaktowe ↗</button><a href={data.booking} target="_blank" rel="noreferrer">Otwórz Booksy ↗</a></div></div>}
    {tab === "Galeria" && <div className="owner-content"><div className="owner-section-intro"><span className="owner-eyebrow">KADRY, KTÓRE BUDUJĄ ZAUFANIE</span><h2>Galeria<span>.</span></h2><p>Dodaj adres zdjęcia i przypisz kategorię. Najlepiej używać własnych fotografii z realizacji.</p></div><div className="owner-add-photo"><label>Tytuł<input value={title} onChange={e=>setTitle(e.target.value)} placeholder="np. Korekta lakieru"/></label><label>Adres zdjęcia<input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://..."/></label><label>Kategoria<select value={category} onChange={e=>setCategory(e.target.value)}><option>Realizacje</option><option>Lakier</option><option>Wnętrze</option><option>Połysk</option></select></label><button className="owner-save" onClick={()=>{if(!/^https?:\/\//i.test(url)){setNotice("Podaj poprawny adres zdjęcia.");return;}patch({photos:[...data.photos,{id:Date.now(),title:title||"Nowa realizacja",url,category}]});setTitle("");setUrl("");setNotice("Dodano zdjęcie ✓ Możesz dodać kolejne lub zapisać zmiany.");}}>＋ Dodaj zdjęcie</button></div><div className="owner-photo-grid">{data.photos.map(p=><article key={p.id}><img src={p.url} alt={p.title}/><div><span>{p.category}</span><h3>{p.title}</h3><button onClick={()=>{if(window.confirm("Usunąć zdjęcie „"+p.title+"” z roboczej galerii?")){patch({photos:data.photos.filter(x=>x.id!==p.id)});setNotice("Zdjęcie usunięte z galerii roboczej. Zapisz zmiany, aby zachować efekt.");}}}>Usuń ×</button></div></article>)}</div></div>}
    {tab === "Usługi" && <div className="owner-content"><div className="owner-section-intro"><span className="owner-eyebrow">OFERTA I WYCENA</span><h2>Usługi<span>.</span></h2><p>Ceny zostaw puste, jeśli wymagają indywidualnej wyceny. Zmiany są robocze i nie modyfikują publicznej oferty.</p></div><div className="owner-service-list">{data.services.map(s=><article key={s.id}><span>{s.id}</span><label>Nazwa<input value={s.title} onChange={e=>patch({services:data.services.map(x=>x.id===s.id?{...x,title:e.target.value}:x)})}/></label><label>Cena / od<input value={s.price} onChange={e=>patch({services:data.services.map(x=>x.id===s.id?{...x,price:e.target.value}:x)})} placeholder="wycena indywidualna"/></label><label className="owner-toggle"><input type="checkbox" checked={s.active} onChange={e=>patch({services:data.services.map(x=>x.id===s.id?{...x,active:e.target.checked}:x)})}/>{s.active?"Aktywna":"Ukryta"}</label><div className="owner-service-image-editor"><label>Adres URL zdjęcia<input value={s.image ?? ""} onChange={e=>patch({services:data.services.map(x=>x.id===s.id?{...x,image:e.target.value}:x)})} placeholder="https://..."/></label>{s.image && <img src={s.image} alt={"Podgląd zdjęcia usługi "+s.title}/>}<label className="owner-upload-label">Wybierz zdjęcie z telefonu lub komputera<input type="file" accept="image/*" onChange={e=>{const file=e.target.files?.[0];if(!file)return;if(file.size>1500000){setNotice("Zdjęcie jest za duże. Wybierz plik do 1,5 MB lub użyj adresu URL.");e.currentTarget.value="";return;}const reader=new FileReader();reader.onload=()=>{const image=String(reader.result||"");patch({services:data.services.map(x=>x.id===s.id?{...x,image}:x)});setNotice("Zdjęcie dodane do usługi. Kliknij „Zapisz zmiany”.");};reader.onerror=()=>setNotice("Nie udało się odczytać pliku. Spróbuj ponownie.");reader.readAsDataURL(file);}}/></label></div></article>)}</div></div>}
    {tab === "Lista zadań" && <div className="owner-content"><div className="owner-section-intro"><span className="owner-eyebrow">PLAN UTRZYMANIA STRONY</span><h2>Lista zadań<span>.</span></h2></div><div className="owner-add-task"><input id="new-owner-task" placeholder="Dodaj nowe zadanie…"/><button className="owner-save" onClick={()=>{const el=document.getElementById("new-owner-task") as HTMLInputElement|null;if(el?.value.trim()){patch({tasks:[...data.tasks,{id:Date.now(),text:el.value.trim(),done:false}]});el.value="";}}}>＋ Dodaj</button></div>{data.tasks.map(t=><div className="owner-task-row" key={t.id}><label><input type="checkbox" checked={t.done} onChange={e=>{patch({tasks:data.tasks.map(x=>x.id===t.id?{...x,done:e.target.checked}:x)});setNotice(e.target.checked?"Zadanie oznaczone jako wykonane ✓":"Zadanie wróciło na listę otwartych.");}}/><span className={t.done?"done":""}>{t.text}</span></label><button onClick={()=>{if(window.confirm("Usunąć zadanie: „"+t.text+"”?")){patch({tasks:data.tasks.filter(x=>x.id!==t.id)});setNotice("Usunięto zadanie z listy roboczej.");}}}>Usuń</button></div>)}</div>}
    {tab === "Ustawienia" && <div className="owner-content"><div className="owner-section-intro"><span className="owner-eyebrow">DANE MARKI</span><h2>Ustawienia<span>.</span></h2></div><div className="owner-settings-grid"><label>Telefon<input value={data.phone} onChange={e=>patch({phone:e.target.value})}/></label><label>Link do Booksy<input value={data.booking} onChange={e=>patch({booking:e.target.value})}/></label><label>Instagram<input value={data.instagram} onChange={e=>patch({instagram:e.target.value})} placeholder="https://instagram.com/..."/></label></div><div className="owner-data-tools"><div><h3>Kopia zapasowa</h3><p>Pobierz robocze dane w pliku JSON, aby zachować kopię.</p></div><button className="owner-save" onClick={exportData}>↓ Eksportuj dane</button></div></div>}
    <footer className="owner-footer"><span>UNLIM CAR SPA · OWNER WORKSPACE</span><span>{loaded?"DANE ZAŁADOWANE":"ŁADOWANIE DANYCH"} · TRYB ROBOCZY</span></footer></section>
  </main>;
}
