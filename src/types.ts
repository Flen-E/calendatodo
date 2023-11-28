// src/types.ts
export interface CalendarEvent {
    date: Date;
    title: string;
  }
  
  export interface CalendarProps {
    events: CalendarEvent[];
  }
  
  export interface DayProps {
    isCurrentMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
  }
  