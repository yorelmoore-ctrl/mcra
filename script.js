document.addEventListener("DOMContentLoaded", () => {

  /* ================= TAB SYSTEM ================= */
  const tabs = document.querySelectorAll(".tab");
  const sections = document.querySelectorAll(".section");

  function switchTab(tab) {
    tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
    sections.forEach(s => s.classList.toggle("active", s.dataset.section === tab));
  }

  tabs.forEach(t => t.addEventListener("click", () => switchTab(t.dataset.tab)));

  /* ================= AI PROMPTS ================= */
  const prompts = [
    "What did I survive this week that I’m not giving myself credit for?",
    "What emotion is sitting in my body right now?",
    "What do I need but keep avoiding?",
    "What would rest look like today?",
    "Where did I show strength recently?"
  ];

  const aiPrompt = document.getElementById("aiPrompt");
  const newPrompt = document.getElementById("newPrompt");

  function setPrompt() {
    aiPrompt.textContent = prompts[Math.floor(Math.random() * prompts.length)];
  }

  newPrompt.addEventListener("click", setPrompt);
  setPrompt();

  /* ================= STREAK SYSTEM ================= */
  const streakDisplay = document.getElementById("streakDisplay");
  const streakBtn = document.getElementById("streakBtn");

  let streak = parseInt(localStorage.getItem("mcra_streak") || "0");
  let last = localStorage.getItem("mcra_last");

  function updateStreak() {
    streakDisplay.textContent = `Streak: ${streak} days`;
  }

  streakBtn.addEventListener("click", () => {
    const today = new Date().toDateString();

    if (last !== today) {
      streak++;
      localStorage.setItem("mcra_last", today);
      localStorage.setItem("mcra_streak", streak);
    }

    updateStreak();
  });

  updateStreak();

  /* ================= JOURNAL LOCK ================= */
  const pass = "1234";

  const lockScreen = document.getElementById("lockScreen");
  const journalArea = document.getElementById("journalArea");
  const unlockBtn = document.getElementById("unlockBtn");

  unlockBtn.addEventListener("click", () => {
    const input = document.getElementById("passcodeInput").value;

    if (input === pass) {
      lockScreen.classList.add("hidden");
      journalArea.classList.remove("hidden");
    } else {
      alert("Wrong passcode");
    }
  });

  /* ================= JOURNAL SAVE ================= */
  const entry = document.getElementById("entry");
  const save = document.getElementById("saveEntry");
  const archive = document.getElementById("archiveList");

  let entries = JSON.parse(localStorage.getItem("mcra_entries") || "[]");

  function render() {
    archive.innerHTML = "";
    entries.forEach(e => {
      const div = document.createElement("div");
      div.className = "card";
      div.textContent = `${e.text} (${e.date})`;
      archive.appendChild(div);
    });
  }

  save.addEventListener("click", () => {
    entries.push({
      text: entry.value,
      date: new Date().toLocaleString()
    });

    localStorage.setItem("mcra_entries", JSON.stringify(entries));
    entry.value = "";
    render();
  });

  render();

  /* ================= ROOM LIGHTING ================= */
  const roomText = document.getElementById("roomText");

  document.querySelectorAll(".item").forEach(item => {
    item.addEventListener("click", () => {
      const mood = item.dataset.mood;

      const lights = {
        calm: "#0f172a",
        soft: "#1f1b2e",
        bright: "#2a2d3a"
      };

      document.body.style.setProperty("--bg", lights[mood]);
      roomText.textContent = `Mood shifted: ${mood}`;
    });
  });

});