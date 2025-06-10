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
            COMMENT: 'COMMENT',
            Report: 'Report',
            month1: 'January',
            month2: 'February',
            month3: 'March',
            month4: 'April',
            month5: 'May',
            month6: 'June',
            month7: 'July',
            month8: 'August',
            month9: 'September',
            month10: 'October',
            month11: 'November',
            month12: 'December',
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
            COMMENT: 'COMMENTAIRE',
            Report: 'Rapport',
            month1: 'Janvier',
            month2: 'Février',
            month3: 'Mars',
            month4: 'Avril',
            month5: 'Mai',
            month6: 'Juin',
            month7: 'Juillet',
            month8: 'Août',
            month9: 'Septembre',
            month10: 'Octobre',
            month11: 'Novembre',
            month12: 'Décembre',
          }
        }
      }
    })
