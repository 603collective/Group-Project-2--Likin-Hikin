const newFormHandler = async (event) => {
  event.preventDefault();

  const trail_name = document.querySelector('#trail-name').value.trim();
  const description = document.querySelector('#trail-desc').value.trim();
  const state = document.querySelector('#States').value.trim();
  const length = document.querySelector('#miles').value.trim();
  const difficulty = document.querySelector('#trail-difficulty').value.trim();

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

document
  .querySelector('.new-trail-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('#delButton')
  .addEventListener('click', delButtonHandler);
