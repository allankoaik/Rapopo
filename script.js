const rooms = [
  {
    name: "Ocean Suite",
    price: "K420 / night",
    description:
      "A bright, airy suite with floor-to-ceiling views, a soaking tub, and a private balcony facing the bay.",
    features: ["Sea view", "King bed", "Private bath"],
    image: "./pictures/Rooms/90527144.jpg",
  },
  {
    name: "Garden Retreat",
    price: "K310 / night",
    description:
      "Soft textures, warm wood finishes, and lush courtyard views create a quiet and restorative escape.",
    features: ["Garden view", "Breakfast included", "Rain shower"],
    image: "./pictures/Rooms/90527104.jpg",
  },
  {
    name: "Family Loft",
    price: "K360 / night",
    description:
      "Spacious and welcoming, with extra sleeping space, modern comforts, and a lounge area for slow evenings.",
    features: ["2 bedrooms", "Coffee bar", "City access"],
    image: "./pictures/Rooms/90527090.jpg",
  },
  {
    name: "Coastal Studio",
    price: "K280 / night",
    description:
      "A refined hideaway with natural textures, a reading nook, and sunlit windows overlooking the coastline.",
    features: ["Ocean deck", "Queen bed", "Smart TV"],
    image: "./pictures/Rooms/90527144.jpg",
  },
];

const services = [
  {
    icon: "✈️",
    title: "Airport Transfer",
    text: "Complimentary airport transfers make the short journey from Tokua Airport easy and comfortable.",
  },
  {
    icon: "📶",
    title: "Free Wi-Fi",
    text: "Stay connected with free Wi-Fi in every room, each designed with a balcony and sea views.",
  },
  {
    icon: "🛎️",
    title: "Concierge Service",
    text: "Our team can help arrange island outings, town trips, airport transfers, and time on the water.",
  },
  {
    icon: "🥐",
    title: "Breakfast Buffet",
    text: "Start the day with complimentary breakfast, including fresh local flavours and tropical produce.",
  },
  {
    icon: "🧼",
    title: "Daily Housekeeping",
    text: "Settle into a comfortable, air-conditioned room with thoughtful essentials and a private balcony.",
  },
  {
    icon: "🚗",
    title: "Parking Access",
    text: "Convenient parking is available on site for guests exploring Kokopo and East New Britain by car.",
  },
  {
    icon: "🍳",
    title: "Free Breakfast",
    text: "Enjoy a complimentary breakfast with fresh fruit, pastries, and local favourites each morning.",
  },
  {
    icon: "🛶",
    title: "Canoeing",
    text: "Explore the calm coastline at your own pace with complimentary canoes available for guests.",
  },
  {
    icon: "🚕",
    title: "Taxi Services",
    text: "Our team can arrange reliable taxis for airport transfers, local trips, and evening plans.",
  },
  {
    icon: "🏊",
    title: "Swimming Pool",
    text: "Cool off and unwind in our inviting pool, surrounded by a peaceful tropical setting.",
  },
  {
    icon: "🤿",
    title: "Snorkeling",
    text: "Discover clear coastal waters and vibrant marine life with easy access to snorkeling spots.",
  },
  {
    icon: "💆",
    title: "Massage",
    text: "Restore your balance with a relaxing massage designed to ease away travel-day tension.",
  },
];

const accommodationList = document.getElementById("accommodation-list");
const carouselDots = document.getElementById("carousel-dots");
const servicesList = document.getElementById("services-list");
const year = document.getElementById("year");
let currentSlide = 0;

