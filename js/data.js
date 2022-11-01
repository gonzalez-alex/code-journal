/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var localPhotos = localStorage.getItem('photo-storage');

if (localPhotos !== null) {
  data = JSON.parse(localPhotos);
}

window.addEventListener('beforeunload', beforeUnload);

function beforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('photo-storage', dataJSON);
}
