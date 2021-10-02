import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

// Styling
import styled from "styled-components";

// Components
import EventsList from "../../EventsList";
import LogoImg from "../../../logo.svg";
import CreateEventForm from "../../CreateEventForm";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  position: relative;
  min-height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  justify-content: flex-start;
  font-size: calc(1.5rem + 2vmin);
  color: ${(props) => props.theme.text}; ;
`;

const PageTitle = styled.h1`
  margin: 0.5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  -webkit-line-clamp: 1;
`;

const Logo = styled.img`
  height: 40vmin;
  pointer-events: none;
  position: absolute;
  top: -120px;
  right: -180px;
`;

const Content = styled.main`
  height: calc(100% - 132px);
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
`;

const EventsPage = () => {
  const [events, setEvents] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const getEvents = (): void => {
    setLoading(true);
    axios
      .get(`/events`)
      .then((res: any) => setEvents(res.data.events))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const createEvent = (values: any): void => {
    axios.post("/events", { ...values }).then(() => getEvents());
  };

  const deleteEvent = (id: any) => {
    axios
      .delete(`/events/${id}`)
      .then(() => getEvents())
      .catch((err: any) => console.log("ERROR ", err));
  };

  const { data } = useQuery("events", async () => {
    const data = await axios.get(`/events`);
    return data as unknown as any;
  });

  React.useEffect(() => {
    if (data) {
      setEvents(data?.data?.events);
    }
  }, [data]);

  React.useEffect(() => {
    getEvents();
  }, []);

  return (
    <Wrapper>
      <Header>
        <PageTitle>Eventizer</PageTitle>
        <Logo src={LogoImg} alt="logo" />
      </Header>
      <Content>
        <EventsList
          events={events}
          loading={isLoading}
          error={error}
          deleteEvent={deleteEvent}
        />
        <CreateEventForm createEvent={createEvent} />
      </Content>
    </Wrapper>
  );
};

export default EventsPage;
