'use strict';

/////////////////////////////////
// SLIDER
const slider = function () {
  const slides = document.querySelectorAll('.section__feedback--slide');
  const dotContainer = document.querySelector('.dots');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  let curSlide = 0;
  const maxSlide = slides.length;

  /////////////////////////////////////////////////////////
  /////////////////////// Functions

  // go to slide
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Create dots (num of dots = num of slides)
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Active dot's color
  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach((d) => d.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add('dots__dot--active');
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  // Previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  // initial function
  const init = function () {
    goToSlide(0);
    createDots();
    activeDot(0);
  };

  init();

  /////////////////////////////////////////////////////////
  /////////////////////// Event handlers
  // click on arrows
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  // Click on dots
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activeDot(slide);
    }
  });

  // Press keys
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
};

slider();
//`<button class="dots__dot" data-slide="${i}"></button>`

// Display map
const map = L.map('map', {
  center: [21.0643489, 105.8284121],
  zoom: 17,
});

L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
}).addTo(map);

L.marker([21.0643489, 105.8284121]).addTo(map);

L.marker([21.0643489, 105.8284121])
  .addTo(map)
  .bindPopup(
    L.popup({
      maxWidth: 100,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
    })
  )
  .setPopupContent(
    'We are here: 145 Au Co street, Tay Ho district, Ha Noi city'
  )
  .openPopup();

// responsive navbar
const iconNav = document.querySelector('.nav__item--responsive');
const navLinks = document.querySelector('.nav__responsive--link');
iconNav.addEventListener('click', function (e) {
  e.preventDefault();
  navLinks.classList.toggle('hidden');
});
