import en from "./en.json";

const langs = {
  en
};

export default  (lang = "en") => {
  return langs[lang];
};
