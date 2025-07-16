import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { openModal } from "../store/slices/modalSlice";
import { fetchEvents } from "../store/slices/eventsSlice";

interface VisualEvent {
  dayCol: number;
  hour: number;
  minutes: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  dayIndex: number;
  top: number;
  height: number;
  left: number;
  width: number;
}

export default function CalenderBody() {
  const dispatch = useAppDispatch();
  const currentDateString = useAppSelector((state) => state.date.currentDate);
  const currentDate = new Date(currentDateString);
  const events = useAppSelector((state) => state.events.items);

  const overlayRef = useRef<HTMLDivElement>(null);
  const [visualEvent, setVisualEvent] = useState<VisualEvent | null>(null);

  const isModalOpen = useAppSelector((state) => state.modal.isOpen);

  const timeSlots = [
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
  ];

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const getWeekDates = () => {
    const weekDates = [];
    const dayOfWeek = currentDate.getDay();
    const sunday = new Date(currentDate);
    sunday.setDate(currentDate.getDate() - dayOfWeek);

    for (let i = 0; i < 7; i++) {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const getWeekEvents = (): CalendarEvent[] => {
    const weekDates = getWeekDates();
    const weekStrings = weekDates.map(
      (date) => date.toISOString().split("T")[0]
    );

    const overlayElement = overlayRef.current;
    if (!overlayElement) return [];

    // const rect = overlayElement.getBoundingClientRect();
    // const dayWidth = rect.width / 7;
    // const hourHeight = rect.height / 24;
    const dayWidth = 225;
    const hourHeight = 50;

    return events
      .filter((event) => weekStrings.includes(event.date))
      .map((event) => {
        const dayIndex = weekStrings.indexOf(event.date);

        const [startHour, startMin] = event.startTime.split(":").map(Number);
        const [endHour, endMin] = event.endTime.split(":").map(Number);

        const startDecimal = startHour + startMin / 60;
        const endDecimal = endHour + endMin / 60;
        const durationHours = endDecimal - startDecimal;

        return {
          ...event,
          dayIndex,
          left: dayIndex * dayWidth,
          top: startDecimal * hourHeight,
          width: dayWidth - 10,
          height: durationHours * hourHeight,
        };
      });
  };

  const handleCellClick = (timeIndex: number, dayIndex: number) => {
    const weekDates = getWeekDates();
    const selectedDate = weekDates[dayIndex];

    createEventAtPosition(dayIndex, timeIndex, 0);

    const startHour = timeIndex;
    const startTime = `${startHour.toString().padStart(2, "0")}:00`;
    const endHour = timeIndex;
    const endTime = `${endHour.toString().padStart(2, "0")}:30`;

    dispatch(
      openModal({
        timeIndex,
        dayIndex,
        selectedDate: selectedDate.toISOString().split("T")[0],
        startTime,
        endTime,
      })
    );
  };

  useEffect(() => {
    if (!isModalOpen) {
      setVisualEvent(null);
    }
  }, [isModalOpen]);

  const createEventAtPosition = (
    dayCol: number,
    hour: number,
    minutes: number = 0
  ) => {
    const overlayElement = overlayRef.current;
    if (!overlayElement) return;

    // const rect = overlayElement.getBoundingClientRect();
    // const dayWidth = rect.width / 7;
    // const hourHeight = rect.height / 24;

    const dayWidth = 225;
    const hourHeight = 50;

    const newEvent: VisualEvent = {
      dayCol,
      hour,
      minutes,
      left: dayCol * dayWidth,
      top: (hour + minutes / 60) * hourHeight,
      width: dayWidth - 30,
      height: hourHeight / 2,
    };

    setVisualEvent(newEvent);
  };

  const weekDates = getWeekDates();
  const weekEvents = getWeekEvents();

  return (
    <div className="big-calender-body">
      <div></div>
      <div></div>
      <div className="top-left-right-border"></div>
      <div className="top-left-right-border"></div>
      <div className="top-left-right-border"></div>
      <div className="top-left-right-border"></div>
      <div className="top-left-right-border"></div>
      <div className="top-left-right-border"></div>
      <div className="top-left-right-border"></div>
      {timeSlots.map((time) => (
        <React.Fragment key={time}>
          <p className="big-calender-time-text">{time}</p>
          <div className="top-border"></div>
          <div className="all-borders"></div>
          <div className="all-borders"></div>
          <div className="all-borders"></div>
          <div className="all-borders"></div>
          <div className="all-borders"></div>
          <div className="all-borders"></div>
          <div className="all-borders"></div>
        </React.Fragment>
      ))}
      <div className="overlay" ref={overlayRef}>
        <div className="overlay-grid">
          {timeSlots.map((_, timeIndex) =>
            weekDates.map((_, dayIndex) => (
              <div
                key={`${timeIndex}-${dayIndex}`}
                className="overlay-cell"
                onClick={() => handleCellClick(timeIndex, dayIndex)}
                data-time={timeIndex}
                data-day={dayIndex}
              />
            ))
          )}
        </div>

        {weekEvents.map((event) => (
          <div
            key={event.id}
            className="calendar-event"
            style={{
              position: "absolute",
              left: `${event.left}px`,
              top: `${event.top}px`,
              width: `${event.width}px`,
              height: `${event.height}px`,
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {event.title}
          </div>
        ))}

        {visualEvent && (
          <div
            className="selected"
            style={{
              position: "absolute",
              left: `${visualEvent.left}px`,
              top: `${visualEvent.top}px`,
              width: `${visualEvent.width}px`,
              height: `${visualEvent.height}px`,
            }}
          >
            New Event
          </div>
        )}
      </div>
    </div>
  );
}
