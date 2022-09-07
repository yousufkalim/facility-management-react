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
          'Logged In': 'Logged In',
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
          'Registered Successfully.': 'Registered Successfully.',

          // ForgotPassword1
          'Forgot your password': 'Forgot your password',
          "Enter your email and we'll send you your verification code":
            "Enter your email and we'll send you your verification code",
          'Send an email': 'Send an email',

          // ForgotPassword2
          'Password Set Successfully!': 'Password Set Successfully!',
          'Enter your new password': 'Enter your new password',
          'Reset Password': 'Reset Password',
          //create Password
          'Create your Password': 'Create your Password',
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
          'Ticket added successfully.': 'Ticket added successfully.',
          'Ticket updated successfully.': 'Ticket updated successfully.',
          ////add user
          Close: 'Close',
          'User Added Successfully!': 'User Added Successfully!',
          'User Updated Successfully!': 'User Updated Successfully!',
          ///aPP bar
          'Sign out': 'Sign out',
          ////account settings
          'Profile updated successfully.': 'Profile updated successfully.',
          ////add delete buidlings screen
          'Buidling updated successfully.': 'Buidling updated successfully.',
          'Building added successfully.': 'Building added successfully.',
          'Building deleted successfully.': 'Building deleted successfully.',
          ///add delated catogories screen
          'Category added successfully.': 'Category added successfully.',
          'Category updated successfully.': 'Category updated successfully.',
          'Category deleted successfully.': 'Category deleted successfully.',
          /////create
          'Create Password': 'Create Password',
          'Create your Password and login': 'Create your Password and login',
        },
      },
      fr: {
        translations: {
          //----------------------------------------------------------Auth-------------------------------------------------------
          // Login
          // 'Welcome to Facility Management, please enter your login credentials to get started!':
          //   'Bienvenue dans Facility Management, veuillez mettre vos identifiants de connexion pour commencer !',

          'Welcome to Facility Management, please enter your login credentials to get started!': `Bienvenue dans votre Outil de Demande D’intervention.`,
          'Enter your': 'Entrez votre',
          'E-mail address': 'Adresse e-mail',
          Password: 'Mot de passe',
          'Forgot your password?': 'Mot de passe oublié?',
          Login: 'Connexion',
          'Logged In': 'Connecté',
          // 'You do not have an account?': "Vous n'avez pas de compte ?",
          'You do not have an account?': `Tu n’as pas de compte ?`,
          // 'Register now': "S'inscrire maintenant",
          'Register now': 'Inscris-toi maintenant',
          // Registration
          'Welcome to Facility Management, please fill out this form for a fresh start!':
            'Bienvenue à Facility Management, veuillez remplir ce formulaire pour un nouveau départ !',
          'Company Name': "Nom de l'entreprise",
          'First name': 'Prénom',
          'Last name': 'Nom de famille',
          'Phone number': 'Numéro de téléphone',
          'Confirm password': 'Confirmez le mot de passe',
          Register: "S'inscrire",
          'Registered Successfully.': 'Enregistré avec succès.',
          // 'Already have an account ?': 'Vous avez déjà un compte ?',
          'Already have an account ?': `Tu as déjà un compte ?`,
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
          //create Password
          'Create your Password': 'Créez votre mot de passe',
          'Create your Password and login': 'Créez votre mot de passe et connectez-vous',
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
          Attachment: 'Joindre une photo',
          Assigned: 'Assignés',
          'Ticket added successfully.': 'Ticket ajouté avec succès.',
          'Ticket updated successfully.': 'Ticket mis à jour avec succès.',
          ////add user
          Close: 'proche',
          'User Updated Successfully!': 'Utilisateur mis à jour avec succès !',
          'User Added Successfully!': 'Utilisateur ajouté avec succès !',
          ///aPP bar
          'Sign out': 'Déconnexion',
          ////account settings
          'Profile updated successfully.': 'Mise à jour du profil réussie.',
          ////buidlings
          'Buidling updated successfully.': 'Bâtiment mis à jour avec succès',
          'Building added successfully.': 'Bâtiment ajouté avec succès.',
          'Building deleted successfully.': 'Bâtiment supprimé avec succès.',
          ////add delete category screen
          'Category added successfully.': 'Catégorie ajoutée avec succès.',
          'Category updated successfully.': 'Catégorie mise à jour avec succès.',
          'Category deleted successfully.': 'Catégorie supprimée avec succès.',
          ///Create Password
          'Create Password': 'Créer un mot de passe',
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
