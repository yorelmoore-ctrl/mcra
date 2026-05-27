// ======================================
// DAILY QUOTES
// ======================================

const quotes = [

  "Healing is not linear.",

  "You survived every hard day so far.",

  "Rest is productive too.",

  "Small progress is still progress.",

  "You are allowed to begin again."

];

const dailyQuote =
  document.getElementById(
    'dailyQuote'
  );

if (dailyQuote) {

  dailyQuote.textContent =
    quotes[
      Math.floor(
        Math.random() *
        quotes.length
      )
    ];

}

// ======================================
// TAB SYSTEM
// ======================================

document.addEventListener(
  'DOMContentLoaded',
  () => {

    const navButtons =
      document.querySelectorAll(
        '.nav-btn'
      );

    const tabPanels =
      document.querySelectorAll(
        '.tab-panel'
      );

    navButtons.forEach(button => {

      button.addEventListener(
        'click',
        () => {

          const targetTab =
            button.dataset.tab;

          navButtons.forEach(btn => {

            btn.classList.remove(
              'active'
            );

          });

          tabPanels.forEach(panel => {

            panel.classList.remove(
              'active'
            );

          });

          button.classList.add(
            'active'
          );

          const selectedPanel =
            document.getElementById(
              targetTab
            );

          if (selectedPanel) {

            selectedPanel.classList.add(
              'active'
            );

          }

        }
      );

    });

  }
);

// ======================================
// WATER TRACKER
// ======================================

let water =
  Number(
    localStorage.getItem(
      'waterCount'
    )
  ) || 0;

const waterCount =
  document.getElementById(
    'waterCount'
  );

function updateWater() {

  if (waterCount) {

    waterCount.textContent =
      water;

  }

  localStorage.setItem(
    'waterCount',
    water
  );

}

document
  .getElementById(
    'waterPlus'
  )
  ?.addEventListener(
    'click',
    () => {

      water++;

      updateWater();

    }
  );

document
  .getElementById(
    'waterMinus'
  )
  ?.addEventListener(
    'click',
    () => {

      if (water > 0) {

        water--;

      }

      updateWater();

    }
  );

updateWater();

// ======================================
// XP SYSTEM
// ======================================

let xp =
  Number(
    localStorage.getItem(
      'xp'
    )
  ) || 0;

const xpFill =
  document.getElementById(
    'xpFill'
  );

const xpText =
  document.getElementById(
    'xpText'
  );

function updateXP() {

  const level =
    Math.floor(xp / 100) + 1;

  const progress =
    xp % 100;

  if (xpFill) {

    xpFill.style.width =
      progress + '%';

  }

  if (xpText) {

    xpText.textContent =
      `Level ${level} — ${xp} XP`;

  }

  localStorage.setItem(
    'xp',
    xp
  );

}

document
  .getElementById(
    'gainXP'
  )
  ?.addEventListener(
    'click',
    () => {

      xp += 15;

      updateXP();

      showToast(
        'Healing XP gained ✨'
      );

    }
  );

updateXP();

// ======================================
// JOURNAL SAVE
// ======================================

const journal =
  document.getElementById(
    'journal'
  );

document
  .getElementById(
    'saveJournal'
  )
  ?.addEventListener(
    'click',
    () => {

      localStorage.setItem(
        'journal',
        journal.value
      );

      saveArchive({

        type: 'Journal',

        title:
          'Daily Reflection',

        content:
          journal.value,

        date:
          new Date()
          .toLocaleString()

      });

      showToast(
        'Journal saved'
      );

    }
  );

if (journal) {

  journal.value =
    localStorage.getItem(
      'journal'
    ) || '';

}

// ======================================
// DREAM JOURNAL
// ======================================

const dreamJournal =
  document.getElementById(
    'dreamJournal'
  );

document
  .getElementById(
    'saveDreams'
  )
  ?.addEventListener(
    'click',
    () => {

      localStorage.setItem(
        'dreamJournal',
        dreamJournal.value
      );

      saveArchive({

        type: 'Dream',

        title:
          'Dream Journal',

        content:
          dreamJournal.value,

        date:
          new Date()
          .toLocaleString()

      });

      showToast(
        'Dream saved'
      );

    }
  );

// ======================================
// SYMPTOMS
// ======================================

const symptoms =
  document.getElementById(
    'symptoms'
  );

document
  .getElementById(
    'saveSymptoms'
  )
  ?.addEventListener(
    'click',
    () => {

      localStorage.setItem(
        'symptoms',
        symptoms.value
      );

      saveArchive({

        type: 'Symptoms',

        title:
          'Symptom Log',

        content:
          symptoms.value,

        date:
          new Date()
          .toLocaleString()

      });

      showToast(
        'Symptoms saved'
      );

    }
  );

// ======================================
// ARCHIVE
// ======================================

const archiveContainer =
  document.getElementById(
    'archiveContainer'
  );

function getArchive() {

  return JSON.parse(
    localStorage.getItem(
      'sanctuaryArchive'
    )
  ) || [];

}

function saveArchive(item) {

  const archive =
    getArchive();

  archive.unshift(item);

  localStorage.setItem(
    'sanctuaryArchive',
    JSON.stringify(archive)
  );

  renderArchive();

}

function renderArchive() {

  if (!archiveContainer) return;

  archiveContainer.innerHTML =
    '';

  const archive =
    getArchive();

  archive.forEach(item => {

    const card =
      document.createElement(
        'div'
      );

    card.className =
      'archive-card';

    card.innerHTML = `

      <div class="archive-type">
        ${item.type}
      </div>

      <div class="archive-date">
        ${item.date}
      </div>

      <h3>
        ${item.title}
      </h3>

      <p>
        ${item.content}
      </p>

    `;

    archiveContainer.appendChild(
      card
    );

  });

}

renderArchive();

// ======================================
// TAROT
// ======================================

const tarotCards = [

  "The Star ✨",

  "The Moon 🌙",

  "The Hermit 🕯️",

  "Strength 🦁",

  "The Empress 🌿"

];

document
  .getElementById(
    'drawTarot'
  )
  ?.addEventListener(
    'click',
    () => {

      document.getElementById(
        'tarotResult'
      ).textContent =

        tarotCards[
          Math.floor(
            Math.random() *
            tarotCards.length
          )
        ];

    }
  );

// ======================================
// MUSIC
// ======================================

const musicSelector =
  document.getElementById(
    'musicSelector'
  );

const musicPlayer =
  document.getElementById(
    'musicPlayer'
  );

musicSelector
  ?.addEventListener(
    'change',
    () => {

      musicPlayer.src =
        musicSelector.value;

      musicPlayer.play();

    }
  );

// ======================================
// TOAST
// ======================================

function showToast(message) {

  let toast =
    document.getElementById(
      'toast'
    );

  if (!toast) {

    toast =
      document.createElement(
        'div'
      );

    toast.id = 'toast';

    document.body.appendChild(
      toast
    );

  }

  toast.textContent =
    message;

  toast.classList.add(
    'show'
  );

  setTimeout(() => {

    toast.classList.remove(
      'show'
    );

  }, 2500);

}

// ======================================
// SERVICE WORKER
// ======================================

if (
  'serviceWorker'
  in navigator
) {

  window.addEventListener(
    'load',
    () => {

      navigator
        .serviceWorker
        .register(
          './service-worker.js'
        )

        .then(() => {

          console.log(
            'Offline mode enabled'
          );

        });

    }
  );

}