if (accommodationList) {
  accommodationList.innerHTML = rooms
    .map(
      (room) => `
        <article class="carousel-slide">
          <div class="slide-image" style="background-image: url('${room.image}')"></div>
          <div class="slide-content">
            <div class="room-meta">
              <h3>${room.name}</h3>
              <span class="price-tag">${room.price}</span>
            </div>
            <p>${room.description}</p>
            <div class="room-features">
              ${room.features.map((feature) => `<span>${feature}</span>`).join("")}
            </div>
            <a href="#contact" class="room-link">Book this stay →</a>
          </div>
        </article>
      `
    )
    .join("");

  const slides = document.querySelectorAll(".carousel-slide");

  function renderDots() {
    if (!carouselDots) return;

    carouselDots.innerHTML = rooms
      .map(
        (_, index) => `
          <button
            class="dot ${index === currentSlide ? "active" : ""}"
            type="button"
            aria-label="Go to room ${index + 1}"
            data-index="${index}"
          ></button>
        `
      )
      .join("");
  }

  function updateCarousel() {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(-${currentSlide * 100}%)`;
      slide.style.opacity = index === currentSlide ? "1" : "0";
    });

    renderDots();
  }

  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  prevBtn?.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + rooms.length) % rooms.length;
    updateCarousel();
  });

  nextBtn?.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % rooms.length;
    updateCarousel();
  });

  carouselDots?.addEventListener("click", (event) => {
    const target = event.target.closest(".dot");
    if (!target) return;

    currentSlide = Number(target.dataset.index);
    updateCarousel();
  });

  updateCarousel();
  setInterval(() => {
    currentSlide = (currentSlide + 1) % rooms.length;
    updateCarousel();
  }, 5000);
}

if (servicesList) {
  servicesList.innerHTML = services
    .map(
      (service) => `
        <article class="service-card">
          <div class="service-icon">${service.icon}</div>
          <h3>${service.title}</h3>
          <p>${service.text}</p>
        </article>
      `
    )
    .join("");
}

if (year) {
  year.textContent = new Date().getFullYear();
}

const socialRail = document.querySelector(".social-rail");
const contactSection = document.getElementById("contact");
const bookingFields = document.querySelectorAll(".booking-panel input, .booking-panel select");
const topbar = document.querySelector(".topbar");
const pageSections = document.querySelectorAll("main section, .site-footer");
let socialReturnTimer;
let navigationReturnTimer;

function hideSocialRailWhileEditing() {
  if (!socialRail) return;

  clearTimeout(socialReturnTimer);
  socialRail.classList.add("is-hidden");
}

function showSocialRailAfterEditing() {
  if (!socialRail) return;

  clearTimeout(socialReturnTimer);
  socialReturnTimer = setTimeout(() => {
    socialRail.classList.remove("is-hidden");
  }, 900);
}

bookingFields.forEach((field) => {
  field.addEventListener("focus", hideSocialRailWhileEditing);
  field.addEventListener("input", () => {
    hideSocialRailWhileEditing();
    showSocialRailAfterEditing();
  });
  field.addEventListener("change", showSocialRailAfterEditing);
  field.addEventListener("blur", showSocialRailAfterEditing);
});

if (socialRail && contactSection) {
  const contactObserver = new IntersectionObserver(
    ([entry]) => {
      socialRail.classList.toggle("is-hidden", entry.isIntersecting);
    },
    { threshold: 0.12 }
  );

  contactObserver.observe(contactSection);
}

if (topbar && pageSections.length) {
  function updateTopbarVisibility() {
    const footerVisible = contactSection?.getBoundingClientRect().top <= window.innerHeight;
    const readingLine = window.innerHeight * 0.55;
    const activeSection = [...document.querySelectorAll("main section")].some((section) => {
      const bounds = section.getBoundingClientRect();
      return bounds.top <= readingLine && bounds.bottom >= readingLine;
    });

    if (footerVisible) {
      topbar.classList.add("is-hidden");
      return;
    }

    if (activeSection) {
      topbar.classList.add("is-floating");
      topbar.classList.remove("is-hidden", "is-transitioning");
    } else if (window.scrollY > 120) {
      topbar.classList.add("is-hidden");
    } else {
      topbar.classList.remove("is-hidden", "is-floating");
    }
  }

  window.addEventListener("scroll", updateTopbarVisibility, { passive: true });
  window.addEventListener("resize", updateTopbarVisibility);
  updateTopbarVisibility();

  topbar.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      clearTimeout(navigationReturnTimer);
      topbar.classList.add("is-transitioning");
      navigationReturnTimer = setTimeout(() => {
        topbar.classList.remove("is-transitioning");
      }, 850);
    });
  });
}
