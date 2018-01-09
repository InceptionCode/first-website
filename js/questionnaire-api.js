
const form = document.querySelector( '.questionnaire-form' ),
      inputs = document.querySelectorAll('input'),
      textareas = document.querySelectorAll('textarea'),
      firstName = document.querySelector('#first-name'),
      lastName = document.querySelector('#last-name'),
      email = document.querySelector('#email'),
      button = document.querySelector( '.submit' ),
      responseHeading = document.querySelector('.response-heading'),
      responseMessage = document.querySelector('.response-message'),
      questions = {
        Q1: document.querySelectorAll('.questions')[0].innerHTML,
        Q2: document.querySelectorAll('.questions')[1].innerHTML,
        Q3: document.querySelectorAll('.questions')[2].innerHTML,
        Q4: document.querySelectorAll('.questions')[3].innerHTML,
        Q5: document.querySelectorAll('.questions')[4].innerHTML,
      };

const changeResponseHeading = (responseHeading, title) => responseHeading.innerHTML = title;
const changeResponseMessage = (responseMessage, message) => responseMessage.innerHTML = message;

const showSpan = response => {

  let span,
    hiddenSpan;

  if (response === "success") {

    span = document.querySelector('.success');
    hiddenSpan = document.querySelector('.failed');

  } else {

    span = document.querySelector('.failed');
    hiddenSpan = document.querySelector('.success');

  }
  span.classList.remove('dn');
  span.classList.add('fl');
  hiddenSpan.classList.add('dn');

};


const makeRequest = (request)=> {

  axios( request )
    .then( res => {

      changeResponseHeading(responseHeading, res.data.heading);
      changeResponseMessage(responseMessage, res.data.message);
      showSpan("success");

    }, err => {

      if (err.message === "Network Error") {

        let heading = 'What! That\'s not right',
            message = 'The server seems to be down. I apologize try again shortly.'

        changeResponseHeading(responseHeading, heading);
        changeResponseMessage(responseMessage, message);
        showSpan("failed");

      } else {

        changeResponseHeading(responseHeading, err.data.heading);
        changeResponseMessage(responseMessage, err.data.message);
        showSpan("failed");
      }

    } );

};

const showValidity = (inputs, textarea) => {

  inputs.forEach((element,index)=> {

    element.classList.add('valid-style');

  });
  textareas.forEach((element,index)=> {

    element.classList.add('valid-style');

  });

};

//Email API
function deliverEmail (data) {

  const request ={
    method: 'POST',
    url: 'http://67.205.174.156:8000/questionnaire',
    data: data

  };

  makeRequest(request);

};

const grabValues = questions=> {

  let answers = {
    A1: question1 = document.querySelector('#Q1').value,
    A2: question2 = document.querySelector('#Q2').value,
    A3: question3 = document.querySelector('#Q3').value,
    A4: question4 = document.querySelector('#Q4').value,
    A5: question5 = document.querySelector('#Q5').value,
  };

  return { questions, answers };

};

const userQuestionnaireResponse = ({questions, answers})=> {

  const { Q1, Q2, Q3, Q4, Q5 } = questions;
  const { A1, A2, A3, A4, A5 } = answers;

  return `
          ${Q1}
          ${A1}

          ${Q2}
          ${A2}

          ${Q3}
          ${A3}

          ${Q4}
          ${A4}

          ${Q5}
          ${A5}
        `;
};

button.onclick = e => {

  if ( form.checkValidity() ) {

    e.preventDefault();
      data = {
        name: firstName.value + " " + lastName.value,
        email: email.value,
        subject: "Client Questionnaire!!",
        questionnaire: userQuestionnaireResponse(grabValues(questions))
      };
    deliverEmail(data);

  }

  showValidity(inputs, textareas);

};



