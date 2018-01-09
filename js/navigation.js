/*-----------------------------------MOBILE NAV-----------------------------*/

const hamburgerIcon = document.querySelector('.hamburger'),
      hamburgerSpans = document.querySelectorAll('.hamburger span'),
      instagramIcon = document.querySelector('.fa-instagram'),
      nav = document.querySelector('nav'),
      navUl = document.querySelector('.navbar-nav'),
      navA = document.querySelectorAll('.nav-a'),
      navBrand = document.querySelector('.navbar-brand'),
      sections = document.querySelectorAll('section'),
      wScroll = window.scrollY;

const hideHamburgerIcon = hamburgerIcon => {

  hamburgerIcon.classList.remove('dn-ns', 'dib-767');
  hamburgerIcon.classList.add('dn');

};

const showHamburgerIcon = hamburgerIcon => {

  hamburgerIcon.classList.add('dn-ns', 'dib-767');
  hamburgerIcon.classList.remove('dn');

};

const displayNav = navUl => {

  navUl.style.cssText = "display: initial;";

};

const hideNav = navUl => {

  navUl.style.cssText = "display: none; position: relative; z-index: 9999;";

};

function displayNavOnWidth () {

  if( document.body.clientWidth >= 768 ) {

    displayNav(navUl);

  }else {

    hideNav(navUl);
  }

};

window.onresize = displayNavOnWidth;

const editSections = (method, sections)=> {

  sections.forEach((element, index)=>{

    if (method === "add") {

      return element.classList.add( 'sink', 'filter-blur' );

    }else if (method === "remove") {

      return element.classList.remove( 'sink', 'filter-blur' );

    }

  });

};

const sinkAndBlurContent = sections => {

  sections.forEach((element, index)=> {

    element.classList.add( 'sink', 'filter-blur' );

  });

};

const removeContentEffects = sections => {

    sections.forEach((element, index)=> {

    element.classList.remove( 'sink', 'filter-blur' );

  });

};

hamburgerIcon.onclick = function () {
  hideHamburgerIcon(hamburgerIcon);
  displayNav(navUl);
  editSections("add", sections);

}

window.onmousedown = function (e) {

  const checkEventPath = e.path[0].computedRole === "link" || e.path[0].localName === "span";
  if(document.body.clientWidth <=767 && !checkEventPath) {
    showHamburgerIcon(hamburgerIcon);
    hideNav(navUl);
    editSections("remove", sections);

  }
};

const changeNavBg = nav => {

  nav.classList.add('brand-bg');
  nav.classList.remove('bg-none');

};

const changeHamburgerColor = hamburgerSpans => {

    hamburgerSpans.forEach((element, index)=> {

    element.classList.remove('bg-white-90');
    element.classList.add('bg-black-90');

  });

};



const changeNavOnScroll = (changeNavBg, changeHamburgerColor)=> {

  if(window.scrollY >= 45) {
    changeNavBg( nav );
    changeHamburgerColor( hamburgerSpans );
  }
};

window.onscroll = function () {

  changeNavOnScroll( changeNavBg, changeHamburgerColor);

};

