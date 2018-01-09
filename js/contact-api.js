
const form = document.querySelector( '.email-form' ),
      inputs = document.querySelectorAll('input'),
      firstName = document.querySelector('#first-name'),
      lastName = document.querySelector('#last-name'),
      email = document.querySelector('#email'),
      subject = document.querySelector('#subject'),
      textarea = document.querySelector('#message'),
      button = document.querySelector( '.submit' ),
      responseHeading = document.querySelector('.response-heading'),
      responseMessage = document.querySelector('.response-message');


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

      }
        changeResponseHeading(responseHeading, err.data.heading);
        changeResponseMessage(responseMessage, err.data.message);
        showSpan("failed");

    } );

};

const showValidity = (inputs, textarea) => {

  inputs.forEach((element,index)=> {

    element.classList.add('valid-style');

  });
  textarea.classList.add('valid-style');
};

//Email API
function deliverEmail ( first,last,email,text,reason ) {

  const request ={
    method: 'POST',
    url: 'http://67.205.174.156:8000/email',
    data: {
      email: email,
      name: first +" " +last,
      subject: reason,
      message: text
    }
  };

  makeRequest(request);

}

button.onclick = e => {

  if ( form.checkValidity() ) {

    e.preventDefault();
    deliverEmail( firstName.value, lastName.value, email.value, textarea.value , subject.value );

  }

  showValidity(inputs, textarea);

};



