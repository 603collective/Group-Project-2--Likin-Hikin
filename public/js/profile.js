const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#trail-name').value.trim();
  const description = document.querySelector('#trail-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/trails`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
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
  .querySelector('.trail-list')
  .addEventListener('click', delButtonHandler);
