var $photoUrl = document.querySelector('#photo-url');
var $img = document.querySelector('img');

$photoUrl.addEventListener('input', newPhoto);

function newPhoto(event) {
  var newImg = document.querySelector('#photo-url').value;
  $img.setAttribute('src', newImg);
}

var $codeJournal = document.querySelector('#code-journal');
var defImage = 'images/placeholder-image-square.jpg';

$codeJournal.addEventListener('submit', logValues);

var valueObject = {};
function logValues(event) {

  event.preventDefault();
  valueObject.title = $codeJournal.elements.title.value;
  valueObject.photo_url = $codeJournal.elements.photo_url.value;
  valueObject.notes = $codeJournal.elements.notes.value;
  valueObject.nextEntryId = data.nextEntryId;
  data.nextEntryId++;
  $img.setAttribute('src', defImage);
  $codeJournal.reset();
}

window.addEventListener('beforeunload', beforeUnload);

function beforeUnload(event) {
  var stringify = JSON.stringify(valueObject);
  localStorage.setItem('storage', stringify);
}
