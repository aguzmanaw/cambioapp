export const mapCountryToSelect = (countries = []) => {
  return countries.map((country) => ({
    label: `${country.name} (${country.code})`,
    code: `${country.code}`,
  }));
};
