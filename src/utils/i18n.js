import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // fallbackLng: ["fr", "en"],
    // we init with resources
    resources: {
      en: {
        translations: {
          //----------------------------------------------------------Auth-------------------------------------------------------

          Login: "Login",
          "Don't have an account?": "Don't have an account?",
          "Register now": "Register now",
          "Register As a": "Register As a",
          Client: "Client",
          Designer: "Designer",
          "Sign up": "Sign up",
          "Already have an account?": "Already have an account?",
          "Sign in now": "Sign in now",
          "Verification Code": "Verification Code",
          "Create Account": "Create Account",
          "Name of your company": "Name of your company",
          "Phone No": "Phone No",
          "I Have Physical Store": "I Have Physical Store",
          "Store Name": "Store Name",
          "Date of Birth": "Date of Birth",
          "Select your gender": "Select your gender",
          "Send Email":"Send Email",
          "You do not have an account?":"You do not have an account?",
          "Register now":"Register now",
         "Forgot your password?":"Forgot your password?",
         "Password":"Password",
         "E-mail address":"E-mail address",
         "Welcome to Facility Management, please enter your login credentials to get started!":"Welcome to Facility Management, please enter your login credentials to get started!",
         "Login":"Login",
         "Welcome to Facility Management, please fill out this form for a fresh start!":"Welcome to Facility Management, please fill out this form for a fresh start!",
        "Company Name":"Company Name",
        "First name":"First name",
        "Last name":"Last name",
        "Phone number":"Phone number",
        "Confirm password":"Confirmez le mot de passe"
        },
      },
      fr: {
        translations: {
          //----------------------------------------------------------Auth-------------------------------------------------------

          Login: "Connexion",
          "Don't have an account?": "Vous n'avez pas de compte ?",
          "Register now": "S'inscrire maintenant",
          "Register As a": "Inscrivez-vous en tant que",
          Client: "Client",
          Designer: "Designer",
          "Sign up": "S'inscrire",
          "Already have an account?": "Vous avez déjà un compte?",
          "Sign in now": "Connectez vous maintenant",
          "Verification Code": "Code de vérification",
          "Create Account": "Créer un compte",
          "Name of your company": "Nom de votre entreprise",
          "Phone No": "Pas de téléphone",
          "I Have Physical Store": "J'ai un magasin physique",
          "Store Name": "Nom du magasin",
          "Date of Birth": "Date de naissance",
          "Select your gender": "Sélectionnez votre sexe",
          "Send Email":"Envoyer un e-mail",
          "You do not have an account?":"Vous n'avez pas de compte ?",
          "Register now":"S'inscrire maintenant",
         "Forgot your password?":"Mot de passe oublié?",
         "Password":"Mot de passe",
         "E-mail address":"Adresse e-mail",
         "Welcome to Facility Management, please enter your login credentials to get started!":"Bienvenue dans Facility Management, veuillez mettre vos identifiants de connexion pour commencer !",
         "Login":"connexion",
          "Welcome to Facility Management, please fill out this form for a fresh start!":"Bienvenue à Facility Management, veuillez remplir ce formulaire pour un nouveau départ !",
          "Company Name":"Nom de l'entreprise",
          "First name":"Prénom",
          "Last name":"Nom de famille",
          "Phone number":"Numéro de téléphone",
          "Confirm password":"Confirmez le mot de passe"
        },
      },
    },

    lng: "fr", // default language
    fallbackLng: "fr",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
