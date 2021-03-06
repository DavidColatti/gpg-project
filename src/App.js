import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import Header from "./components/Header";
import UserList from "./components/UserList";
import MainArea from "./components/MainArea";

const AppContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const App = (props) => {
  const [authorList, setAuthorList] = useState(() => null);
  const [authorSelected, setAuthorSelected] = useState(() => null);

  useEffect(() => {
    async function fetchData() {
      let res = await axios.get("https://jsonplaceholder.typicode.com/users");

      setAuthorList(res.data);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header
        {...props}
        authorSelected={authorSelected}
        setAuthorSelected={setAuthorSelected}
      />

      <AppContent className="app-content">
        {authorList && (
          <UserList
            setAuthorSelected={setAuthorSelected}
            authorList={authorList}
          />
        )}

        <Route
          path="/author/:id"
          render={(props) => (
            <MainArea
              {...props}
              // location={location}
              authorList={authorList}
              setAuthorSelected={setAuthorSelected}
              authorSelected={authorSelected}
            />
          )}
        />
      </AppContent>
    </div>
  );
};

export default App;
