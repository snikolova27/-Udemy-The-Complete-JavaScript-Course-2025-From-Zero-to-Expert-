'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

// ===== LECTURES ====

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

setTimeout(() => h1.removeEventListener('mouseenter', alert1), 3000);

// Old-school way
// h1.onmouseenter = alertH1
