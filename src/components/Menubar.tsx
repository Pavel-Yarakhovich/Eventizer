import React from "react";
import { useHistory } from "react-router-dom";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faStream } from "@fortawesome/free-solid-svg-icons";

// Store
import { AuthStore } from "../stores/AuthStore";

import styled, { StyledProps } from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 100%;
  background-color: ${(props) => props.theme.orange};
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const MenuButton = styled.button`
  width: 100%;
  min-width: 40px;
  height: 40px;
  padding: 0;
  border: 2px solid ${(props) => props.theme.bg};
  color: ${(props) => props.theme.bg};
  border-radius: 4px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 5px 0;
  transition: all 250ms ease;
  &:hover {
    box-shadow: inset 8px 0 ${(props) => props.theme.bg};
  }
`;

const ButtonLabel = styled.div<StyledProps<any>>`
  margin: 0;
  margin-right: ${(props) => (props.expanded ? "0.5rem" : "0")};
  width: ${(props) => (props.expanded ? "min-width" : "0")};
  overflow: hidden;
  color: ${(props) => props.theme.bg};
  transition: all 250ms ease;
`;

const authStore = new AuthStore();

const Menubar = () => {
  const [isMenuExpanded, setMenuExpanded] = React.useState(false);
  const [menuTabs, setMenuTabs] = React.useState<any[]>([]);

  const history = useHistory();

  React.useEffect(() => {
    const tabs: any[] = [
      {
        label: "Events",
        icon: faStream,
        action: () => history.push("/events"),
      },
      {
        label: "Logout",
        icon: faSignOutAlt,
        action: () => authStore.logout(),
      },
    ];
    setMenuTabs(tabs);
  }, [history]);

  return (
    <Wrapper
      onMouseEnter={() => setMenuExpanded(true)}
      onMouseLeave={() => setMenuExpanded(false)}
      animate={{ width: isMenuExpanded ? "200px" : "70px" }}
    >
      {menuTabs.map((tab: any, idx: number) => (
        <MenuButton key={idx} onClick={tab.action}>
          <ButtonLabel expanded={isMenuExpanded}>{tab.label}</ButtonLabel>
          <FontAwesomeIcon icon={tab.icon} />
        </MenuButton>
      ))}
    </Wrapper>
  );
};

export default Menubar;
