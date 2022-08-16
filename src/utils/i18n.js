import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: {
          //----------------------------------------------------------Auth-------------------------------------------------------
          'Welcome to Facility Management, please enter your login credentials to get started!':
            'Welcome to Facility Management, please enter your login credentials to get started!',
          'Enter your': 'Enter your',
          'E-mail address': 'E-mail address',
          Password: 'Password',
          'Forgot your password?': 'Forgot your password?',
          Login: 'Login',
          'You do not have an account?': 'You do not have an account?',
          'Register now': 'Register now',

          'Welcome to Facility Management, please fill out this form for a fresh start!':
            'Welcome to Facility Management, please fill out this form for a fresh start!',
          'Company Name': 'Company Name',
          'First name': 'First name',
          'Last name': 'Last name',
          'Phone number': 'Phone number',
          'Confirm password': 'Confirm password',
          Register: 'Register',
          'Already have an account ?': 'Already have an account ?',
          'Log in now': 'Log in now',

          'Welcome to Facility Management, please enter your login credentials to get started!':
            'Welcome to Facility Management, please enter your login credentials to get started!',
          'Forgot your password': 'Forgot your password',
          "Enter your email and we'll send you your verification code":
            "Enter your email and we'll send you your verification code",
          'Send an email': 'Send an email',

          //----------------------------------------------------------User-------------------------------------------------------
          Dashboard: 'Dashboard',
          Statistics: 'Statistics',
          Users: 'Users',
          Settings: 'Settings',
        },
      },
      fr: {
        translations: {
          //----------------------------------------------------------Auth-------------------------------------------------------
          'Welcome to Facility Management, please enter your login credentials to get started!':
            'Bienvenue dans Facility Management, veuillez mettre vos identifiants de connexion pour commencer !',
          'Enter your': 'Entrez votre',
          'E-mail address': 'Adresse e-mail',
          Password: 'Mot de passe',
          'Forgot your password?': 'Mot de passe oublié?',
          Login: 'Connexion',
          'You do not have an account?': "Vous n'avez pas de compte ?",
          'Register now': "S'inscrire maintenant",

          'Welcome to Facility Management, please fill out this form for a fresh start!':
            'Bienvenue à Facility Management, veuillez remplir ce formulaire pour un nouveau départ !',
          'Company Name': "Nom de l'entreprise",
          'First name': 'Prénom',
          'Last name': 'Nom de famille',
          'Phone number': 'Numéro de téléphone',
          'Confirm password': 'Confirmez le mot de passe',
          Register: "S'inscrire",
          'Already have an account ?': 'Vous avez déjà un compte ?',
          'Log in now': 'Connecte-toi maintenant',

          'Welcome to Facility Management, please enter your login credentials to get started!':
            'Bienvenue dans Facility Management, veuillez mettre vos identifiants de connexion pour commencer !',
          'Forgot your password': 'Mot de passe oublié',
          "Enter your email and we'll send you your verification code":
            'Entrez votre email et nous vous enverrons votre code de vérification',
          'Send an email': 'Envoyer un e-mail',

          //----------------------------------------------------------User-------------------------------------------------------
          Dashboard: 'Tableau de bord',
          Statistics: 'Statistiques',
          Users: 'Utilisateurs',
          Settings: 'Réglages',
        },
      },
    },

    lng: 'en', // default language
    fallbackLng: 'en',
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
