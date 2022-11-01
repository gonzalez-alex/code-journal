var $photoUrl = document.querySelector('#photo-url');
var $img = document.querySelector('img');

$photoUrl.addEventListener('input', newPhoto);

function newPhoto(event) {
  var newImg = document.querySelector('#photo-url').value;
  $img.setAttribute('src', newImg);
}
