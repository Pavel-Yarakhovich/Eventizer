import React from "react";

// Styling
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled(motion.div)`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  color: ${(props) => props.theme.text};
  animation: ${rotate} 2s linear infinite;
`;

const Spinner = ({ show }: { show: boolean }) => {
  return (
    <AnimatePresence>
      {show && (
        <Wrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SpinnerWrapper>
            <FontAwesomeIcon icon={faSpinner} size="3x" />
          </SpinnerWrapper>
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default Spinner;
