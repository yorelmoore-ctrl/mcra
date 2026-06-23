document.addEventListener("DOMContentLoaded", () => {

  /* TAB SYSTEM */
  const tabs = document.querySelectorAll(".tab");
  const sections = document.querySelectorAll(".section");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active"));

      tab.classList.add("active");
      document.querySelector(`[data-section="${tab.dataset.tab}"]`).classList.add("active");
    });
  });

  /* JOURNAL BOOK */
  const cover = document.getElementById("journalCover");
  const write = document.getElementById("journalWrite");

  document.getElementById("openJournal").addEventListener("click", () => {
    cover.classList.add("hidden");
    write.classList.remove("hidden");
  });

  /* AI PROMPTS */
  const prompts = [
    "What do I need emotionally today?",
    "What am I avoiding?",
    "Where did I survive something hard?",
    "What would softness look like?",
    "What part of me needs care?"
  ];

  const aiPrompt = document.getElementById("aiPrompt");
  document.getElementById("newPrompt").addEventListener("click", () => {
    aiPrompt.textContent = prompts[Math.floor(Math.random() * prompts.length)];
  });
  aiPrompt.textContent = prompts[0];

  /* STREAK */
  let streak = parseInt(localStorage.getItem("streak") || "0");
  let last = localStorage.getItem("last");

  const display = document.getElementById("streakDisplay");

  function update() {
    display.textContent = `Streak: ${streak}`;
  }

  document.getElementById("streakBtn").addEventListener("click", () => {
    const today = new Date().toDateString();

    if (last !== today) {
      streak++;
      last = today;
      localStorage.setItem("streak", streak);
      localStorage.setItem("last", last);
    }

    update();
  });

  update();

  /* JOURNAL SAVE */
  const entry = document.getElementById("entry");
  const archive = document.getElementById("archiveList");

  let entries = JSON.parse(localStorage.getItem("entries") || "[]");

  document.getElementById("saveEntry").addEventListener("click", () => {
    entries.push({
      text: entry.value,
      date: new Date().toLocaleString()
    });

    localStorage.setItem("entries", JSON.stringify(entries));
    entry.value = "";
  });

  /* ROOM */
  const roomText = document.getElementById("roomText");

  document.querySelectorAll(".item").forEach(i => {
    i.addEventListener("click", () => {
      roomText.textContent = `Mood: ${i.dataset.mood}`;
    });
  });

  /* STARFIELD */
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();

      s.y -= 0.2;
      if (s.y < 0) s.y = canvas.height;
    });

    requestAnimationFrame(animate);
  }

  animate();

});