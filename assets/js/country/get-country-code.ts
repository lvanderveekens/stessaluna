const CountryLanguage = require("country-language")

export const getCountryCode = (languageCode: string) => {
  return CountryLanguage.getLanguage(languageCode, (err, language) => {
    if (err) {
      console.error(err)
      return null
    }
    if (language.countries.length === 0) {
      return null
    } else if (language.countries.length === 1) {
      return language.countries[0].code_2
    } else {
      return getPreferredCountry(language).code_2
    }
  })
}

const getPreferredCountry = (language) => {
  const preferredCountryName = PREFERRED_COUNTRY_BY_LANGUAGE[language.name[0]]
  if (preferredCountryName) {
    return language.countries.find((c) => c.name === preferredCountryName)
  } else {
    // no preferred country found
    return language.countries[0]
  }
}

const PREFERRED_COUNTRY_BY_LANGUAGE = {
  Dutch: "Netherlands",
  Spanish: "Spain",
  Chinese: "China",
  Portuguese: "Portugal",
  German: "Germany",
}
