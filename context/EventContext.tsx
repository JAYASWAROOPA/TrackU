import React, { createContext, useState, ReactNode } from "react";

export type Event = {
  date: string;
  taskTime: string;
  title: string;
  description: string;
  bgColor: string;
};

type EventContextType = {
  events: Event[];
  addEvent: (event: Event) => void;
};

export const EventContext = createContext<EventContextType>({
  events: [],
  addEvent: () => {},
});

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (event: Event) => {
    setEvents((prev) => [...prev, event]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};
