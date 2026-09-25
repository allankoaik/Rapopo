const rooms = [
  {
    name: "Ocean Suite",
    price: "$420 / night",
    description:
      "A bright, airy suite with floor-to-ceiling views, a soaking tub, and a private balcony facing the bay.",
    features: ["Sea view", "King bed", "Private bath"],
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Garden Retreat",
    price: "$310 / night",
    description:
      "Soft textures, warm wood finishes, and lush courtyard views create a quiet and restorative escape.",
    features: ["Garden view", "Breakfast included", "Rain shower"],
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Family Loft",
    price: "$360 / night",
    description:
      "Spacious and welcoming, with extra sleeping space, modern comforts, and a lounge area for slow evenings.",
    features: ["2 bedrooms", "Coffee bar", "City access"],
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Coastal Studio",
    price: "$280 / night",
    description:
      "A refined hideaway with natural textures, a reading nook, and sunlit windows overlooking the coastline.",
    features: ["Ocean deck", "Queen bed", "Smart TV"],
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
];

const services = [
  {
    icon: "✈️",
    title: "Airport Transfer",
    text: "Easy, comfortable rides to and from the airport with flexible timing for early arrivals and late departures.",
  },
  {
    icon: "📶",
    title: "Free Wi-Fi",
    text: "Stay connected throughout the property with reliable high-speed internet in rooms and shared spaces.",
  },
  {
    icon: "🛎️",
    title: "Concierge Service",
    text: "From reservation help to local recommendations, our team makes every detail feel effortless.",
  },
  {
    icon: "🥐",
    title: "Breakfast Buffet",
    text: "Start each morning with fresh pastries, tropical fruit, local favourites, and a calm seaside setting.",
  },
  {
    icon: "🧼",
    title: "Daily Housekeeping",
    text: "We refresh your room every day so you can settle in and truly relax without any extra effort.",
  },
  {
    icon: "🚗",
    title: "Parking Access",
    text: "Safe, convenient parking is available for guests arriving by car, with smooth check-in assistance.",
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
