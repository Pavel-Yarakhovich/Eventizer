import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import axios from "axios";

// Styling
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 1rem;
  margin-left: 1.5rem;
`;

const Header = styled.h2`
  text-transform: uppercase;
  color: ${(props) => props.theme.text};
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 400px;
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
  cursor: pointer;
`;

const FormLabel = styled.label`
  font-size: 1rem;
  color: ${(props) => props.theme.text};
  margin-bottom: 5px;
`;

const FormInput = styled(Field)`
  width: 100%;
  height: 40px;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  padding: 5px;
`;

const StyledTextarea = styled.textarea`
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  min-width: 100%;
  max-width: 100%;
  min-height: 100px;
  max-height: 100px;
  font-family: inherit;
  padding: 8px 5px;
`;

interface Values {
  name: string;
  description: string;
}

const CreateEventForm = ({
  createEvent,
}: {
  createEvent: (values: Values) => void;
}) => {
  return (
    <Wrapper>
      <Header>Create event</Header>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            createEvent(values);
            setSubmitting(false);
            resetForm();
          }, 500);
        }}
      >
        <StyledForm>
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormInput id="name" name="name" placeholder="Wedding" />

          <Field name="description">
            {({ field }: { field: any }) => (
              <div>
                <StyledTextarea placeholder="Event description" {...field} />
              </div>
            )}
          </Field>

          <SubmitButton type="submit">Submit</SubmitButton>
        </StyledForm>
      </Formik>
    </Wrapper>
  );
};

export default CreateEventForm;
