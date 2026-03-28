'use strict';
// Elements

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

const allSections = document.querySelectorAll('.section');

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const buttonLeftSlider = document.querySelector('.slider__btn--left');
const buttonRightSlider = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

///////////////////////////////////////
// Modal window
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(button => button.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', e => {
  const section1Coordinates = section1.getBoundingClientRect();

  // Scrolling

  /*
  window.scrollTo(
    section1Coordinates.left + window.pageXOffset,
    section1Coordinates.top + window.pageYOffset,
  );
  */

  // With animation
  /*
  window.scrollTo({
    left: section1Coordinates.left + window.pageXOffset,
    top: section1Coordinates.top + window.pageYOffset,
    behavior: 'smooth',
  });
  */

  // Modern way of scrolling
  section1.scrollIntoView({ behavior: 'smooth' });

  /*
  console.log(e.target.getBoundingClientRect());

  console.log(
    'Current scroll position ',
    window.pageXOffset,
    window.pageYOffset,
  );

  console.log(
    'height/width viewport ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth,
  );
  */
});

///////////////////////////////
// Page navigation using event delegation
// 1. Add event listener to common parent element
// 2. Determine where event originated from
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Single event handler to multiple elements
/*
document.querySelectorAll('.nav__link').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    // This will not work if we used an arrow function for the callback
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

///////////////////////////////
//Tabbed component

// using event delegation again
tabsContainer.addEventListener('click', e => {
  e.preventDefault();
  // There are spans in the buttons, we only want to work with the buttons
  const clicked = e.target.closest('.operations__tab');

  // Clicking in between buttons
  if (!clicked) return;

  // Remove currently active
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => {
    c.classList.remove('operations__content--active');
  });

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  const contentArea = clicked.getAttribute('data-tab'); // could also use clicked.dataset.tab
  document
    .querySelector(`.operations__content--${contentArea}`)
    .classList.add('operations__content--active');
});

// =======================
// Menu fade animation
const handleHover = function (event, opacity) {
  //console.log(this, event.currentTarget);
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    // Each link is wrapped in nav__item, we need 2 levels of parents up
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(s => {
      if (s !== link) {
        s.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};

const handleHoverWithBind = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    // Each link is wrapped in nav__item, we need 2 levels of parents up
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(s => {
      if (s !== link) {
        s.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

// mouseenter DOES NOT bubble and we need a bubbling one so we use mouseover
// Option 1
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// mouseout is the opposite of mouseover
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });

// Option 2
// Passing "argument" into handler
nav.addEventListener('mouseover', handleHoverWithBind.bind(0.5));
nav.addEventListener('mouseout', handleHoverWithBind.bind(1));

// =======================
// Sticky navigation
const section1Coordinates = section1.getBoundingClientRect();

/*
// Bad for performance - scroll event fires too often
window.addEventListener('scroll', function () {
  console.log(window.scrollY);

  if (window.scrollY > section1Coordinates.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/

// ==== Intersection Observer API ====
// Will be called each time the observed element is intersecting the root element
// at the threshold that is defined
const observerHandler = function (thresholdEntries, observer) {
  thresholdEntries.forEach(entry => {
    console.log(entry);
  });
};

const observerOptions = {
  root: null,
  // threshold: 0.1,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(observerHandler, observerOptions);
observer.observe(section1);

const stickyNav = entries => {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // 90 pixels = the height of the navigation
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// ==== Slide in sections ===
const revealSection = (entries, observer) => {
  // We need the for each loop so that when we are between sections
  // and we refresh, the section below is still visible after the page reloads
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    // Stop observing as we have already shown the section
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// ===== Lazy loading images =====
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// ===== Slider component =====
const sliderComponent = () => {
  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`,
      );
    });
  };

  const activateDot = slide => {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  let currentSlide = 0;
  const maxSlide = slides.length;

  const goToSlide = slide => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`),
    );
    activateDot(slide);
  };

  const nextSlide = () => {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
  };

  const previousSlide = () => {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
  };

  const initSlider = () => {
    createDots();
    goToSlide(0);
  };
  initSlider();

  buttonRightSlider.addEventListener('click', nextSlide);
  buttonLeftSlider.addEventListener('click', previousSlide);
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
      previousSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  dotContainer.addEventListener('click', event => {
    if (event.target.classList.contains('dots__dot')) {
      currentSlide = Number(event.target.dataset.slide);
      goToSlide(currentSlide);
    }
  });
};

sliderComponent();

document.addEventListener('DOMContentLoaded', e => {
  console.log('HTML parsed and DOM tree built!', e);
});

window.addEventListener('load', e => {
  console.log('Page fully loaded', e);
});

// Add pop up to ask user if they really want to leave the page
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});


//
// ============================
// ============================
// ============================
// ===== LECTURES ====

/*
// === SELECTING ====
// Selecting the whole document
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log({ allSections }); //NodeList

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // returns an html collection, if the DOM changes, this changes automatically

document.getElementsByClassName('btn'); // returns a live HTML collection

// === CREATING AND INSERTING ELEMENTS ====
// insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use Cookies for improved functionality and analytics';
message.innerHTML = `
We use Cookies for improved functionality and analytics
<button class = 'btn btn--close-cookie'>Got it </button>
`;
// Element appears only once - we move it with append to the bottom of the header element. The DOM element is unique and cannot exist in more than once place at a time
header.prepend(message);
header.append(message);

// header.append(message.cloneNode(true))

header.before(message);
header.after(message);

// Delete element
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove(); // this is relatively new
  //message.parentElement.removeChild(message)
});

// === STYLES ===
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// We cannot get a style that is hidden inside of a class
// only styles we have defined inline ourselves
console.log(message.style.height); // nothing
console.log(message.style.backgroundColor); // rgb(55,56,61)

// Get all style properties
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// == ATTRIBUTES ===
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
// absolute src
console.log(logo.src);
// get the relative src
console.log(logo.getAttribute('src'));
console.log(logo.className);

logo.alt = 'Beautiful logo';
logo.setAttribute('designer', 'Jonas');

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));

const link = document.querySelector('.nav__link--btn');
// Absolute link
console.log(link.href);
// Link as written in the HTML, e.g #
console.log(link.getAttribute('href'));

// == DATA ATTRIBUTES ===
console.log(logo.dataset.versionNumber);

// === CLASSES ===
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// Do NOT use the below
// logo.className = 'jonas'

// === EVENTS ===
const h1 = document.querySelector('h1');

const alertH1 = e => {
  alert('addEventListener: Great! You are reading the heading');
  h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// Old-school way
// h1.onmouseenter = alertH1

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log('ello');
  console.log(this);
  this.style.backgroundColor = randomColor();
  console.log('LINK'.e.target, e.currentTarget);

  // Stop event propagation
  // e.stopPropagation()
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER'.e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV'.e.target, e.currentTarget);
  },
  // listen to capturing events
  //true,
);


// === DOM TRAVERSAL ===

const h1 = document.querySelector('h1')

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'))
// Direct children
console.log(h1.childNodes)
console.log(h1.children) // HTML collection, updates live
console.log(h1.firstChild)
console.log(h1.firstElementChild)
h1.firstElementChild.style.color = 'white'
h1.lastElementChild.style.color = 'orangered'

// Going upwards: parents
console.log(h1.parentNode)
console.log(h1.parentElement) // we are usually interested in this

// Selecting the closest parent element with a specific class
// Accepts same arguments as querySelector, e.g. class name, id
h1.closest('.header').style.background = 'var(--gradient-secondary)'

// if the closest matching element is the one we ar invoking this on, that element is returned
h1.closest('h1').style.background = 'var(--gradient-primary)'
// We can think of the closest method as the opposite of the querySelector methods 
// as it searches for parents and not children


// Selecting sideways: siblings
console.log(h1.previousElementSibling)
console.log(h1.nextElementSibling)

// Get all the siblings
console.log(h1.parentElement.children)
const siblings = [...h1.parentElement.children]
siblings.forEach((sib) => {
  if (sib !== h1){
    sib.style.transform = 'scale(0.5)'
  }
})
*/
