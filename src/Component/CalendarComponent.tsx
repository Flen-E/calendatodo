// src/components/Calendar.tsx
import React from 'react';
import Calendar from 'react-calendar';
import styled, { keyframes } from 'styled-components';
import { CalendarProps } from '../types';
import { useNavigate } from 'react-router-dom';

const BGAnimation = keyframes`
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
`;

const GradientBackground = styled.div`
  background: linear-gradient(-45deg, #96fbc4 0%, #f9f586 100%);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center; 
  background-size: 400% 400%;
  animation: ${BGAnimation} 5s ease infinite;
  
a {
  text-decoration:none;
  color:inherit;
}
  
`;

const StyledCalendar = styled(Calendar)`
  max-width: 900px; /* Increase the max-width for a wider calendar */
  background: #F2BC79;
  border-radius: 10px;
  box-shadow: 0 0 20px #e0e0e0;
  padding : 20px 20px;
  font-family: insungitCutelivelyjisu, sans-serif, Arial;

  

  & .react-calendar__tile--now {
    background: #C5FFF8;
    color: black;
  }

  & .react-calendar__tile--hover {
    background: #7B66FF;
    color: white;
  }

  & .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
      background-color: #7B66FF;
  }

  & .react-calendar__tile {
    width: calc(100% / 7);
    padding: 10px;
    text-align: left; /* Align text to the left */
    font-size: 16px;
  }
  & .react-calendar__month-view__days__day {
    background-color: #F2DBCE;
    height : 100px;
  }

  & .react-calendar__tile:enabled:active {
    background-color: #7B66FF;
  }

  & .react-calendar__month-view__days__day--weekend {
    color: #FF0000; /* Red color for Sunday */
  }

  & .react-calendar__month-view__days__day--weekend:enabled:hover {
    color: #0000FF; /* Blue color for Saturday */
  }

  & .react-calendar__month-view__days__day--neighboringMonth {
    color: #999999;
  }

  & .react-calendar__tile:enabled {
    display: flex;
    align-items: flex-start;
  }

  
  & .react-calendar__month-view__weekdays__weekday {
    text-align: center;
    margin : 10px 0px;
    font-size : 20px;

    
  }
  & .react-calendar__tile{
    border: none;
  }

  & abbr{
    font-family: insungitCutelivelyjisu, sans-serif, Arial;
    text-decoration: none;
  }

  & .react-calendar__navigation{
    padding-top : 10px;
    padding-bottom : 20px;
    text-align: center;
    font-family: insungitCutelivelyjisu, sans-serif, Arial;
  }
  
  & .react-calendar__navigation__label__labelText{
    font-family: insungitCutelivelyjisu, sans-serif, Arial;
    font-size : 30px;
    
  }
  & .react-calendar__navigation__label{
    background: #F2BC79;
    border : none;
    
  }

  & .react-calendar__navigation__next-button{
    background: #F2BC79;
    border : none;
    font-size: 30px;
    font-weight : bold;

  }

  & .react-calendar__navigation__prev-button{
    background: #F2BC79;
    border : none;
    font-size: 30px;
    font-weight : bold;

  }

  & .react-calendar__navigation__next2-button{
    display: none;
  }

  & .react-calendar__navigation__prev2-button{
    display: none;
  }

  & .react-calendar__navigation__arrow:hover{
    color: red;
    cursor : pointer;
  }

  & .react-calendar__navigation__label{
    pointer-events: none;
  }

`;

const CustomCalendar: React.FC<CalendarProps> = ({ events }) => {
  const navigate = useNavigate();

  const handleDateClick = (value: Date) => {
    const formattedDate = value.toLocaleDateString().split('T')[0];
    navigate(`/date/${formattedDate}`);
  };

  return (
    <GradientBackground>
      <StyledCalendar
        tileContent={({ date }) => {
          const hasEvent = events.some(event => event.date.toDateString() === date.toDateString());
          return hasEvent ? <div className="event-dot" /> : null;
        }}
        calendarType="US"
        onClickDay={handleDateClick}
      />
    </GradientBackground>
  );
};

export default CustomCalendar;
