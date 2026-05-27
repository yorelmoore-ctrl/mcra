// ================================
// EVIDENCE I EXIST — SCRIPT.JS
// ================================

const STORE_KEY = 'eie_v2';

window.addEventListener('error', (e) => {
  console.log('JS Error:', e.message);
});

// ── Helpers ─────────────────────────────────────

function getData() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch {
    return {};
  }
}

function setData(patch) {
  try {
    const d = getData();

    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({
        ...d,
        ...patch
      })
    );

  } catch (err) {
    console.error('Save failed:', err);
  }
}

function showToast(msg) {

  const t = document.getElementById('toast');

  if (!t) return;

  t.textContent = msg;

  t.classList.add('show');

  clearTimeout(t._timer);

  t._timer = setTimeout(() => {
    t.classList.remove('show');
  }, 2500);

}

// ── Oracle Messages ─────────────────────────────

const oracleMessages = [

  "You are rebuilding yourself beautifully.",

  "Healing is still progress.",

  "You deserve softness and safety.",

  "Rest is productive too.",

  "You survived every hard day so far."

];

// ── Quest System ────────────────────────────────

const QUESTS = [

  "Drink 2 glasses of water",

  "Write one honest feeling",

  "Stretch for 5 minutes",

  "Open a window and breathe deeply",

  "Listen to one comforting song"

];

// ── App Init ────────────────────────────────────

window.addEventListener('DOMContentLoaded', () => {

  const mood = document.getElementById('mood');
  const saveMood = document.getElementById('saveMood');

  const journal = document.getElementById('journal');
  const saveJournal = document.getElementById('saveJournal');

  const oracleBtn = document.getElementById('oracleBtn');
  const oracleText = document.getElementById('oracleText');

  const waterCount = document.getElementById('waterCount');
  const waterPlus = document.getElementById('waterPlus');
  const waterMinus = document.getElementById('waterMinus');

  const questList = document.getElementById('questList');

  const saved = getData();

  // ── Restore saved data ─────────────────────

  if (saved.mood) {
    mood.value = saved.mood;
  }

  if (saved.journal) {
    journal.value = saved.journal;
  }

  let water = saved.water || 0;

  waterCount.textContent = water;

  // ── Save Mood ──────────────────────────────

  saveMood.addEventListener('click', () => {

    setData({
      mood: mood.value
    });

    showToast('Mood saved ✨');

  });

  // ── Save Journal ───────────────────────────

  saveJournal.addEventListener('click', () => {

    setData({
      journal: journal.value
    });

    showToast('Journal saved 🌙');

  });

  // ── Water Tracker ──────────────────────────

  waterPlus.addEventListener('click', () => {

    water++;

    waterCount.textContent = water;

    setData({
      water
    });

  });

  waterMinus.addEventListener('click', () => {

    if (water > 0) {
      water--;
    }

    waterCount.textContent = water;

    setData({
      water
    });

  });

  // ── Oracle System ──────────────────────────

  oracleBtn.addEventListener('click', () => {

    const random =
      oracleMessages[
        Math.floor(Math.random() * oracleMessages.length)
      ];

    oracleText.textContent = random;

  });

  // ── Render Quests ──────────────────────────

  QUESTS.forEach(quest => {

    const li = document.createElement('li');

    li.textContent = `✨ ${quest}`;

    li.style.marginBottom = '10px';

    questList.appendChild(li);

  });

  // ── Button Touch Effects ───────────────────

  document.querySelectorAll('button').forEach(button => {

    button.addEventListener('touchstart', () => {
      button.classList.add('pressed');
    });

    button.addEventListener('touchend', () => {
      button.classList.remove('pressed');
    });

  });

  console.log('Sanctuary systems loaded.');

});