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
var $editEntry = document.getElementsByClassName('editEntry');
$codeJournal.addEventListener('submit', logValues);

function logValues(event) {
  var valueObject = {};

  event.preventDefault();
  valueObject.title = $codeJournal.elements.title.value;
  valueObject.photo_url = $codeJournal.elements.photo_url.value;
  valueObject.notes = $codeJournal.elements.notes.value;
  if (data.editing === null) {
    valueObject.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(valueObject);
    var newEntry = renderEntry(valueObject);
    $entriesRow.prepend(newEntry);
  } else {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        valueObject.entryId = data.editing.entryId;
        data.entries[i] = valueObject;
        var editEntry = renderEntry(valueObject);
        $editEntry[i].replaceWith(editEntry);
      }
    }
  }

  $img.setAttribute('src', defImage);
  $codeJournal.reset();
  $entryForm.className = 'view container hidden';
  $domContainer.className = 'view container';
}

function renderEntry(valueObject) {
  var createDivRow = document.createElement('div');
  createDivRow.setAttribute('class', 'row editEntry');
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
  createPen.setAttribute('data-view', 'entry-form');
  createPen.setAttribute('data-entry-id', valueObject.entryId);
  createPen.setAttribute('id', 'edit-pen');
  createH3.appendChild(createPen);
  var createP = document.createElement('p');
  createP.textContent = valueObject.notes;
  createLi.appendChild(createP);
  return createDivRow;
}

var $domContainer = document.querySelector('#dom');
var $entryForm = document.querySelector('#entry-form');

document.addEventListener('DOMContentLoaded', function (e) {
  for (var i = 0; i < data.entries.length; i++) {
    var returnValue = renderEntry(data.entries[i]);
    $domContainer.appendChild(returnValue);
  }
  if (data.view === 'entry-form') {
    $entryForm.className = 'view container';
    $domContainer.className = 'view container hidden';

  } else if (data.view === 'entries') {
    $entryForm.className = 'view container hidden';
    $domContainer.className = 'view container';
  }
});

var $headerContainer = document.querySelector('.header');
var $newA = document.querySelector('.new');
var $entryHeader = document.querySelector('.entry-header');

$headerContainer.addEventListener('click', switchView);
$newA.addEventListener('click', switchView);
$domContainer.addEventListener('click', switchView);

function switchView(event) {
  if (event.target.getAttribute('data-view') === 'entries' || event.target.getAttribute('data-view') === 'entry-form') {
    var dataView = event.target.getAttribute('data-view');
    var $viewDiv = document.querySelectorAll('.view');
    for (var j = 0; j < $viewDiv.length; j++) {
      if ($viewDiv[j].getAttribute('data-view') === dataView) {
        $viewDiv[j].className = 'view container';
      } else {
        $viewDiv[j].className = 'view container hidden';
      }
    }
  }
  data.view = dataView;
  $entryHeader.textContent = 'New Entry';
  $img.setAttribute('src', defImage);
  $codeJournal.reset();
  data.editing = null;
}

$domContainer.addEventListener('click', fillEdit);

function fillEdit(event) {
  if (event.target.getAttribute('id') !== 'edit-pen') {
    return;
  }
  var targetID = event.target.getAttribute('data-entry-id');
  targetID = Number(targetID);
  for (var i = 0; i < data.entries.length; i++) {
    if (targetID === data.entries[i].entryId) {
      data.editing = data.entries[i];
    }
  }
  $entryHeader.textContent = 'Edit Entry';
  $codeJournal.elements.title.value = data.editing.title;
  $codeJournal.elements.photo_url.value = data.editing.photo_url;
  $img.setAttribute('src', data.editing.photo_url);
  $codeJournal.elements.notes.value = data.editing.notes;

}
