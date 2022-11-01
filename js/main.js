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

function logValues(event) {
  var valueObject = {};

  event.preventDefault();
  valueObject.title = $codeJournal.elements.title.value;
  valueObject.photo_url = $codeJournal.elements.photo_url.value;
  valueObject.notes = $codeJournal.elements.notes.value;
  valueObject.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(valueObject);
  $img.setAttribute('src', defImage);
  $codeJournal.reset();
}
