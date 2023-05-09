import { createContext, useContext } from 'react';

const countryContext = createContext(null);

export const CountryProvider = countryContext.Provider;

export const useCountry = () => useContext(countryContext);
