//import "normalize.css";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}


// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
      100: "#668F80",
      200: "#4A6670",
      300: "#103900",
      400: "#D8D4D5",
      500: "#E2E2E2",
      600: "#FFFFFF",
      // ...
      900: "#c3c3c3",
    },
  },
})
