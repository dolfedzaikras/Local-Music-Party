/* PHONE APPEAR ANIMATION */

window.addEventListener("load", () => {
  const phone = document.querySelector(".phone");

  if (!phone) return;

  setTimeout(() => {
    phone.classList.add("show");
  }, 300);
});


/* PHONE PARALLAX */

window.addEventListener("scroll", () => {
  const phoneTwo = document.querySelector(".phone-two");
  const phoneThree = document.querySelector(".phone-three");

  if (!phoneTwo || !phoneThree) return;

  const scrollY = window.scrollY;

  phoneTwo.style.transform = `translateY(${scrollY * 0.08}px) rotate(8deg)`;
  phoneThree.style.transform = `translateY(${scrollY * -0.06}px) rotate(-10deg)`;
});


document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");

  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const submitBtn = contactForm.querySelector(".contact-btn");

    if (!name || !email || !message) {
      contactStatus.textContent = "Пожалуйста, заполните все поля.";
      contactStatus.className = "contact-status error";
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      contactStatus.textContent = "Введите корректную электронную почту.";
      contactStatus.className = "contact-status error";
      return;
    }

    submitBtn.disabled = true;
    contactStatus.textContent = "Сообщение отправляется...";
    contactStatus.className = "contact-status";

    setTimeout(() => {
      contactStatus.textContent = "Спасибо! Ваше сообщение успешно отправлено.";
      contactStatus.className = "contact-status success";
      contactForm.reset();
      submitBtn.disabled = false;
    }, 1000);
  });
});