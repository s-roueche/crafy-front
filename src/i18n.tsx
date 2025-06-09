import {initReactI18next} from "react-i18next";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";


i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      fallbackLng: 'en',
      debug: true,
      resources: {
        en : {
          translation: {
            welcome: 'Welcome to Crafy !',
            reports: 'Reports',
            companies : 'Companies',
            NAME: 'NAME',
            MONTH: 'MONTH',
            CLIENT: 'CLIENT',
            COMMENT: 'COMMENT'
          }
        },
        fr : {
          translation: {
            welcome: 'Bienvenue sur Crafy !',
            reports: 'Rapports',
            companies : 'Entreprises',
            NAME: 'NOM',
            MONTH: 'MOIS',
            CLIENT: 'CLIENT',
            COMMENT: 'COMMENTAIRE'
          }
        }
      }
    })
