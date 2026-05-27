// ======================================
// EVIDENCE I EXIST — SCRIPT.JS
// ======================================

const STORE_KEY = 'eie_v4';

// ─────────────────────────────
// Error Protection
// ─────────────────────────────

window.addEventListener('error', (e) => {

  console.log(
    'JS Error:',
    e.message
  );

});

// ─────────────────────────────
// Storage
// ─────────────────────────────

function getData() {

  try {

    return JSON.parse(
      localStorage.getItem(STORE_KEY)
    ) || {};

  } catch {

    return {};

  }

}

function setData(patch) {

  try {

    const current = getData();

    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({
        ...current,
        ...patch
      })
    );

  } catch (err) {

    console.error(err);

  }

}

// ─────────────────────────────
// Toast
// ─────────────────────────────

function showToast(message) {

  const toast =
    document.getElementById('toast');

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add('show');

  clearTimeout(toast._timer);

  toast._timer = setTimeout(() => {

    toast.classList.remove('show');

  }, 2500);

}

// ─────────────────────────────
// Data
// ─────────────────────────────

const oracleMessages = [

  "Healing is still progress.",

  "You deserve gentleness.",

  "You are rebuilding beautifully.",

  "Rest is productive too.",

  "Your existence matters."

];

const tarotCards = [

  "The Star — hope returns.",

  "Strength — resilience grows.",

  "The Moon — intuition matters.",

  "The Sun — brighter days come.",

  "The Hermit — reflect deeply."

];

const prompts = [

  "What emotion needs care today?",

  "What helped you survive recently?",

  "What feels emotionally safe?",

  "What are you becoming?"

];

const quotes = [

  "You are allowed to heal slowly.",

  "Small progress is still progress.",

  "Your story still matters.",

  "Healing takes time.",

  "You deserve softness too."

];

const QUESTS = [

  "Drink water",

  "Stretch gently",

  "Write one feeling",

  "Listen to calming music",

  "Step outside briefly"

];

// ─────────────────────────────
// App Init
// ─────────────────────────────

