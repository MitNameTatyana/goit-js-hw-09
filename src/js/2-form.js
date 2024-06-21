const LS_Key = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

const formData = {
  email: '',
  message: '',
};

form.addEventListener('input', evt => {
  formData.email = form.elements.email.value.trim();
  formData.message = form.elements.message.value.trim();

  saveToLS(LS_Key, formData);
});

window.addEventListener('DOMContentLoaded', evt => {
  const formData = loadFromLS(LS_Key);
  form.elements.email.value = formData?.email ?? '';
  form.elements.message.value = formData?.message ?? '';
});

form.addEventListener('submit', evt => {
  evt.preventDefault();
  formData.email = form.elements.email.value;
  formData.message = form.elements.message.value;

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
  } else {
    console.log(formData);
    localStorage.removeItem(LS_Key);
    form.reset();
  }
});

function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromLS(key) {
  const json = localStorage.getItem(key);
  try {
    const formData = JSON.parse(json);
    return formData;
  } catch (error) {
    return json;
  }
}
