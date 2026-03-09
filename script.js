window.addEventListener("load", () => {
  const phone = document.querySelector(".phone");

  setTimeout(() => {
    phone.classList.add("show");
  }, 300);
});

window.addEventListener("scroll", () => {
  const phoneTwo = document.querySelector(".phone-two");
  const phoneThree = document.querySelector(".phone-three");

  if (!phoneTwo || !phoneThree) return;

  const scrollY = window.scrollY;

  phoneTwo.style.transform = `translateY(${scrollY * 0.08}px) rotate(8deg)`;
  phoneThree.style.transform = `translateY(${scrollY * -0.06}px) rotate(-10deg)`;
});