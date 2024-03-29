import firebase from 'firebase-admin';

const config = {
    weather: {
        access_key: process.env.WEATHER_ACCESS_KEY
    },
    firebase: {
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_id: process.env.CLIENT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUT_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
    }
}

firebase.initializeApp({
    credential: firebase.credential.cert(config.firebase)
})

export default config