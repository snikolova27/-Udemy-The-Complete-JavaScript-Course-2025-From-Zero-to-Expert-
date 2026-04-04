'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; //[lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  // click() {
  //   this.clicks++;
  // }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
  _setDescription() {
    this.description = `Running on ${this.date.getDate()} ${months[this.date.getMonth()]}`;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevation) {
    super(coords, distance, duration);
    this.elevation = elevation;
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }

  _setDescription() {
    this.description = `Cycling on ${this.date.getDate()} ${months[this.date.getMonth()]}`;
  }
}

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Overview buttons
const overviewButtonsContainer = document.querySelector('.overview__container');
const deleteAllBtn = document.querySelector('#delete-all-workouts-btn');
const sortBtn = document.querySelector('#sort-workouts-btn');

// Delete all workouts modal
const deleteAllModal = document.querySelector('#delete-all-workouts-modal');
const closeModalBtn = document.querySelector(
  '#delete-all-workouts-modal-close',
);
const cancelModalBtn = document.querySelector('#modal-cancel-btn');
const confirmModalBtn = document.querySelector('#modal-confirm-btn');

// Workout buttons
const deleteWorkoutButton = document.querySelector('.delete__btn');
const editWorkoutButton = document.querySelector('.edit__btn');

// Delete single workout modal
const deleteWorkoutModal = document.querySelector('#delete-workout-modal');
const closeWorkoutModalBtn = document.querySelector(
  '#delete-workout-modal-close',
);
const cancelWorkoutModalBtn = document.querySelector(
  '#workout-modal-cancel-btn',
);
const confirmWorkoutModalBtn = document.querySelector(
  '#workout-modal-confirm-btn',
);

// Success toast for adding a workout
const successToast = document.querySelector('#success-toast');
const successToastCloseBtn = document.querySelector('#success-toast-close-btn');

// Success toast for deleting a workout
const successDeletionToast = document.querySelector('#deletion-toast');
const successDeletionToastCloseBtn = document.querySelector(
  '#deletion-toast-close-btn',
);

// All deleted toast
const allDeletedToast = document.querySelector('#all-deleted-toast');
const allDeletedToastCloseBtn = document.querySelector(
  '#all-deleted-toast-close-btn',
);

// Input error toast
const inputErrorToast = document.querySelector('#input-error-toast');
const inputErrorToastCloseBtn = document.querySelector(
  '#input-error-toast-close-btn',
);

class App {
  #mapZoomLevel = 10;
  #map;
  #mapEvent;
  #workouts = [];
  #localStorageKey = 'workouts';
  #areSortedByDistance = false;
  #markers = {};

  constructor() {
    this._getPosition();
    this.#loadFromLocalStorage();

    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);

    containerWorkouts.addEventListener(
      'click',
      this.#handleClickOnWorkout.bind(this),
    );

    // Overview buttons
    deleteAllBtn.addEventListener('click', this.#handleDeleteAll.bind(this));
    sortBtn.addEventListener('click', this.#sortWorkouts.bind(this));

    // Delete all workouts modal buttons
    closeModalBtn.addEventListener('click', this.#closeDeleteAllModal);
    cancelModalBtn.addEventListener('click', this.#closeDeleteAllModal);
    confirmModalBtn.addEventListener(
      'click',
      this.#deleteAllWorkoutsConfirmHandler.bind(this),
    );

    // Delete workout modal buttons
    closeWorkoutModalBtn.addEventListener(
      'click',
      this.#closeDeleteWorkoutModal,
    );
    cancelWorkoutModalBtn.addEventListener(
      'click',
      this.#closeDeleteWorkoutModal,
    );
    confirmWorkoutModalBtn.addEventListener(
      'click',
      this.#handleConfirmDeleteWorkout.bind(this),
    );

    // Toasts
    successToastCloseBtn.addEventListener('click', this.#closeSuccessToast);

    successDeletionToastCloseBtn.addEventListener(
      'click',
      this.#closeSuccessToast,
    );
    allDeletedToastCloseBtn.addEventListener(
      'click',
      this.#closeAllDeletedToast,
    );

    inputErrorToastCloseBtn.addEventListener(
      'click',
      this.#closeInputErrorToast,
    );
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position. :(');
        },
      );
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(w => this._renderWorkoutMarker(w));
  }

  #handleClickOnWorkout(event) {
    const workoutEl = event.target.closest('.workout');
    if (!workoutEl) {
      return;
    }

    const workout = this.#workouts.find(w => w.id === workoutEl.dataset.id);

    // If we have clicked on a button
    const targetClassList = event.target.classList.value;
    if (targetClassList.includes('workout__button')) {
      if (targetClassList.includes('delete__btn')) {
        this._handleDeleteWorkoutButton(workout);
      } else if (targetClassList.includes('edit__btn')) {
        console.log('edit');
        
      }
    }
    // Move to popup otherwise
    else {
      this._moveToPopup(workout);
    }
  }
  _moveToPopup(workout) {
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });

    //workout.click();
  }
  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    this._clearAllInputs();
    form.style.display = 'none';
    form.classList.add('hidden');

