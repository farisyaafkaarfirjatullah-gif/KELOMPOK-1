
  // angota
  const anggota = [
    { nama: "Rizky Pratama (Ketua)",     formal: "",  hobiFoto: "",  hobi: "" },
    { nama: "Nadif Ahmad Fahrial", formal: "", hobiFoto: "", hobi: "" },
    { nama: "Muhamad Farel",         formal: "", hobiFoto: "", hobi: "" },
    { nama: "Muhammad Syava Argiean",     formal: "",   hobiFoto: "",   hobi: "" },
    { nama: "Rizki Sudiman Ramdhan",           formal: "",   hobiFoto: "",   hobi: "" },
    { nama: "Kameela Jibrillafy",              formal: "",   hobiFoto: "",   hobi: "" },
    { nama: "Muhamad Valda",              formal: "",   hobiFoto: "",   hobi: "" },
    { nama: "Farisya Afkaar Firjatullah",        formal: "",   hobiFoto: "",   hobi: "" },
    { nama: "Rafi Akhdan Winata",         formal: "",    hobiFoto: "",    hobi: "" },
    { nama: "Rully Indrawanta",      formal: "",   hobiFoto: "",   hobi: "" },
    { nama: "Annisa Zannati Qalbiah",      formal: "",   hobiFoto: "",   hobi: "" },
  ];

  const FALLBACK = "img/logo.jpg"; //smntra/
  const grid = document.querySelector("#anggota-grid");

  anggota.forEach((a) => {
    const card = document.createElement("div");
    card.className = "flip-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", "Balik card " + a.nama);

    card.innerHTML = `
      <div class="flip-inner">
        <div class="flip-front">
          <img src="${a.formal}" alt="Foto formal ${a.nama}" loading="lazy">
          <h4>${a.nama}</h4>
          <span class="flip-hint">klik untuk lihat hobi</span>
        </div>
        <div class="flip-back">
          <span class="label">HOBI</span>
          <img src="${a.hobiFoto}" alt="Foto hobi ${a.nama}" loading="lazy">
          <h4>${a.nama}</h4>
          <p>${a.hobi}</p>
        </div>
      </div>
    `;

    //ggal
    card.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", () => { img.src = FALLBACK; }, { once: true });
    });

    const flip = () => card.classList.toggle("flipped");
    card.addEventListener("click", flip);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        flip();
      }
    });

    grid.appendChild(card);
  });

  //scrol
const targets = document.querySelectorAll(
  ".hero-text, .hero-image, .section-title, .mentor-card, .about-card, .flip-card, .education-item, .achievement-card, .contact-card"
);

targets.forEach((el) => el.classList.add("reveal"));


targets.forEach((el) => {
  const siblings = [...el.parentElement.children].filter((c) =>
    c.classList.contains("reveal")
  );
  const i = siblings.indexOf(el);
  el.style.setProperty("--d", Math.min(i, 6) * 0.1 + "s");
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); 
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  targets.forEach((el) => observer.observe(el));
} else {
  targets.forEach((el) => el.classList.add("visible"));
}