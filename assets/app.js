// Demo verisi: sporyayinevi.com mağazasındaki gerçek kitaplardan seçildi.
const BOOKS = {
  57186: { title: "Su Sporları Perspektifinden Yelken Branşlarında Eğitmen Yetiştirme", meta: "E-Kitap · Araştırma", price: 400, tag: "Yeni" },
  57083: { title: "Spor Bilimciler İçin EMG’nin Alfabesi: Temel Prensipler", meta: "Özlem Köklü · E-Kitap", price: 400, tag: "Yeni", url: "urun.html" },
  56668: { title: "Sporda Kondisyon Antrenmanı", meta: "Fitness · Kuram", price: 2000, tag: "Yeni" },
  56579: { title: "Pickleball Öğreniyoruz", meta: "Uygulama", price: 500, tag: "Yeni" },
  55920: { title: "Pilates: Zihin, Beden ve Bilimin Buluşması", meta: "E-Kitap · Araştırma", price: 400, tag: "Yeni" },
  52324: { title: "Egzersiz Fizyolojisi Uygulama Kılavuzu (2. Basım)", meta: "Spor Sağlığı · Kuram", price: 1150, tag: "Yeni" },
  7481: { title: "Yüksek Şiddetli İnterval Antrenman (HIIT)", meta: "Paul Laursen, Martin Buchheit", price: 2500 },
  51651: { title: "İleri Düzey Sporcu Beslenmesi", meta: "Spor Bilimi · Fitness", price: 2000 },
  7503: { title: "Sporda Fonksiyonel Antrenman (4. Basım)", meta: "Fitness · Kuram", price: 1500 },
  14532: { title: "Dönemleme: Antrenman Kuramı ve Yöntemi", meta: "Kuram · Spor Bilimi", price: 1500 },
  16724: { title: "Motor Öğrenme: Kavramlar ve Uygulamalar", meta: "Spor Bilimi", price: 1100 },
  51463: { title: "Ağırlık Antrenmanları", meta: "Fitness · Kuram", price: 1100 }
};

const tl = (n) => "₺" + n.toLocaleString("tr-TR", { minimumFractionDigits: 2 });

const plusIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';

function card(id) {
  const b = BOOKS[id];
  const href = b.url || "#";
  const tag = b.tag ? `<span class="tag tag-new">${b.tag}</span>` : "";
  return `<article class="book">
    <a class="book-cover" href="${href}">${tag}<img src="assets/img/b${id}.jpg" alt="${b.title} kitap kapağı" loading="lazy"></a>
    <h3><a href="${href}">${b.title}</a></h3>
    <div class="meta">${b.meta}</div>
    <div class="row"><span class="price">${tl(b.price)}</span>
      <button class="add" type="button" aria-label="${b.title} sepete ekle">${plusIcon}</button></div>
  </article>`;
}

document.querySelectorAll("[data-books]").forEach((el) => {
  el.innerHTML = el.dataset.books.split(",").map(card).join("");
});

// Sepet sayacı (demo)
let count = 0;
const badge = document.querySelector("[data-cart-count]");
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".add, [data-add]");
  if (!btn) return;
  const qty = document.querySelector("[data-qty]");
  count += btn.matches("[data-add]") && qty ? Math.max(1, parseInt(qty.value, 10) || 1) : 1;
  badge.textContent = count;
  badge.hidden = false;
  btn.classList.add("added");
});

// Mobil menü
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});

// Adet seçici
document.querySelectorAll("[data-step]").forEach((b) =>
  b.addEventListener("click", () => {
    const input = document.querySelector("[data-qty]");
    input.value = Math.max(1, (parseInt(input.value, 10) || 1) + Number(b.dataset.step));
  })
);

// Bülten formu (demo)
document.querySelector("[data-newsletter]")?.addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.innerHTML = "<p><b>Teşekkürler!</b> Yeni kitaplardan ilk siz haberdar olacaksınız.</p>";
});
