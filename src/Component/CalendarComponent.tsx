// src/components/Calendar.tsx
import React, { ReactEventHandler, useEffect, useState } from "react";
import Calendar from "react-calendar";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { CalendarProps } from "../types";
import { useNavigate } from "react-router-dom";

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
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 400% 400%;
  animation: ${BGAnimation} 5s ease infinite;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const StyledCalendar = styled(Calendar)`
  max-width: 900px; /* Increase the max-width for a wider calendar */
  background: #f2bc79;
  border-radius: 10px;
  box-shadow: 0 0 20px #e0e0e0;
  padding: 20px 20px;
  font-family: insungitCutelivelyjisu, sans-serif, Arial;

  .react-calendar__tile {
    position: relative;
  }

  .event-heart-container {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
  }
  .event-heart {
    position: relative;
    width: 50px;
    height: 45px;
  }
  .event-heart:before,
  .event-heart:after {
    position: absolute;
    content: "";
    left: 25px;
    top: 0;
    width: 25px;
    height: 40px;
    background: #d7553f;
    border-radius: 50px 50px 0 0;
    transform: rotate(-45deg);
    transform-origin: 0 100%;
  }
  .event-heart:after {
    left: 0;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
  }

  & .react-calendar__tile--now {
    background: #c5fff8;
    color: black;
  }

  & .react-calendar__tile--hover {
    background: #7b66ff;
    color: white;
  }

  & .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #7b66ff;
  }

  & .react-calendar__tile {
    width: calc(100% / 7);
    padding: 10px;
    text-align: left; /* Align text to the left */
    font-size: 16px;
  }
  & .react-calendar__month-view__days__day {
    background-color: #f2dbce;
    height: 10vh;

  }

  & .react-calendar__tile:enabled:active {
    background-color: #7b66ff;
  }

  & .react-calendar__month-view__days__day--weekend {
    color: #ff0000; /* Red color for Sunday */
  }

  & .react-calendar__month-view__days__day--weekend:enabled:hover {
    color: #0000ff; /* Blue color for Saturday */
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
    margin: 10px 0px;
    font-size: 20px;
  }
  & .react-calendar__tile {
    border: none;
  }

  & abbr {
    font-family: insungitCutelivelyjisu, sans-serif, Arial;
    text-decoration: none;
  }

  & .react-calendar__navigation {
    padding-top: 10px;
    padding-bottom: 20px;
    text-align: center;
    font-family: insungitCutelivelyjisu, sans-serif, Arial;
  }

  & .react-calendar__navigation__label__labelText {
    font-family: insungitCutelivelyjisu, sans-serif, Arial;
    font-size: 30px;
  }
  & .react-calendar__navigation__label {
    background: #f2bc79;
    border: none;
  }

  & .react-calendar__navigation__next-button {
    background: #f2bc79;
    border: none;
    font-size: 30px;
    font-weight: bold;
  }

  & .react-calendar__navigation__prev-button {
    background: #f2bc79;
    border: none;
    font-size: 30px;
    font-weight: bold;
  }

  & .react-calendar__navigation__next2-button {
    display: none;
  }

  & .react-calendar__navigation__prev2-button {
    display: none;
  }

  & .react-calendar__navigation__arrow:hover {
    color: red;
    cursor: pointer;
  }

  & .react-calendar__navigation__label {
    pointer-events: none;
  }
`;

const CalendarComponent: React.FC<CalendarProps> = ({ events }) => {
  const navigate = useNavigate();
  const [buttonClicked, setButtonClicked] = useState(0);

   const handleClick = () => {
    setButtonClicked((prev) => {
      if (prev > 100000) prev = 0;
      return prev + 1;
    });
  };
  useEffect(() => {
    const markedDates = Object.keys(localStorage);

    markedDates.forEach((date) => {
      // 형식을 일치시키기 위해 new Date(date) 사용
      // date가 현재 2020. 12. 14 식으로 나오는 걸 2020년 12월 14일 로 바꿔주면됨
      const dateObject = new Date(date.replace(/\./g, "/"));

      // 월과 일을 가져와서 월은 0부터 시작하므로 1을 더해줌
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();

      // 변환된 날짜를 문자열로 조합
      const formattedDate = `${year}년 ${month}월 ${day}일`;
      

      // aria-label과 현재 달력의 날짜가 일치하는지 확인
      const tile = document.querySelector(`[aria-label="${formattedDate}"]`);
      if(tile == null) return;

      if (tile) {
        const dotContainer = document.createElement("div");
        dotContainer.classList.add("event-heart-container");
        tile.appendChild(dotContainer);

        const dot = document.createElement("div");
        dot.classList.add("event-heart");
        dotContainer.appendChild(dot);
      }
    });
  }, [buttonClicked]);

  const handleDateClick = (value: Date) => {
    const formattedDate = value.toLocaleDateString().split("T")[0];
    navigate(`/date/${formattedDate}`);
  };

  return (
    <GradientBackground>
      <StyledCalendar
        calendarType="US"
        formatDay={(locale, date) => date.toLocaleString("en", {day: "numeric"})}
        onClickDay={handleDateClick}
        prevLabel={<div onClick={handleClick}>&lt;</div>} // prev2 버튼
        nextLabel={<div onClick={handleClick}>&gt;</div>} // next2 버튼
      />
    </GradientBackground>
  );
};

export default CalendarComponent;
