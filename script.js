document.addEventListener("DOMContentLoaded", () => {
  const phone = document.querySelector(".phone");
  if (phone) {
    setTimeout(() => {
      phone.classList.add("show");
    }, 300);
  }

  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    if (!button) return;

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

  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");

  const TOKEN = "8443961208:AAHmOFdNMjZRbO-SIIg0rzmLMA332o_cOvU";
  const CHAT_ID = "-5072869660";

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name")?.value || "";
      const email = document.getElementById("email")?.value || "";
      const message = document.getElementById("message")?.value || "";

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
        .then(() => {
          if (contactStatus) {
            contactStatus.textContent = "Сообщение отправлено!";
          }
          contactForm.reset();
        })
        .catch((error) => {
          if (contactStatus) {
            contactStatus.textContent = "Ошибка отправки";
          }
          console.error("Ошибка Telegram:", error);
        });
    });
  }

  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    const phoneTwo = document.querySelector(".phone-two");
    const phoneThree = document.querySelector(".phone-three");

    if (phoneTwo && phoneThree) {
      const scrollY = window.scrollY;
      phoneTwo.style.transform = `translateY(${scrollY * 0.08}px) rotate(-9deg)`;
      phoneThree.style.transform = `translateY(${scrollY * -0.06}px) rotate(9deg)`;
    }

    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  const slidesContainer = document.getElementById("eventsSlides");
  const dotsContainer = document.getElementById("eventsDots");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  if (!slidesContainer || !dotsContainer) {
    console.error("Не найдены #eventsSlides или #eventsDots");
    return;
  }

  let slides = [];
  let dots = [];
  let currentSlide = 0;
  let autoSlide = null;

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
    if (!slides.length) return;
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    if (!slides.length) return;
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  function startAutoSlide() {
    if (!slides.length) return;
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  fetch("api/concerts.php")
    .then((response) => response.json())
    .then((concerts) => {
      console.log("Концерты из БД:", concerts);

      if (!Array.isArray(concerts) || concerts.length === 0) {
        slidesContainer.innerHTML = "<p style='color:white;'>Пока нет мероприятий.</p>";
        return;
      }

      slidesContainer.innerHTML = "";
      dotsContainer.innerHTML = "";

      concerts.forEach((concert, index) => {
        const photoPath = String(concert.photo || "").replace(/\\/g, "/");

        const slide = document.createElement("div");
        slide.className = index === 0 ? "events-slide active" : "events-slide";

        slide.innerHTML = `
          <img src="${photoPath}" alt="${concert.title}">
          <div class="events-slide-overlay"></div>

          <div class="events-slide-content">

            <h3 class="events-slide-heading">
              ${concert.title || ""} <span>${concert.artist_name || ""}</span>
            </h3>

            <p class="events-slide-text">
              ${concert.description || ""}<br><br>
              <strong>Площадка:</strong> ${concert.venue || ""}<br>
              <strong>Дата:</strong> ${concert.concert_date || ""}
            </p>
          </div>
        `;

        slidesContainer.appendChild(slide);

        const dot = document.createElement("button");
        dot.className = index === 0 ? "events-dot active" : "events-dot";
        dot.type = "button";
        dot.setAttribute("aria-label", `Слайд ${index + 1}`);

        dot.addEventListener("click", () => {
          showSlide(index);
          resetAutoSlide();
        });

        dotsContainer.appendChild(dot);
      });

      slides = slidesContainer.querySelectorAll(".events-slide");
      dots = dotsContainer.querySelectorAll(".events-dot");

      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          prevSlide();
          resetAutoSlide();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          nextSlide();
          resetAutoSlide();
        });
      }

      showSlide(0);
      startAutoSlide();
    })
    .catch((error) => {
      console.error("Ошибка загрузки концертов:", error);
      slidesContainer.innerHTML = "<p style='color:white;'>Не удалось загрузить мероприятия.</p>";
    });
});