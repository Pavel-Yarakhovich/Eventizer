import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Formik, Field, Form, FormikHelpers } from "formik";
import axios from "axios";

// Styling
import styled from "styled-components";
import { motion } from "framer-motion";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../Spinner";

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
  color: ${(props) => props.theme.text};
`;

const Button = styled.button`
  width: 6rem;
  padding: 0.5rem;
  box-sizing: border-box;
  border: 2px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  border-radius: 4px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const EditButton = styled(Button)``;

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

interface IEvent {
  name: string;
  description: string;
}

const EventPage = () => {
  const { id }: { id: string } = useParams();

  const [eventData, setEventData] = React.useState<IEvent | null>(null);
  const [isEditMode, setEditMode] = React.useState(false);

  const { isLoading, isError, data, error } = useQuery("event", async () => {
    const data = await axios.get(`/events/${id}`);
    return data as unknown as any;
  });

  React.useEffect(() => {
    data?.data?.event && setEventData(data.data.event);
  }, [data]);

  if (isLoading) return <Spinner show={isLoading} />;
  if (isError) return <p>Error: {error}</p>;

  if (!eventData) return null;

  if (isEditMode) {
    return (
      <Wrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Header>Edit event</Header>
        <Formik
          initialValues={{
            name: eventData.name,
            description: eventData.description,
          }}
          onSubmit={(
            values: IEvent,
            { setSubmitting, resetForm }: FormikHelpers<IEvent>
          ) => {
            setTimeout(() => {
              axios.put(`/events/${id}`, { ...values });
              setSubmitting(false);
              resetForm();
              setEventData(values);
              setEditMode(false);
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
  }

  return (
    <Wrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2>{eventData.name}</h2>
      <p>{eventData.description}</p>
      <EditButton onClick={() => setEditMode(true)}>
        <FontAwesomeIcon icon={faEdit} />
      </EditButton>
    </Wrapper>
  );
};

export default EventPage;
