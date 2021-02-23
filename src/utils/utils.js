function renderLoading(loading, submitButton) {
  if(loading) {
    submitButton.textContent = 'Сохранение...'
  } else {
    submitButton.textContent = 'Сохранить'
  }
}

export default renderLoading;
