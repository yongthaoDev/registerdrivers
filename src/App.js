import React, { useEffect, useReducer, useState } from "react";
import "moment/locale/lo";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "@apollo/client";
import "./index.css";
import { startOfMonth, TOKEN } from "./helper";
import _ from "lodash";
import Routes from "./routes";
import { pageTitleReducer, userReducer, dateReducer } from "./store";
import Notiflix from "notiflix";

const AppContext = React.createContext();

export default function App() {
  const [userState, userDispatch] = useReducer(userReducer, null);
  const [titleState, titleDispatch] = useReducer(pageTitleReducer, null);
  const [dateState, dateDispatch] = useReducer(dateReducer, {
    startDate: new Date(),
    endDate: new Date(),
  });

  const client = new ApolloClient({
    uri: "https://api.services.anousith.express/graphql",
    cache: new InMemoryCache({
      addTypename: false,
    }),
    
    request: (operation) => {
      const _resData = localStorage.getItem(TOKEN);
      const _localJson = JSON.parse(_resData);
      if (_localJson) {
        operation.setContext({
          headers: {
            authorization: _localJson?.accessToken,
          },
        });
        return;
      }
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      let isTokenError1 = _.some(err.graphQLErrors, {
        message: "Error: TokenExpiredError: jwt expired",
      });
      let isTokenError2 = _.some(err.graphQLErrors, {
        message: "Error: JsonWebTokenError: jwt must be provided",
      });
      let isTokenError3 = _.some(err.graphQLErrors, {
        message: "Error: DO_NOT_HAVE_PERMISSION",
      });
      if (isTokenError1 || isTokenError2 || isTokenError3) {
        Notiflix.Report.warning(
          "ແຈ້ງເຕືອນ",
          "ການເຂົ້າລະບົບຂອງທ່ານໄດ້ໝົດອາຍຸລົງແລ້ວ ກະລຸນາເຂົ້າລະບົບໃໝ່ອີກຄັ້ງ.",
          "ຕົກລົງ",
          () => {
            localStorage.clear();
            window.location.replace("/");
          }
        );
      }
    },
  });

  return (
    <AppContext.Provider
      value={{
        userState,
        userDispatch,
        titleState,
        titleDispatch,
        dateState,
        dateDispatch,
      }}
    >
      <ApolloProvider client={client}>
        <div className="app-container">
          <Routes />
        </div>
      </ApolloProvider>
    </AppContext.Provider>
  );
}

export { AppContext };
