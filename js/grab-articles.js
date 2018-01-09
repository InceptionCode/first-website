const articlesSection = document.querySelector('.section-articles'),
      featuredTab = document.querySelector('.featured-tab'),
      lifeTab = document.querySelector('.life-tab'),
      wealthTab = document.querySelector('.wealth-tab'),
      healthTab = document.querySelector('.health-tab'),
      technologyTab = document.querySelector('.technology-tab'),
      tabs = document.querySelectorAll('.tabs');

const makeRecentRequest = ()=> {

  axios.get('./articles/featured/featured-section.html')
    .then( results => {

      articlesSection.innerHTML = results.data;

    }, err => {

      console.log(err);

    } );
};

const sendErrorHeading = () => {

      let errorHeading = document.createElement("h1"),
          text = document.createTextNode('Sorry no articles at the moment.')
      errorHeading.appendChild(text);
      articlesSection.innerHTML = "";
      articlesSection.appendChild(errorHeading);

};

const grabArticles = url => {

  axios.get(url)
    .then( results => {
      if (results.data !== "") {

        articlesSection.innerHTML = results.data;

      }else {

        sendErrorHeading();

      }

    }, err => {

      console.log(err)
      sendErrorHeading();

    });
};

const changeActiveTab = e => {

  tabs.forEach((element,index)=> {

    if(element.classList.contains('active-tab')){

      element.classList.remove('active-tab');

    }

    e.target.classList.add('active-tab');

  });
};

const bringPageUp = ()=> window.scroll(0,0);

featuredTab.onclick = e => {

  grabArticles("./articles/featured/featured-section.html");
  changeActiveTab(e);
  bringPageUp();
};

lifeTab.onclick = (e)=> {

  grabArticles("./articles/life/life-section.html");
  changeActiveTab(e);
  bringPageUp();
};

wealthTab.onclick = (e)=> {

  grabArticles("./articles/wealth/wealth-section.html");
  changeActiveTab(e);
  bringPageUp();
};

healthTab.onclick = (e)=> {

  grabArticles("./articles/health/health-section.html");
  changeActiveTab(e);
  bringPageUp();
};

technologyTab.onclick = (e)=> {

  grabArticles("./articles/technology/technology-section.html");
  changeActiveTab(e);
  bringPageUp();
};

if(window.location.pathname === "/InceptionCode/articles.html") {

  makeRecentRequest();
  bringPageUp();

};


