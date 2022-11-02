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

function renderEntry(valueObject) {
  var createDivRow = document.createElement('div');
  createDivRow.setAttribute('class', 'row');
  var createDivHalf = document.createElement('div');
  createDivHalf.setAttribute('class', 'column-half');
  createDivRow.appendChild(createDivHalf);
  var createImg = document.createElement('img');
  createImg.setAttribute('src', valueObject.photo_url);
  createDivHalf.appendChild(createImg);
  var newDivHalf = document.createElement('div');
  newDivHalf.setAttribute('class', 'column-half');
  createDivRow.appendChild(newDivHalf);
  var createUL = document.createElement('ul');
  newDivHalf.appendChild(createUL);
  var createLi = document.createElement('li');
  createUL.appendChild(createLi);
  var createH3 = document.createElement('h3');
  createH3.textContent = valueObject.title;
  createLi.appendChild(createH3);
  var createP = document.createElement('p');
  createP.textContent = valueObject.notes;
  createLi.appendChild(createP);
  return createDivRow;
}

var $domContainer = document.querySelector('.dom');

document.addEventListener('DOMContentLoaded', function (e) {
  for (var i = 0; i < data.entries.length; i++) {
    var returnValue = renderEntry(data.entries[i]);
    $domContainer.appendChild(returnValue);
  }
});
