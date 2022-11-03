var $photoUrl = document.querySelector('#photo-url');
var $img = document.querySelector('img');

$photoUrl.addEventListener('input', newPhoto);

function newPhoto(event) {
  var newImg = document.querySelector('#photo-url').value;
  $img.setAttribute('src', newImg);
}

var $codeJournal = document.querySelector('#code-journal');
var defImage = 'images/placeholder-image-square.jpg';
var $entriesRow = document.querySelector('.entries-row');

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
  var newEntry = renderEntry(valueObject);
  $entriesRow.prepend(newEntry);
  $entryForm.className = 'view container hidden';
  $domContainer.className = 'view container';
}

function renderEntry(valueObject) {
  var createDivRow = document.createElement('div');
  createDivRow.setAttribute('class', 'row');
  createDivRow.setAttribute('data-entry-id', valueObject.entryId);
  var createDivHalf = document.createElement('div');
  createDivHalf.setAttribute('class', 'column-half');
  createDivRow.appendChild(createDivHalf);
  var createImg = document.createElement('img');
  createImg.setAttribute('src', valueObject.photo_url);
  createDivHalf.appendChild(createImg);
  var newDivHalf = document.createElement('div');
  newDivHalf.setAttribute('class', 'column-half pen');
  createDivRow.appendChild(newDivHalf);
  var createUL = document.createElement('ul');
  newDivHalf.appendChild(createUL);
  var createLi = document.createElement('li');
  createUL.appendChild(createLi);
  var createH3 = document.createElement('h3');
  createH3.textContent = valueObject.title;
  createLi.appendChild(createH3);
  var createPen = document.createElement('i');
  createPen.setAttribute('class', 'fa-solid fa-pen');
  createPen.setAttribute('data-view', 'edit-entry');
  createH3.appendChild(createPen);
  var createP = document.createElement('p');
  createP.textContent = valueObject.notes;
  createLi.appendChild(createP);
  return createDivRow;
}

var $domContainer = document.querySelector('#dom');
var $entryForm = document.querySelector('#entry-form');
var $editEntry = document.querySelector('#edit-entry');

document.addEventListener('DOMContentLoaded', function (e) {
  for (var i = 0; i < data.entries.length; i++) {
    var returnValue = renderEntry(data.entries[i]);
    $domContainer.appendChild(returnValue);
  }
  if (data.view === 'entry-form') {
    $entryForm.className = 'view container';
    $domContainer.className = 'view container hidden';
    $editEntry.className = 'view container hidden';
  } else if (data.view === 'entries') {
    $entryForm.className = 'view container hidden';
    $domContainer.className = 'view container';
    $editEntry.className = 'view container hidden';
  } else if (data.view === 'edit-entry') {
    $entryForm.className = 'view container hidden';
    $domContainer.className = 'view container hidden';
    $editEntry.className = 'view container';
  }
});

var $tabContainer = document.querySelector('.header');
var $newA = document.querySelector('.new');

$tabContainer.addEventListener('click', switchView);
$newA.addEventListener('click', switchView);
$domContainer.addEventListener('click', switchView);

function switchView(event) {
  var dataView = event.target.getAttribute('data-view');
  var $viewDiv = document.querySelectorAll('.view');
  for (var j = 0; j < $viewDiv.length; j++) {
    if ($viewDiv[j].getAttribute('data-view') === dataView) {
      $viewDiv[j].className = 'view container';
    } else {
      $viewDiv[j].className = 'view container hidden';
    }
  }
  data.view = dataView;
}
