import type { AppProps } from "next/app";
import { PixelGridProvider } from "contexts/PixelGridContext";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PixelGridProvider>
      <Component {...pageProps} />
    </PixelGridProvider>
  );
}
