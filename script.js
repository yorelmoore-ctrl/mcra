document.addEventListener("DOMContentLoaded", () => {

  const tabs = document.querySelectorAll(".tab");
  const sections = document.querySelectorAll(".section");

  function switchTab(tabName) {

    // tabs
    tabs.forEach(t => {
      t.classList.toggle("active", t.dataset.tab === tabName);
    });

    // sections
    sections.forEach(s => {
      s.classList.toggle("active", s.dataset.section === tabName);
    });

  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      switchTab(tab.dataset.tab);
    });
  });

});