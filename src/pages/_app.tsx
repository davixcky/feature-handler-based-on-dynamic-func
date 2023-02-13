import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { FeatureProvider } from "@/context/featureContext";
import { UserProvider } from "@/context/userContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <FeatureProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </FeatureProvider>
    </ChakraProvider>
  );
}

export default MyApp;
