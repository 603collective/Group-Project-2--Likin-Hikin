const newFormHandler = async (event) => {
  event.preventDefault();

  const trail_name = document.querySelector('#trail-name').value.trim();
  const description = document.querySelector('#trail-desc').value.trim();
  const state = document.querySelector('#States').value.trim();
  const length = document.querySelector('#miles').value.trim();
  const difficulty = document.querySelector('#trail-difficulty').value.trim();
  const searchState = document.querySelector('#stateBtn').value.trim();
  const searchDif = document.querySelector('#trail-difficulty-search').value.trim();

  if (trail_name && description) {
    const response = await fetch(`/api/trails`, {
      method: 'POST',
      body: JSON.stringify({ trail_name, description, state, length, difficulty }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create trail');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/trails/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete trail');
    }
  }
};
//search state button ******In progress******** (Chris)
const searchBtnHandlerState = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/trails/${id}`, {
      method: 'GET',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('No trails in that state');
    }
  }
};

//Search button by Difficulty ******In Progress******* (Chris)
const searchBtnHandlerDif = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/trails/${id}`, {
      method: 'GET',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('No trails with that Difficulty');
    }
  }
};

document
  .querySelector('.new-trail-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.trails-list')
  .addEventListener('click', delButtonHandler);
//search button applying handlers
  
  searchState.addEventListener('click', searchBtnHandlerState);

  
  searchDif.addEventListener('click', searchBtnHandlerDif);

