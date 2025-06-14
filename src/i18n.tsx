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
            Activities: 'Activities',
            Add: 'Add',
            AddCompany: 'Add a company',
            Client: 'Client',
            CLIENT: 'CLIENT',
            Comment: 'Comment',
            COMMENT: 'COMMENT',
            Companies : 'Companies',
            day: 'day',
            EnterNameCompany: 'Enter the name of the company',
            FullDay: 'Full Day',
            HalfDay: 'Half Day',
            MONTH: 'MONTH',
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
            Name: 'Name',
            NAME: 'NAME',
            of: 'of',
            Report: 'Report',
            Reports: 'Reports',
            TotalTime: 'Total time',
            WelcomeToCrafy: 'Welcome to Crafy !',
          }
        },
        fr : {
          translation: {
            Activities: 'Activités',
            Add: 'Ajouter',
            AddCompany: 'Ajouter une entreprise',
            Client: 'Client',
            CLIENT: 'CLIENT',
            Comment: 'Commentaire',
            COMMENT: 'COMMENTAIRE',
            Companies : 'Entreprises',
            day: 'jour',
            EnterNameCompany: "Entrez le nom de l'entreprise",
            FullDay: 'Journée complète',
            HalfDay: 'Demi-journée',
            MONTH: 'MOIS',
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
            Name: 'Nom',
            NAME: 'NOM',
            of: 'de',
            Report: 'Rapport',
            Reports: 'Rapports',
            TotalTime: 'Temps total',
            WelcomeToCrafy: 'Bienvenue sur Crafy !',
          }
        }
      }
    })
