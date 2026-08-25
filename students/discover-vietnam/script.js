const tripButtons = document.querySelectorAll('.trip-button');
const travelList = document.getElementById('travel-list-items');
const emptyMessage = document.getElementById('empty-message');
const addedDestinations = new Set();

tripButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.destination-card');
    const name = card.dataset.name;
    const location = card.dataset.location;

    if (addedDestinations.has(name)) {
      return;
    }

    addedDestinations.add(name);
    emptyMessage.hidden = true;

    const listItem = document.createElement('li');
    listItem.className = 'travel-item';

    const number = document.createElement('span');
    number.className = 'travel-number';
    number.textContent = addedDestinations.size;

    const info = document.createElement('div');
    info.className = 'travel-item-info';

    const destinationName = document.createElement('strong');
    destinationName.textContent = name;

    const destinationLocation = document.createElement('span');
    destinationLocation.textContent = location;

    info.append(destinationName, destinationLocation);
    listItem.append(number, info);
    travelList.appendChild(listItem);

    button.textContent = 'Added ♥';
    button.classList.add('is-added');
    button.setAttribute('aria-pressed', 'true');
  });
});
