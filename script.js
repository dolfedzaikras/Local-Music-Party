window.addEventListener("load", () => {
  const phone = document.querySelector(".phone");

  if (phone) {
    setTimeout(() => {
      phone.classList.add("show");
    }, 300);
  }
});

const slider = document.querySelector("#eventsSlider");

if (slider) {
  const slides = slider.querySelectorAll(".events-slide");
  const dots = slider.querySelectorAll(".events-dot");
  const prevBtn = slider.querySelector(".events-arrow.prev");
  const nextBtn = slider.querySelector(".events-arrow.next");

  let currentSlide = 0;
  let autoSlide;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    currentSlide = index;
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoSlide();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      resetAutoSlide();
    });
  });

  showSlide(0);
  startAutoSlide();
}

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("active");
    });

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

window.addEventListener("scroll", () => {
  const phoneTwo = document.querySelector(".phone-two");
  const phoneThree = document.querySelector(".phone-three");

  if (!phoneTwo || !phoneThree) return;

  const scrollY = window.scrollY;

  phoneTwo.style.transform = `translateY(${scrollY * 0.08}px) rotate(-9deg)`;
  phoneThree.style.transform = `translateY(${scrollY * -0.06}px) rotate(9deg)`;
});

 
const TOKEN = "8443961208:AAHmOFdNMjZRbO-SIIg0rzmLMA332o_cOvU";
const CHAT_ID = "-5072869660";

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const text =
      "Новая заявка с сайта\n\n" +
      "Имя: " + name + "\n" +
      "Email: " + email + "\n" +
      "Сообщение: " + message;

    const url =
      "https://api.telegram.org/bot" +
      TOKEN +
      "/sendMessage?chat_id=" +
      CHAT_ID +
      "&text=" +
      encodeURIComponent(text);

    fetch(url)
      .then((response) => {
        if (contactStatus) {
          contactStatus.textContent = "Сообщение отправлено!";
        }
        contactForm.reset();
      })
      .catch((error) => {
        if (contactStatus) {
          contactStatus.textContent = "Ошибка отправки";
        }
        console.error(error);
      });
  });
}
