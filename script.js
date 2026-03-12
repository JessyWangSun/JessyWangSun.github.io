// ─── Rotating Text ─────────────────────────────────────────────
const rotatingTexts = [
  "a PhD Researcher",
  "an HCI Designer",
  "a Mental Health Advocate",
  "a Community Organizer",
  "a Social Justice Technologist",
];

let currentTextIndex = 0;
const rotatingEl = document.getElementById("rotating-text");

function rotateText() {
  if (!rotatingEl) return;
  rotatingEl.classList.add("fade-out");
  rotatingEl.classList.remove("fade-in");

  setTimeout(() => {
    currentTextIndex = (currentTextIndex + 1) % rotatingTexts.length;
    rotatingEl.textContent = rotatingTexts[currentTextIndex];
    rotatingEl.classList.remove("fade-out");
    rotatingEl.classList.add("fade-in");
  }, 350);
}

if (rotatingEl) {
  rotatingEl.textContent = rotatingTexts[0];
  rotatingEl.classList.add("fade-in");
  setInterval(rotateText, 4000);
}

// ─── Draggable Dividers ─────────────────────────────────────────
const bentoContainer = document.getElementById("bento-container");
const dividerV = document.getElementById("divider-v");
const dividerH = document.getElementById("divider-h");

function setupDivider(divider, axis) {
  if (!divider || !bentoContainer) return;

  divider.addEventListener("mousedown", (e) => {
    e.preventDefault();
    divider.classList.add("dragging");

    const onMove = (e) => {
      const rect = bentoContainer.getBoundingClientRect();
      if (axis === "v") {
        const pct = ((e.clientX - rect.left) / rect.width) * 100;
        const clamped = Math.min(Math.max(pct, 20), 80).toFixed(2);
        bentoContainer.style.setProperty("--left-width", clamped + "%");
      } else {
        const pct = ((e.clientY - rect.top) / rect.height) * 100;
        const clamped = Math.min(Math.max(pct, 20), 80).toFixed(2);
        bentoContainer.style.setProperty("--top-height", clamped + "%");
      }
    };

    const onUp = () => {
      divider.classList.remove("dragging");
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  });
}

setupDivider(dividerV, "v");
setupDivider(dividerH, "h");

// ─── Overlay Open / Close ───────────────────────────────────────
function openOverlay(name) {
  const overlay = document.getElementById("overlay-" + name);
  if (overlay) {
    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

function closeOverlay(name) {
  const overlay = document.getElementById("overlay-" + name);
  if (overlay) {
    overlay.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

// Close overlay on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".overlay:not(.hidden)").forEach((el) => {
      el.classList.add("hidden");
    });
    document.body.style.overflow = "";
  }
});

// ─── Publications Abstract Toggle ───────────────────────────────
function toggleAbstract(button) {
  const publicationItem = button.parentElement;
  const abstractContent = publicationItem.querySelector(".abstract-content");

  if (abstractContent.style.display === "block") {
    abstractContent.style.display = "none";
    button.textContent = "Abstract";
  } else {
    abstractContent.style.display = "block";
    button.textContent = "Hide Abstract";
  }
}
