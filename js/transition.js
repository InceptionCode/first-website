
/*---------------------- Exit Landing Page -------------------------------*/
const trigger_transition = document.querySelector('.trigger-transition'),
      revealer = document.querySelector('.revealer'),
      home_page = document.querySelector('.home-page'),
      landing_page = document.querySelector('.landing-page'),
      body = document.querySelector('body');


const changeBackground = ()=> {

  body.classList.remove('background-landing-image', 'bgs-view-cover');
  body.classList.add('bg-black');

}
const makePageVisible = ()=> home_page.style.visibility = 'visible';
const removeOverflow =()=> {

  home_page.classList.remove('overflow-hidden');

}
const showAnimation = ()=> {

  revealer.classList.add('revealer--bottom', 'revealer--animate');
  window.setTimeout(changeBackground, 1000);
  window.setTimeout(makePageVisible, 1000);
  removeOverflow();

}
const removeAnimation = ()=> {

  revealer.classList.remove('revealer--bottom', 'revealer--animate');
  body.classList.remove('anim--effect-3');

}

window.onload = function () {

  showAnimation();
  window.setTimeout(removeAnimation, 1500);

};

