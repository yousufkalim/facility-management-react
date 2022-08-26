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
          // Login
          'Welcome to Facility Management, please enter your login credentials to get started!':
            'Welcome to Facility Management, please enter your login credentials to get started!',
          'Enter your': 'Enter your',
          'E-mail address': 'E-mail address',
          Password: 'Password',
          'Forgot your password?': 'Forgot your password?',
          Login: 'Login',
          'You do not have an account?': 'You do not have an account?',
          'Register now': 'Register now',

          // Registration
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

          // ForgotPassword1
          'Forgot your password': 'Forgot your password',
          "Enter your email and we'll send you your verification code":
            "Enter your email and we'll send you your verification code",
          'Send an email': 'Send an email',

          // ForgotPassword2
          'Password Set Successfully!': 'Password Set Successfully!',
          'Enter your new password': 'Enter your new password',
          'Reset Password': 'Reset Password',

          //----------------------------------------------------------User-------------------------------------------------------
          // Sidebar
          Dashboard: 'Dashboard',
          Statistics: 'Statistics',
          Users: 'Users',
          Settings: 'Settings',

          // Dashboard
          'New Tickets': 'New Tickets',
          Pending: 'Pending',
          'In action': 'In action',
          Ended: 'Ended',
          'Add a ticket': 'Add a ticket',
          'Edit a ticket': 'Edit a ticket',
          'Edit a new ticket': 'Edit a new ticket',
          'To safeguard': 'To safeguard',
          'Add a new ticket': 'Add a new ticket',
          Building: 'Building',
          Venue: 'Venue',
          'Location details': 'Location details',
          Category: 'Category',
          Details: 'Details',
          Attachment: 'Attachment',
          Assigned: 'Assigned',
        },
      },
      fr: {
        translations: {
          //----------------------------------------------------------Auth-------------------------------------------------------
          // Login
          'Welcome to Facility Management, please enter your login credentials to get started!':
            'Bienvenue dans Facility Management, veuillez mettre vos identifiants de connexion pour commencer !',
          'Enter your': 'Entrez votre',
          'E-mail address': 'Adresse e-mail',
          Password: 'Mot de passe',
          'Forgot your password?': 'Mot de passe oublié?',
          Login: 'Connexion',
          'You do not have an account?': "Vous n'avez pas de compte ?",
          'Register now': "S'inscrire maintenant",

          // Registration
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

          // ForgotPassword1
          'Forgot your password': 'Mot de passe oublié',
          "Enter your email and we'll send you your verification code":
            'Entrez votre email et nous vous enverrons votre code de vérification',
          'Send an email': 'Envoyer un e-mail',

          // ForgotPassword2
          'Password Set Successfully!': 'Mot de passe défini avec succès !',
          'Enter your new password': 'Entrez votre nouveau mot de passe',
          'Reset Password': 'réinitialiser le mot de passe',

          //----------------------------------------------------------User-------------------------------------------------------
          // Sidebar
          Dashboard: 'Tableau de bord',
          Statistics: 'Statistiques',
          Users: 'Utilisateurs',
          Settings: 'Réglages',

          // Dashboard
          'New Tickets': 'Nouveaux Billets',
          Pending: 'En attente',
          'In action': 'En intervention',
          Ended: 'Terminé',
          'Add a ticket': 'Ajouter un ticket',
          'Edit a ticket': 'mettre à jour',
          'To safeguard': 'Sauvegarder',
          'Add a new ticket': 'Ajouter un nouveau ticket',
          'Edit a new ticket': 'modifier le ticket',
          Building: 'Bâtiment',
          Venue: 'Lieu',
          'Location details': 'Détails du lieu',
          Category: 'Catégorie',
          Details: 'Détails',
          Attachment: 'Pièce jointe',
          Assigned: 'Assignés',
        },
      },
    },

    lng: 'fr', // default language
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
