import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { observer } from "mobx-react-lite";

// Styling
import styled from "styled-components";
import { motion } from "framer-motion";

const PageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AppTitle = styled.h1`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  color: ${(props) => props.theme.orange};
  margin-bottom: 2rem;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  height: 40px;
  margin-top: 1rem;
  background-color: ${(props) => props.theme.orange};
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  box-sizing: border-box;
  font-weight: 700;
  text-transform: uppercase;
`;

const FormLabel = styled.label`
  font-size: 1rem;
  color: ${(props) => props.theme.text};
  margin-bottom: 5px;
`;
const FormInput = styled(Field)`
  width: 200px;
  height: 30px;
  margin-bottom: 0.5rem;
`;

interface Values {
  login: string;
  password: string;
}

const LoginPage = observer(({ appState }: { appState: any }) => {
  const history = useHistory();

  React.useEffect(() => {
    appState.isAuth && history.push("/events");
  }, [appState.isAuth, history]);

  return (
    <PageWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <AppTitle>Eventizer</AppTitle>
      <Formik
        initialValues={{
          login: "",
          password: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            appState.login(values);
            setSubmitting(false);
          }, 500);
        }}
      >
        <StyledForm>
          <FormLabel htmlFor="login">Login</FormLabel>
          <FormInput id="login" name="login" />

          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput id="password" name="password" />

          <SubmitButton type="submit">
            {appState.isLoading ? "..." : "Log in"}
          </SubmitButton>
        </StyledForm>
      </Formik>
    </PageWrapper>
  );
});

export default LoginPage;
