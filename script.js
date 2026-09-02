const particles = document.getElementById("particles");
for (let i = 0; i < 34; i++) {
  const p = document.createElement("span");
  p.className = "particle";
  p.style.left = `${Math.random() * 100}%`;
  p.style.top = `${Math.random() * 100}%`;
  p.style.animationDelay = `${Math.random() * 4}s`;
  p.style.animationDuration = `${3 + Math.random() * 4}s`;
  particles.appendChild(p);
}

/* Video-style rotating hero text */
const phrases = [
  "ITSM Automation",
  "Custom Applications",
  "Integration Solutions",
  "Business Process Tools",
  "ServiceNow Workflows",
  "ITSM, CSM Automation"
];

const typing = document.getElementById("typingText");
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typePhrase() {
  const phrase = phrases[phraseIndex];

  if (!deleting) {
    typing.textContent = phrase.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === phrase.length) {
      deleting = true;
      setTimeout(typePhrase, 1400);
      return;
    }
  } else {
    typing.textContent = phrase.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typePhrase, deleting ? 45 : 75);
}
typePhrase();

/* Mobile navigation */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* Active navigation item */
const sections = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll(".navbar nav a")];

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => sectionObserver.observe(section));

/* Reveal frames */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* Interactive skill frames */
document.querySelectorAll(".skill-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".skill-tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".skill-panel").forEach(panel => panel.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.target).classList.add("active");
  });
});

/* Interactive project frames */
const details = {
  shipping: {
    title: "Shipping Case Management",
    items: [
      "Business Rules, Client Scripts, UI Policies and Data Policies for validation and data accuracy.",
      "SLA Definitions, Flow Designer workflows and notifications for timely case resolution.",
      "Import Sets and Transform Maps for bulk data import.",
      "Reports and dashboards for case status and operational performance."
    ],
    tech: "ServiceNow, JavaScript, Glide API, Flow Designer, Performance Analytics"
  },
  laptop: {
    title: "Laptop Request Management System",
    items: [
      "Multi-stage Service Catalog workflow using Flow Designer.",
      "Automated approvals, task creation and request routing across departments.",
      "Business Rules, Client Scripts, UI Policies and Data Policies.",
      "SLA management, notifications, Import Sets and reporting dashboards."
    ],
    tech: "Flow Designer, GlideRecord, Service Catalog, SLAs, CSM Tables"
  }
};

const detailBox = document.getElementById("projectDetail");
const detailContent = document.getElementById("detailContent");

document.querySelectorAll(".details-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const data = details[btn.dataset.project];
    detailContent.innerHTML = `
      <h3>${data.title}</h3>
      <ul>${data.items.map(item => `<li>${item}</li>`).join("")}</ul>
      <strong>Technologies: ${data.tech}</strong>
    `;
    detailBox.classList.add("open");
    detailBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

document.getElementById("closeDetail").addEventListener("click", () => {
  detailBox.classList.remove("open");
});

/* Subtle mouse interaction for hero */
const hero = document.querySelector(".hero");
hero.addEventListener("pointermove", e => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  document.querySelector(".hero-glow").style.transform = `translate(${x}px, ${y}px)`;
});

/* Resignation Form video interaction */
const resignationVideo = document.getElementById("resignationVideo");
const videoWrap = document.getElementById("resignationVideoWrap");
const videoPlayOverlay = document.getElementById("videoPlayOverlay");

if (resignationVideo && videoWrap && videoPlayOverlay) {
  const syncVideoUI = () => {
    videoWrap.classList.toggle("playing", !resignationVideo.paused && !resignationVideo.ended);
    videoPlayOverlay.innerHTML = resignationVideo.paused || resignationVideo.ended
      ? '<i class="fa-solid fa-play"></i>'
      : '<i class="fa-solid fa-pause"></i>';
  };

  videoPlayOverlay.addEventListener("click", (event) => {
    event.stopPropagation();
    if (resignationVideo.paused || resignationVideo.ended) {
      resignationVideo.play();
    } else {
      resignationVideo.pause();
    }
  });

  resignationVideo.addEventListener("click", (event) => {
    // Clicking the video itself toggles playback. Native controls remain available.
    if (event.offsetY < resignationVideo.clientHeight - 48) {
      if (resignationVideo.paused || resignationVideo.ended) resignationVideo.play();
      else resignationVideo.pause();
    }
  });

  ["play", "pause", "ended"].forEach(eventName => {
    resignationVideo.addEventListener(eventName, syncVideoUI);
  });
  syncVideoUI();
}
