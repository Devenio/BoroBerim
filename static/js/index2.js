// Responsive Header Menu
var main = document.querySelectorAll('main.main');
var footer = document.getElementsByClassName('footer');
var element = document.getElementsByClassName('header__responsive-collapse');
let profile_body = document.querySelectorAll('.profile .body');
let user_profile_title = document.querySelectorAll('.user-profile-title .inner-title');
let profile_sidebar = document.querySelectorAll('.profile .sidebar');

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

window.collapse_profile_sidebar = function(e) {
  e.preventDefault();
  profile_sidebar[0].classList.add('active');

  profile_body[0].classList.add('blur');

  user_profile_title[0].classList.add('blur');

  footer[0].classList.add('blur');
};

window.profile_blur = function() {
  if(profile_body[0].classList.contains('blur')){
    if(profile_sidebar[0].classList.contains('active')){
      profile_sidebar[0].classList.remove('active');

      profile_body[0].classList.remove('blur')

      user_profile_title[0].classList.remove('blur')

      footer[0].classList.remove('blur');
    }
  }
};

if(profile_body[0] != undefined){
  profile_body[0].addEventListener('click' , profile_blur);
}
if(user_profile_title[0] != undefined){
  user_profile_title[0].addEventListener('click' , profile_blur);
}

main[0].addEventListener('click' , blur);
footer[0].addEventListener('click' , blur);
