/* Old Williams Pub: small enhancements (header, mobile nav, reveals, opening status, form). */
(function () {
  document.documentElement.classList.add("js");

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  // Sticky header: blurred green background once the page scrolls
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const setNav = (open) => {
    header.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setNav(!header.classList.contains("nav-open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setNav(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setNav(false); });

  // Fade-up on scroll
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${Math.min(i, 4) * 90}ms`;
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  // "Open now" indicator. Keep in sync with the hours listed in index.html.
  // Day 0 = Sunday. Times are [open, close] in 24h; a close past midnight uses 25 = 01:00.
  const HOURS = {
    0: [12, 22], 1: [16, 23], 2: [16, 23], 3: [16, 23], 4: [16, 23], 5: [12, 25], 6: [12, 25],
  };
  const status = document.getElementById("open-status");
  const fmt = (h) => `${String(h % 24).padStart(2, "0")}:00`;
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;
  const today = HOURS[now.getDay()];
  const yesterday = HOURS[(now.getDay() + 6) % 7];
  if (yesterday[1] > 24 && hour < yesterday[1] - 24) {
    status.textContent = `Open now · closes at ${fmt(yesterday[1])}`;
    status.classList.add("is-open");
  } else if (hour >= today[0] && hour < today[1]) {
    status.textContent = `Open now · closes at ${fmt(today[1])}`;
    status.classList.add("is-open");
  } else if (hour < today[0]) {
    status.textContent = `Closed · opens today at ${fmt(today[0])}`;
  } else {
    status.textContent = `Closed · opens tomorrow at ${fmt(HOURS[(now.getDay() + 1) % 7][0])}`;
  }

  // Booking form: validation only. Connect to your booking system or a form service
  // (e.g. Formspree, Netlify Forms) to actually receive requests.
  const form = document.getElementById("book");
  const formStatus = document.getElementById("form-status");
  const dateInput = document.getElementById("date");
  dateInput.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll("[required]").forEach((el) => {
      const ok = el.checkValidity();
      el.closest(".field").classList.toggle("invalid", !ok);
      el.setAttribute("aria-invalid", String(!ok));
      if (!ok) valid = false;
    });
    if (!valid) {
      formStatus.textContent = "Please fill in the highlighted fields.";
      formStatus.className = "form-status err";
      return;
    }
    const name = document.getElementById("name").value.trim().split(" ")[0];
    formStatus.textContent = `Thank you, ${name}. We'll be in touch to confirm your table.`;
    formStatus.className = "form-status ok";
    form.reset();
  });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