    // Doing this to avoid animation
    setTimeout(() => {
      form.style.display = 'grid';
    }, 1000);
  }

  #showOverviewButtons() {
    overviewButtonsContainer.classList.remove('hidden');
  }

  #hideOverviewButtons() {
    overviewButtonsContainer.classList.add('hidden');
  }

  #closeDeleteAllModal() {
    deleteAllModal.classList.add('hidden');
  }

  #deleteAllWorkoutsConfirmHandler() {
    this.#closeDeleteAllModal();
    this.#showAllDeletedToast();

    setTimeout(() => {
      this.reset();
    }, 2000);
  }

  #handleDeleteAll() {
    deleteAllModal.classList.remove('hidden');
  }

  #sortWorkouts() {
    this.#renderWorkouts(!this.#areSortedByDistance);
    this.#areSortedByDistance = !this.#areSortedByDistance;
  }
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _clearAllInputs() {
    inputCadence.value =
      inputDistance.value =
      inputDuration.value =
      inputElevation.value =
        '';
  }

  #handleInvalidInput() {
    this._clearAllInputs();
    this.#showInputErrorToast();

    setTimeout(() => {
      this.#closeInputErrorToast();
    }, 5000);
  }

  _newWorkout(e) {
    e.preventDefault();

    const isInputValid = (...inputs) =>
      inputs.every(input => Number.isFinite(input));

    const areAllPositive = (...inputs) => inputs.every(input => input > 0);

    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    if (type === 'running') {
      const cadence = +inputCadence.value;
      if (
        !isInputValid(distance, duration, cadence) ||
        !areAllPositive(distance, duration, cadence)
      ) {
        this.#handleInvalidInput();
        return;
      }

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !isInputValid(distance, duration, elevation) ||
        !areAllPositive(distance, duration)
      ) {
        this.#handleInvalidInput();
        return;
      }

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add workout
    this.#workouts.push(workout);

    this._renderWorkoutMarker(workout);
    this._renderWorkout(workout);
    this.#showSuccessToast();
    this._clearAllInputs();
    this._hideForm();
    this.#saveIntoLocalStorage();
    this.#showOverviewButtons();
  }

  _renderWorkoutMarker(workout) {
    const marker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          autoClose: false,
          closeOnClick: false,
          maxWidth: 250,
          maxHeight: 100,
          className: `${workout.type}-popup`,
        }),
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃' : '🚴‍♀️'} ${workout.description}`,
      )
      .openPopup();

    this.#markers[workout.id] = marker;
  }

  _renderWorkout(workout) {
    let html = `
        <li class="workout workout--${workout.type}" data-id=${workout.id}>
               <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__details">
                  <span class="workout__icon">${workout.type === 'running' ? '🏃' : '🚴‍♀️'}</span>
                  <span class="workout__value">${workout.distance}</span>
                  <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                  <span class="workout__icon">⏱</span>
                  <span class="workout__value">${workout.duration}</span>
                  <span class="workout__unit">min</span>
                </div>`;

    if (workout.type === 'running') {
      html += ` <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>`;
    }

    if (workout.type === 'cycling') {
      html += ` <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevation}</span>
            <span class="workout__unit">m</span>
          </div>`;
    }

    html += `
    <div class="workout__details ">
    <button class="edit__btn workout__button" id>📝 Edit</button>
    </div>
    <div class="workout__details">
    <button class="delete__btn workout__button">🗑️ Delete</button>
    </div>`;

    html += `</li>`;

    form.insertAdjacentHTML('afterend', html);
  }

  #renderWorkouts(sort = false) {
    // Empty entire workout container
    containerWorkouts.innerHTML = '';
    containerWorkouts.appendChild(form);

    const sorted = sort
      ? this.#workouts
          .slice()
          .sort((a, b) =>
            !this.#areSortedByDistance
              ? a.distance - b.distance
              : (b.distance = a.distance),
          )
      : this.#workouts;

    sorted.forEach(w => {
      this._renderWorkout(w);
    });

    if (this.#workouts.length > 0) {
      this.#showOverviewButtons();
    } else {
      this.#hideOverviewButtons();
    }
  }

  #saveIntoLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.#workouts));
  }

  #loadFromLocalStorage() {
    const dataFromLocalStorage = JSON.parse(
      localStorage.getItem(this.#localStorageKey),
    );
    if (!dataFromLocalStorage) return;

    // We are losing the prototype chain, meaning we will not have the click function anymore`
    this.#workouts = dataFromLocalStorage;
    this.#renderWorkouts();
  }

  reset() {
    localStorage.removeItem(this.#localStorageKey);
    location.reload();
  }

  #openDeleteWorkoutModal(workoutId) {
    deleteWorkoutModal.dataset.workoutId = workoutId;
    deleteWorkoutModal.classList.remove('hidden');
  }

  #closeDeleteWorkoutModal() {
    delete deleteWorkoutModal.dataset.workoutId;
    deleteWorkoutModal.classList.add('hidden');
  }

  _handleDeleteWorkoutButton(workout) {
    this.#openDeleteWorkoutModal(workout.id);
  }

  #handleConfirmDeleteWorkout(event) {
    const workoutId = event.target.closest('#delete-workout-modal').dataset
      .workoutId;
    this.#deleteWorkout(workoutId);
    this.#closeDeleteWorkoutModal();
  }

  #deleteWorkout(workoutId) {
    // Delete from workouts
    this.#workouts = this.#workouts.filter(w => w.id !== workoutId);

    // Update rendered workouts
    this.#renderWorkouts();

    // Remove pin from map
    this.#markers[workoutId].remove();
    delete this.#markers[workoutId];

    // Show toast
    this.#showSuccessDeletionToast();

    // Remove from local storage
    this.#saveIntoLocalStorage();
  }

  #showSuccessToast() {
    successToast.classList.remove('hidden');
    setTimeout(() => {
      this.#closeSuccessToast();
    }, 3000);
  }
  #closeSuccessToast() {
    successToast.classList.add('hidden');
  }

  #showSuccessDeletionToast() {
    successDeletionToast.classList.remove('hidden');
    setTimeout(() => {
      this.#closeSuccessDeletionToast();
    }, 3000);
  }
  #closeSuccessDeletionToast() {
    successDeletionToast.classList.add('hidden');
  }

  #showAllDeletedToast() {
    allDeletedToast.classList.remove('hidden');
    setTimeout(() => {
      this.#closeAllDeletedToast();
    }, 3000);
  }
  #closeAllDeletedToast() {
    allDeletedToast.classList.add('hidden');
  }

  #showInputErrorToast() {
    inputErrorToast.classList.remove('hidden');
  }
  #closeInputErrorToast() {
    inputErrorToast.classList.add('hidden');
  }
}

const app = new App();
