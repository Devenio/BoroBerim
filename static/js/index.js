// Responsive Header Menu
var main = document.querySelectorAll('main.main');
var footer = document.getElementsByClassName('footer');
var element = document.getElementsByClassName('header__responsive-collapse');

window.collapse = function(e) {
  e.preventDefault();
  element[0].classList.add('active');

  main[0].classList.add('blur');

  footer[0].classList.add('blur');
};

window.blur = function() {
  if(main[0].classList.contains('blur')){
    element[0].classList.remove('active');

    main[0].classList.remove('blur')

    footer[0].classList.remove('blur');
  }
};

main[0].addEventListener('click' , blur);
footer[0].addEventListener('click' , blur);
