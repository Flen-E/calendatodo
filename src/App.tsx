// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CalendarComponent from './Component/CalendarComponent';
import { CalendarEvent } from './types';
import DateDetailPage from './Component/DateDetailPage';
const events: CalendarEvent[] = [
  { date: new Date(2023, 10, 1), title: 'Event 1' },
  { date: new Date(2023, 10, 15), title: 'Event 2' },
  // Add more events as needed
];

const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<CalendarComponent events={events} />} />
        <Route path="/date/:date" element={<DateDetailPage />} />
        <Route path="/*" element={<CalendarComponent events={events} />} />
      </Routes>
    </Router>
  );
};

export default App;