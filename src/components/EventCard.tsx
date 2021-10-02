import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// Styling
import styled, { StyledProps } from "styled-components";
import { motion } from "framer-motion";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const GRADIENTS = [
  "#614385, #516395",
  "#D4145A, #FBB03B",
  "#662D8C, #ED1E79",
  "#02AABD, #00CDAC",
  "#11998E, #38EF7D",
];

const Wrapper = styled(motion.div)`
  width: 100%;
  flex-shrink: 0;
  padding-right: 0.5rem;
  padding-bottom: 0.5rem;
  box-sizing: border-box;
  transition: all 250ms ease;
  &:hover {
    cursor: pointer;
  }
`;

const Container = styled.div<StyledProps<any>>`
  position: relative;
  height: 100%;
  overflow: auto;
  background-image: linear-gradient(
    180deg,
    ${(props) =>
      `${GRADIENTS[props.idx % GRADIENTS.length]} 30%, ${props.theme.bg}`}
  );
  border-radius: 2px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 250ms ease;
`;

const EventHeader = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  flex-shrink: 0;
  margin: 0 0.5rem 0 0;
  width: 80px;
  height: 80px;
  background: ${(props) => props.theme.bg};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.text};
  white-space: nowrap;
`;

const EventDescription = styled.div`
  margin: 0;
  p {
    display: block;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    -webkit-line-clamp: 2;
    font-size: 1rem;
    font-weight: 500;
    line-height: normal;
    letter-spacing: normal;
    color: ${(props) => props.theme.text};
    font-weight: 300;
  }
`;

const DeleteEventButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  background-color: ${(props) => props.theme.bg};
`;

interface IEvent {
  id: any;
  name: string;
  description: string;
}

const EventCard = ({
  event,
  idx,
  deleteEvent,
}: {
  event: IEvent;
  idx: number;
  deleteEvent: (e: React.MouseEvent<HTMLDivElement>, id: any) => void;
}) => {
  const history = useHistory();
  const [isHovered, setHovered] = React.useState(false);

  return (
    <Wrapper onClick={() => history.push(`/event/${event.id}`)}>
      <Container
        idx={idx}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {isHovered && (
          <DeleteEventButton onClick={(e) => deleteEvent(e, event.id)}>
            <FontAwesomeIcon icon={faTrash} size="1x" />
          </DeleteEventButton>
        )}
        <EventHeader>{event.name}</EventHeader>
        <EventDescription>
          <p>{event.description}</p>
        </EventDescription>
      </Container>
    </Wrapper>
  );
};

export default EventCard;
