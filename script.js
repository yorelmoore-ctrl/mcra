document.addEventListener("DOMContentLoaded", () => {

  /* NAVIGATION */
  const tabs = document.querySelectorAll(".tab");
  const sections = document.querySelectorAll(".section");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      tabs.forEach(t => t.classList.remove("active"));
      sections.forEach(s => s.classList.remove("active"));

      tab.classList.add("active");

      document.querySelector(`[data-section="${tab.dataset.tab}"]`)
        .classList.add("active");
    });
  });

  /* JOURNAL OPEN */
  const cover = document.getElementById("journalCover");
  const write = document.getElementById("journalWrite");

  document.getElementById("openJournal").addEventListener("click", () => {
    cover.classList.add("hidden");
    write.classList.remove("hidden");
  });

  /* REFLECTIONS */
  const prompts = [
    "What do I need today?",
    "What am I avoiding?",
    "Where did I survive today?",
    "What deserves my attention?",
    "What would feel soft right now?"
  ];

  const ai = document.getElementById("aiPrompt");
  document.getElementById("newPrompt").onclick = () => {
    ai.textContent = prompts[Math.floor(Math.random() * prompts.length)];
  };

  ai.textContent = prompts[0];

  /* STREAK */
  let streak = parseInt(localStorage.getItem("streak") || "0");
  let last = localStorage.getItem("last");

  const display = document.getElementById("streakDisplay");

  function update() {
    display.textContent = `Streak: ${streak}`;
  }

  document.getElementById("streakBtn").onclick = () => {
    const today = new Date().toDateString();

    if (last !== today) {
      streak++;
      last = today;
      localStorage.setItem("streak", streak);
      localStorage.setItem("last", last);
    }

    update();
  };

  update();

  /* JOURNAL SAVE */
  const entry = document.getElementById("entry");

  let entries = JSON.parse(localStorage.getItem("entries") || "[]");

  document.getElementById("saveEntry").onclick = () => {
    entries.push({
      text: entry.value,
      date: new Date().toLocaleString()
    });

    localStorage.setItem("entries", JSON.stringify(entries));
    entry.value = "";
  };

  /* ROOM */
  const roomText = document.getElementById("roomText");

  document.querySelectorAll(".item").forEach(i => {
    i.onclick = () => {
      roomText.textContent = `Mood: ${i.dataset.mood}`;
    };
  });

  /* STARFIELD */
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");

  canvas.width = innerWidth;
  canvas.height = innerHeight;

  const stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5
  }));

  function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white";

    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fill();

      s.y += 0.2;
      if (s.y > canvas.height) s.y = 0;
    });

    requestAnimationFrame(animate);
  }

  animate();

});