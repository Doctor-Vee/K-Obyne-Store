function openClose(detailsId) {
  const more = document.getElementById(detailsId);
  console.log(detailsId);
  if (more.style.display === 'block') {
    more.style.display = 'none';
  } else {
    more.style.display = 'block';
  }
}

function deleteData(id) {
  const url = '/delete/' + id;
  if (confirm('Are you sure about this?')) {
    return fetch(url, {
      method: 'delete'
    })
      .then(response => {
        response.json();
        window.location.href = '/viewall';
      })
      .catch(error => console.error('Error:', error));
      }
}