import { createContext, useContext } from 'react';

const servicesContext = createContext(null);

export const ServicesProvider = servicesContext.Provider;

export const useServices = () => useContext(servicesContext);
