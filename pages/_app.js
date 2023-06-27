import '../styles/reset.css';
import '../scss/style.scss';
import React from 'react';
import App from 'next/app';
import { getStores, StoreProvider } from '../store/store';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import "@fancyapps/ui/dist/fancybox.css";

class CustomApp extends App {

  render() {
    const { Component, pageProps, initialData } = this.props;

    // During SSR, this will create new store instances so having `initialData` is crucial.
    // During the client-side hydration, same applies.
    // From then on, calls to `getStores()` return existing instances.
    const stores = getStores(initialData);

    return (
        <StoreProvider value={stores}>
          <Component {...pageProps} />
        </StoreProvider>
    );
  }

}

export default CustomApp;
