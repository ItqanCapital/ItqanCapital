import React from 'react';
import { LocalizationProvider } from './src/context/LocalizationContext';

export const wrapRootElement = ({ element }) => (
  <LocalizationProvider>
    {element}
  </LocalizationProvider>
);

export const onInitialClientRender = () => {
  if (window.location.pathname === "/") {
    window.location.replace("/ar");
  }
};
