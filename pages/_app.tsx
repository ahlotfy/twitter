// Next Js and libraries
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import "../public/lang/i18n";
// Style
import "@/styles/globals.scss";
import "@/styles/editAntStyle.scss";
import "../styles/normalize.css";
import "../styles/fontawesome-icon/css/all.css";
import { Container } from "@/styles/HomePageStyle";
// Components
import Initialize from "./../initialize/Initialize";
import storeRedux from "./../Redux/store";
import Header from "@/components/header/Header";
import Side from "@/components/side/Side";
import ModelComp from "@/components/model/ModelComp";

function App({ Component, pageProps }: AppProps) {
  // Main
  const router = useRouter();
  const links = [
    "/settings",
    "/settings/your_account",
    "/settings/display",
    "/settings/languages",
    "/settings/change_your_password",
    "/settings/delete_account",
  ];
  return (
    <Provider store={storeRedux}>
      <Initialize>
        <Container>
          {links.includes(router.pathname) ? (
            <>
              <Header />
              <Component {...pageProps} />
            </>
          ) : (
            <>
              <Header />
              <Component {...pageProps} />
              <Side />
            </>
          )}
        </Container>
        <ModelComp />
      </Initialize>
    </Provider>
  );
}
export default App;
