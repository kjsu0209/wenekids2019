//variables for firebase
const firebase = require('firebase-admin');
var serviceAccount = {
    "type": "service_account",
    "project_id": "wenikids-c0751",
    "private_key_id": "9f5c00011599165df1da9d32970b7225e39d6059",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDfZXYE/pCYvUkO\nSrYbhmEs7rrMR/ax9VRUwne/KqqIIeqvkE5PHk7QZFCY1UL679WP2j1J182UXJeL\n4OGavC0emjURjQtmsuRGdgv7YqXBNpTQyXUxYYnxVNbpspBVJnlDKGrZpAm7ry/x\npLo/VAI76YJYY6qrZHVco1PyDLMnZBe8XvtK2HFpZvbsyuB40RmW2h/ubePb+Kgl\nYC8v5XPdTCD7dDmjp/HrUWml5HVEsPO76+wTgz6MQ85aWamB0OLLtl1eVbtaAHav\nYzhboR4y9O3YL62SIfoD/1SHNk4Ollva5qUGP6X2lZD+obHpERYk00mAwN19xYQJ\ngVgFkzgJAgMBAAECggEABoXGW9/45dTFAMtSpNwYE0FHJ/bD7687jpv89hJvVzky\nSnz6pFm8sF31cnjrkzsUb7ZOCs1nvbi0XgurWqK66IVVHlWRaya2/o2szOK09z66\nOpxfNRlldyvkeH9TsoDEkp7n+8HL3PSBAFuwam/v/sLTIPSMA6QTvygvp8YSJwi5\npcmV7eCq8F/v8ZFhluEfjUL41cNuOFfxh03p01sjntOM//g/ufyPaRe1wIGpmYCK\nr6ezNxVK/vm6LGYM6cWJV+qi9QGyHB9cCzHaHZ4AEER6sxgy+5YRRVoFu1O8xB+3\nJJPhQCu2W3dYekCgdUxemihLjSS2243jfwAQbUlQGQKBgQD3ETrw9KHBIyS8vYv9\nuqU4T5L1JdDB+5LUEYEr78eGT6sNChItzgpYQnvzBEmPkLhR4pkn8JB1VHJyzLRH\nShawvIfN4hkV2rvWp6cIVjLNR0XBhrHyaE1b+hMqAYHcEMHingfui9l1tTma54t3\nv2t7mD+6Qifn2BH+9QbvLOHcjQKBgQDneSPxyrp+GVK1EQiMJfYKTKBSntZC4pVW\n9E4r88vrjRI3qT0pb8QT2lGSKYsYp087z4FXVJT9wpdXY5txF33XsWaAA4qPttw/\n5cRw2EM2dkf2IAD3D7xJkEWGL54XK1HczWxIGQH6lUhvnzNMKr1/dCyVReuSiuk6\ncS8Y/v2QbQKBgHZIuX9Cn25n9N6noK4I/bDH6AOV5yv31YPSHZV7ZnrXCX1kpO9p\nBWrb6ZufIdip4JTTd5+3fHGvzFtJxcWbouFaYWogJQJhhixud3l2SzwcMzlD003K\nwb6XKzWhIxrIqwpjvkhmi+XerYWL9SmPa1XwvhHeOly1BWiaxocbZcbBAoGAIz7L\n3VZMHUVH1bA5R/XDx/+w7cOnxllv+eSLPqAJrd02J+mKGZQeHBPDFeljd6aKJwZK\noHyNjzIhDzpogcjc7YninJ1tbMKgOM6IodIcMd/Cx1RKMVRhDCZ+n5cCkG6VMXTK\nBxRfu8MdW3m3OuLLJewPmc8itpaWOsLfNAQnoeUCgYBURbd7/EGljKZ+J7FEsSS9\n47e6xZR5Vxnvgb28kLlOGxxn0rQR01Bfb4ratdcPHxnxquXy9Oa3XvyHwQNTOLJO\nkrvCWrFyDC164eHECfyKI+sR3KOfpaUuQKH9r8F2jyfmwuziudc4SOXiFlOZMrJR\nH0QqGth+0jWRC9ppCT524g==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-6dwbo@wenikids-c0751.iam.gserviceaccount.com",
    "client_id": "116094356893297285956",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6dwbo%40wenikids-c0751.iam.gserviceaccount.com"
}

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});


module.exports = firebase;