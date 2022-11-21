import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

import { PixelGridProvider } from "contexts/PixelGridContext";

import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PixelGridProvider>
      <NextNProgress
        color="#FFF12B"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />

      <Component {...pageProps} />
    </PixelGridProvider>
  );
}
