import { useAppSelector } from "../store/hooks";

function getWeekDates(date: Date) {
    const today = new Date();
    const weekDates = [];
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();
  
    const sunday = new Date(currentDate);
    sunday.setDate(currentDate.getDate() - dayOfWeek);
  
    for (let i = 0; i < 7; i++) {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
  
      const isToday = date.toDateString() === today.toDateString();
  
      weekDates.push({
        day: date.getDate(),
        isToday: isToday,
      });
    }
  
    return weekDates;
  }

export default function CalenderHeader() {
  const currentDateString = useAppSelector((state) => state.date.currentDate);
  const currentDate = new Date(currentDateString);
  const weekDates = getWeekDates(currentDate);

  return (
    <div className="calendar-header-sticky">
      <div className="row">
        <div className="spacer-large"></div>
        {weekDates.map((dayObj, index) => (
          <div key={index} className="big-calender-date-container">
            <div className="weekday-text">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index]}
            </div>
            <div
              className={
                dayObj.isToday
                  ? "big-calender-today-container"
                  : "big-calender-number-container"
              }
            >
              <div className="weekday-number">{dayObj.day}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="spacer-horizontal time-zone-text">GMT+03</div>
    </div>
  );
}
