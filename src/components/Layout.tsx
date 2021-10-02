import React from "react";
import { useHistory } from "react-router-dom";

// Styling
import styled from "styled-components";

// Components
import Menubar from "./Menubar";

const Wrapper = styled.div`
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  display: flex;
  align-items: stretch;
  background-color: ${(props) => props.theme.bg};
`;

const PageContent = styled.div`
  flex-grow: 1;
`;

const Layout = ({ children, appState }: { children: any; appState: any }) => {
  const history = useHistory();
  React.useEffect(() => {
    if (!appState.isAuth) {
      history.push("/login");
    }
  }, [appState, history]);
  return (
    <Wrapper>
      <Menubar />
      <PageContent>{children}</PageContent>
    </Wrapper>
  );
};

export default Layout;
