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

  /* AI PROMPTS */
  const prompts = [
    "What do I need emotionally right now?",
    "What am I avoiding today?",
    "What did I survive this week?",
    "What would rest look like?",
    "What do I deserve more of?"
  ];

  const aiPrompt = document.getElementById("aiPrompt");
  const newPrompt = document.getElementById("newPrompt");

  function setPrompt() {
    aiPrompt.textContent = prompts[Math.floor(Math.random() * prompts.length)];
  }

  if (newPrompt) newPrompt.addEventListener("click", setPrompt);
  setPrompt();

  /* STREAK SYSTEM */
  let streak = parseInt(localStorage.getItem("streak") || "0");
  let last = localStorage.getItem("last");

  const streakBtn = document.getElementById("streakBtn");
  const streakDisplay = document.getElementById("streakDisplay");

  function updateStreak() {
    streakDisplay.textContent = `Streak: ${streak} days`;
  }

  if (streakBtn) {
    streakBtn.addEventListener("click", () => {
      const today = new Date().toDateString();

      if (last !== today) {
        streak++;
        last = today;

        localStorage.setItem("streak", streak);
        localStorage.setItem("last", last);
      }

      updateStreak();
    });
  }

  updateStreak();

  /* JOURNAL */
  const entry = document.getElementById("entry");
  const save = document.getElementById("saveEntry");
  const archive = document.getElementById("archiveList");

  let entries = JSON.parse(localStorage.getItem("entries") || "[]");

  function render() {
    if (!archive) return;
    archive.innerHTML = "";

    entries.forEach(e => {
      const div = document.createElement("div");
      div.className = "card";
      div.textContent = `${e.text} (${e.date})`;
      archive.appendChild(div);
    });
  }

  if (save) {
    save.addEventListener("click", () => {
      if (!entry.value) return;

      entries.push({
        text: entry.value,
        date: new Date().toLocaleString()
      });

      localStorage.setItem("entries", JSON.stringify(entries));
      entry.value = "";
      render();
    });
  }

  render();

  /* ROOM MOOD */
  const roomText = document.getElementById("roomText");

  document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", () => {

      const moods = {
        calm: "#1a1230",
        soft: "#2a1b3d",
        bright: "#3a2b5a"
      };

      document.body.style.background = moods[item.dataset.mood];
      if (roomText) roomText.textContent = `Mood: ${item.dataset.mood}`;
    });
  });

});