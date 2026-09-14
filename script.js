"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");

function closeMenu() {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "메뉴 열기");
}

menuButton.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", event => {
  if (!event.target.closest(".header")) closeMenu();
});
window.matchMedia("(min-width: 761px)").addEventListener("change", closeMenu);

const filters = document.querySelectorAll("[data-filter]");
const cards = document.querySelectorAll(".look-card");
const filterStatus = document.querySelector(".filter-status");

filters.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    filters.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    let count = 0;
    cards.forEach(card => {
      card.hidden = category !== "all" && card.dataset.category !== category;
      if (!card.hidden) count += 1;
    });
    filterStatus.textContent = `${category === "all" ? "모든" : button.textContent} 코디 힌트 ${count}개를 보고 있어요.`;
  });
});

// 랜딩페이지 내 체험용 담기 기능입니다. 새로고침하면 초기화됩니다.
const toast = document.querySelector(".toast");
let toastTimer;
document.querySelectorAll(".save-button").forEach(button => {
  button.addEventListener("click", () => {
    const saved = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(saved));
    button.replaceChildren(document.createTextNode(saved ? "♥ " : "♡ "));
    const label = document.createElement("span");
    label.textContent = saved ? "담은 힌트 · 취소하기" : "코디 힌트 담기";
    button.append(label);
    toast.textContent = saved ? "코디 힌트를 담았어요. 새로고침하면 초기화돼요." : "담은 힌트를 취소했어요.";
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 3500);
  });
});
