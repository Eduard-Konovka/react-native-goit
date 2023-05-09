export default function languageWrapper(lang, obj) {
  switch (lang) {
    case 'English':
      return obj.eng;

    case 'German':
      return obj.ger;

    case 'Spanish':
      return obj.spa;

    case 'Ukrainian':
      return obj.ukr;

    default:
      return obj.eng;
  }
}
