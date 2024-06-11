const targetDate = "2024-06-23T08:00:00";

document.addEventListener("DOMContentLoaded", () => {
  function calculateTimeLeft() {
    const now = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
    const difference = targetTime - now;

    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      timeLeft.hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      timeLeft.minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      timeLeft.seconds = Math.floor((difference % (1000 * 60)) / 1000);
    }

    document.getElementById("days").textContent = timeLeft.days;
    document.getElementById("hours").textContent = timeLeft.hours;
    document.getElementById("minutes").textContent = timeLeft.minutes;
    document.getElementById("seconds").textContent = timeLeft.seconds;
  }
  setInterval(calculateTimeLeft, 1000);
  calculateTimeLeft();
});

const images = Array.from({ length: 23 }, (_, i) => `/src/img/${i + 1}.jpg`);

const mainSwiperWrapper = document.querySelector("#thumb");
const thumbSwiperWrapper = document.querySelector("#main");

images.forEach((src, index) => {
  const mainSlide = document.createElement("div");
  mainSlide.className = "swiper-slide";
  mainSlide.innerHTML = `<img src="${src}" class="object-cover w-full h-full" alt="Slide ${
    index + 1
  }" />`;

  const thumbSlide = document.createElement("div");
  thumbSlide.className = "swiper-slide";
  thumbSlide.innerHTML = `<img src="${src}" class="object-cover w-full h-full" alt="Thumbnail ${
    index + 1
  }" />`;

  mainSwiperWrapper.appendChild(mainSlide);
  thumbSwiperWrapper.appendChild(thumbSlide);
});

const swiper1 = new Swiper(".mySwiper", {
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  speed: 2000,
  loop: true,
});

var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 20,
  slidesPerView: 4,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  speed: 2000,
  loop: true,
});

var swiper3 = new Swiper(".mySwiper3", {
  slidesPerView: 1,
  direction: "vertical",
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  speed: 2000,
  loop: true,
});

var thumbsSwiper = new Swiper(".thumb-swiper", {
  spaceBetween: 10,
  slidesPerView: 1,
  speed: 2000,

  loop: true,
  watchSlidesProgress: true,
});

const mainSwiper = new Swiper(".main-swiper", {
  spaceBetween: 10,
  slidesPerView: 5,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  speed: 2000,
  thumbs: {
    swiper: thumbsSwiper,
  },
});

const fetchData = async () => {
  const response = await fetch("/comment.json");
  const data = await response.json();
  return data;
};

let data = await fetchData();
console.log(data.comments);

const ucapanDoa = document.querySelector("#ucapanDoa");

ucapanDoa.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(ucapanDoa);
  const name = formData.get("name");
  const comment = formData.get("comment");

  const response = await fetch("/comment.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      comment,
    }),
  });
});

const welcome = document.getElementById("welcome");
const openButton = document.getElementById("openUndangan");
const musik = document.getElementById("musik");
const musikWrapper = document.getElementById("musikWrapper");

function toggleMusik() {
  if (musik.paused) {
    musik.play();
    musikWrapper.classList.add("animate-spin");
  } else {
    musik.pause();
    musikWrapper.classList.remove("animate-spin");
  }
}

musikWrapper.addEventListener("click", toggleMusik);

window.addEventListener("load", () => {
  document.body.style.overflow = "hidden";
});

openButton.addEventListener("click", () => {
  welcome.classList.add("top-[-120%]");
  welcome.classList.remove("top-0");
  welcome.classList.add("transition-all");
  welcome.classList.add("duration-[2s]");
  welcome.classList.add("ease-in-out");
  musik.play();
  musikWrapper.classList.add("animate-spin");
  document.body.style.overflow = "auto";
});

window.addEventListener("load", (e) => {
  const rsvp = document.getElementById("rsvp");

  rsvp.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    const data = new FormData(rsvp);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwk1VXaCoG3LycTRIKKB58kdQkLIUofPLHWo-nGotw_Fn1obaqdo4JJp0G55-fToRDP/exec",
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        alert("Terima Kasih!"); // Show thank you message
      } else {
        alert("Ada masalah dengan pengiriman data."); // Show error message if the request failed
      }
    } catch (error) {
      console.error("Error:", error); // Log any errors to the console
      alert("Ada masalah dengan pengiriman data."); // Show error message if there was an exception
    }
  });
});
