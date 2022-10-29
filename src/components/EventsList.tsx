import React from "react";
import { List } from "react-virtualized";

// Styling
import styled from "styled-components";
import { motion } from "framer-motion";

// Components
import EventCard from "./EventCard";
import Spinner from "./Spinner";

const EventsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h2`
  text-transform: uppercase;
  color: ${(props) => props.theme.text};
`;

const EventsWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow: auto;
`;

const SpinnerWrapper = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
`;

interface Props {
  events: any[];
  loading: boolean;
  error: any;
  deleteEvent: (id: any) => void;
}

const EventsList: React.FC<Props> = ({
  events,
  loading,
  error,
  deleteEvent,
}) => {
  if (loading)
    return (
      <SpinnerWrapper>
        <Spinner show={loading} />
      </SpinnerWrapper>
    );
  if (error) return <p>Error: </p>; //{error}

  return (
    <EventsContainer>
      <Header>Events</Header>
      <EventsWrapper
        initial={{ opacity: 0, x: -500 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <List
          height={500}
          width={500}
          rowCount={events.length ?? 0}
          rowHeight={182}
          rowRenderer={() =>
            events?.map((item: any, idx: number) => (
              <EventCard
                key={item.id}
                event={item}
                idx={idx}
                deleteEvent={(e) => {
                  e.stopPropagation();
                  deleteEvent(item.id);
                }}
              />
            ))
          }
        />
      </EventsWrapper>
    </EventsContainer>
  );
};

export default EventsList;