window.addEventListener(
  'DOMContentLoaded',
  () => {

    const data = getData();

    // Quote

    document.getElementById(
      'dailyQuote'
    ).textContent =
      quotes[
        Math.floor(
          Math.random() *
          quotes.length
        )
      ];

    // Theme

    const themePicker =
      document.getElementById(
        'themePicker'
      );

    const savedTheme =
      localStorage.getItem(
        'theme'
      ) || 'earth';

    document.body.classList.add(
      savedTheme
    );

    themePicker.value =
      savedTheme;

    themePicker.addEventListener(
      'change',
      () => {

        document.body.className =
          'animated-bg';

        document.body.classList.add(
          themePicker.value
        );

        localStorage.setItem(
          'theme',
          themePicker.value
        );

      }
    );

    // Mood

    const mood =
      document.getElementById(
        'mood'
      );

    mood.value =
      data.mood || '';

    document.getElementById(
      'saveMood'
    ).addEventListener(
      'click',
      () => {

        if (!mood.value) {

          showToast(
            'Choose a mood first'
          );

          return;

        }

        setData({
          mood: mood.value
        });

        showToast(
          'Mood saved ✨'
        );

      }
    );

    // Water

    let water =
      data.water || 0;

    const waterCount =
      document.getElementById(
        'waterCount'
      );

    waterCount.textContent =
      water;

    document.getElementById(
      'waterPlus'
    ).addEventListener(
      'click',
      () => {

        water++;

        waterCount.textContent =
          water;

        setData({ water });

      }
    );

    document.getElementById(
      'waterMinus'
    ).addEventListener(
      'click',
      () => {

        if (water > 0) {

          water--;

        }

        waterCount.textContent =
          water;

        setData({ water });

      }
    );

    // Journal

    const journal =
      document.getElementById(
        'journal'
      );

    journal.value =
      data.journal || '';

    function saveJournal() {

      setData({
        journal: journal.value
      });

    }

    journal.addEventListener(
      'input',
      saveJournal
    );

    document.getElementById(
      'saveJournal'
    ).addEventListener(
      'click',
      () => {

        saveJournal();

        showToast(
          'Journal saved 🌙'
        );

      }
    );

    // Symptoms

    const symptoms =
      document.getElementById(
        'symptoms'
      );

    symptoms.value =
      data.symptoms || '';

    document.getElementById(
      'saveSymptoms'
    ).addEventListener(
      'click',
      () => {

        setData({
          symptoms:
            symptoms.value
        });

        showToast(
          'Symptoms saved'
        );

      }
    );

    // Dreams

    const dreams =
      document.getElementById(
        'dreamJournal'
      );

    dreams.value =
      data.dreams || '';

    document.getElementById(
      'saveDreams'
    ).addEventListener(
      'click',
      () => {

        setData({
          dreams:
            dreams.value
        });

        showToast(
          'Dream saved ✨'
        );

      }
    );

    // Oracle

    document.getElementById(
      'oracleBtn'
    ).addEventListener(
      'click',
      () => {

        document.getElementById(
          'oracleText'
        ).textContent =
          oracleMessages[
            Math.floor(
              Math.random() *
              oracleMessages.length
            )
          ];

      }
    );

    // Tarot

    document.getElementById(
      'drawTarot'
    ).addEventListener(
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

    // Reflection Prompts

    document.getElementById(
      'promptBtn'
    ).addEventListener(
      'click',
      () => {

        document.getElementById(
          'promptText'
        ).textContent =
          prompts[
            Math.floor(
              Math.random() *
              prompts.length
            )
          ];

      }
    );

    // Quests

    const questList =
      document.getElementById(
        'questList'
      );

    QUESTS.forEach(quest => {

      const li =
        document.createElement(
          'li'
        );

      li.textContent =
        `✨ ${quest}`;

      li.style.marginBottom =
        '10px';

      questList.appendChild(li);

    });

    // XP

    let xp =
      parseInt(
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

    function renderXP() {

      const level =
        Math.floor(xp / 100) + 1;

      const progress =
        xp % 100;

      xpFill.style.width =
        `${progress}%`;

      xpText.textContent =
        `Level ${level} — ${xp} XP`;

    }

    renderXP();

    document.getElementById(
      'gainXP'
    ).addEventListener(
      'click',
      () => {

        xp += 10;

        localStorage.setItem(
          'xp',
          xp
        );

        renderXP();

      }
    );

    // Badges

    const badges =
      document.getElementById(
        'badges'
      );

    [

      "🌙 First Journal",

      "💧 Hydration Hero",

      "✨ Quest Complete",

      "🧠 Emotional Check-In"

    ].forEach(badge => {

      const div =
        document.createElement(
          'div'
        );

      div.className =
        'badge';

      div.textContent =
        badge;

      badges.appendChild(div);

    });

    // Streak

    const streak =
      localStorage.getItem(
        'streak'
      ) || 1;

    document.getElementById(
      'streakText'
    ).textContent =
      `${streak} Day Streak`;

    // Music

    const musicSelector =
      document.getElementById(
        'musicSelector'
      );

    const musicPlayer =
      document.getElementById(
        'musicPlayer'
      );

    musicSelector.addEventListener(
      'change',
      () => {

        musicPlayer.src =
          musicSelector.value;

        musicPlayer.play();

      }
    );

    // Voice Journal

    let mediaRecorder;

    let audioChunks = [];

    const recordBtn =
      document.getElementById(
        'recordBtn'
      );

    const voicePlayback =
      document.getElementById(
        'voicePlayback'
      );

    recordBtn.addEventListener(
      'click',
      async () => {

        try {

          if (
            !mediaRecorder ||
            mediaRecorder.state ===
              'inactive'
          ) {

            const stream =
              await navigator
                .mediaDevices
                .getUserMedia({
                  audio: true
                });

            mediaRecorder =
              new MediaRecorder(
                stream
              );

            mediaRecorder.start();

            audioChunks = [];

            mediaRecorder.ondataavailable =
              e => {

                audioChunks.push(
                  e.data
                );

              };

            mediaRecorder.onstop =
              () => {

                const blob =
                  new Blob(
                    audioChunks,
                    {
                      type:
                        'audio/mp3'
                    }
                  );

                voicePlayback.src =
                  URL.createObjectURL(
                    blob
                  );

              };

            recordBtn.textContent =
              'Stop Recording';

          } else {

            mediaRecorder.stop();

            recordBtn.textContent =
              'Start Recording';

          }

        } catch {

          showToast(
            'Microphone denied'
          );

        }

      }
    );

    // Emotional Buttons

    document
      .querySelectorAll(
        '.emotion'
      )
      .forEach(btn => {

        btn.addEventListener(
          'click',
          () => {

            mood.value =
              btn.textContent;

            showToast(
              `Mood set to ${btn.textContent}`
            );

          }
        );

      });

    // Reset

    document.getElementById(
      'resetApp'
    ).addEventListener(
      'click',
      () => {

        localStorage.clear();

        location.reload();

      }
    );

    // Touch Feedback

    document
      .querySelectorAll(
        'button'
      )
      .forEach(button => {

        button.addEventListener(
          'touchstart',
          () => {

            button.classList.add(
              'pressed'
            );

          }
        );

        button.addEventListener(
          'touchend',
          () => {

            button.classList.remove(
              'pressed'
            );

          }
        );

      });

    console.log(
      'Sanctuary loaded'
    );

  }
);
