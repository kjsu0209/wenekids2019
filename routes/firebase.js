//variables for firebase
const firebase = require('firebase-admin');
var serviceAccount = {
    "type": "service_account",
    "project_id": "wenikids-c0751",
    "private_key_id": "",
    "private_key": "",
    "client_email": "",
    "client_id": "",
    "auth_uri": "",
    "token_uri": "",
    "auth_provider_x509_cert_url": "",
    "client_x509_cert_url": ""
}

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});


module.exports = firebase;
