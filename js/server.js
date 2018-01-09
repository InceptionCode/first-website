/* global require,process: true */
const express =require( 'express' ),
      app = express(),
      bodyParser =require( 'body-parser' ),
      sendgrid =require( 'sendgrid' ),
      cors =require( 'cors' );

//Middleware
app.use(
  cors(),
  bodyParser.json()
);

try {

  require( 'dotenv' ).config();

}

catch ( err ) {

  console.log( 'dotenv err', err );

}

const TOEMAIL =process.env.TOEMAIL,
      APIKEY =process.env.SENDGRIDAPI;
/* End of Middleware */


app.post( '/email', function (req, res) {

  try {

    const sgResponse = sendEmail( req.body );
    res.status(201).send({
      heading: 'Success',
      message: `Would you look at that! I got your email.
      I will definitely respond back to you within 24 hours.`
    } );

  } catch ( err ) {

    res.status(400).send({
      heading: 'Failed',
      message: `It\'s not your fault its mine.
      I know I messed up and you\'re annoyed I apologize. Try again shortly.`
    } );

  }

} );

app.post( '/questionnaire', function (req, res) {

  try {

    const sgResponse = sendQuestionnaire( req.body );
    res.status(201).send({
      heading: 'Success',
      message: `Would you look at that! I got your questionnaire.
      I will definitely respond back to you within 48 hours.`
    } );

  } catch ( err ) {

    res.status(400).send({
      heading: 'Failed',
      message: `It\'s not your fault its mine.
      I know I messed up and you\'re annoyed I apologize. Try again shortly.`
    } );

  }

} );

function sendEmail ( { email, name, subject, message } ) {

  const helper =sendgrid.mail,
        FROM_EMAIL =new helper.Email( TOEMAIL ),
        TO_EMAIL =new helper.Email( TOEMAIL ),
        CONTENT =new helper.Content( 'text/plain', name +" " +email +" " +message ),
        MAIL =new helper.Mail( FROM_EMAIL, subject, TO_EMAIL, CONTENT );

  let sg =sendgrid( APIKEY ),
      request =sg.emptyRequest( {

        method: 'POST',
        path: '/v3/mail/send',
        body: MAIL.toJSON(),
      } );

  return sg.API ( request )
                .then( response => {

                  console.log(response.statusCode);
                }, err => {

                  console.log(error.response);
                });

};

function sendQuestionnaire ( { name, email, subject, questionnaire } ) {

  const helper =sendgrid.mail,
        FROM_EMAIL =new helper.Email( TOEMAIL ),
        TO_EMAIL =new helper.Email( TOEMAIL ),
        CONTENT =new helper.Content( 'text/plain', `${name} ${email} ${questionnaire}`),
        MAIL =new helper.Mail( FROM_EMAIL, subject, TO_EMAIL, CONTENT );

  let sg =sendgrid( APIKEY ),
      request =sg.emptyRequest( {

        method: 'POST',
        path: '/v3/mail/send',
        body: MAIL.toJSON(),
      } );

  return sg.API ( request )
                .then( response => {

                  console.log(response.statusCode);
                }, err => {

                  console.log(error.response);
                });
}


app.listen( 8000 );
