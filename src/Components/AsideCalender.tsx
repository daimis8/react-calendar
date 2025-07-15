import { useDate } from "../Context/DateProvider";

export default function AsideCalender() {
  const {
    currentDate,
    goToPreviousMonth,
    goToNextMonth,
    formatDate,
  } = useDate();

  const daysToShow = getDaysToShow(currentDate);

  const getContainerClassName = (type: string) => {
    if (type === "today") {
      return "small-calender-grid-number text-black";
    }
    if (type === "current") {
      return "small-calender-grid-number text-primary";
    }
    return "small-calender-not-current-month-grid-number text-primary";
  };

  const handleLeftArrowClick = () => {
    goToPreviousMonth();
  }

  const handleRightArrowClick = () => {
    goToNextMonth();
  }

  return (
    <div>
      <div className="small-calender-header row">
        <p className="aside-calender-month-year">{formatDate(currentDate)}</p>
        <div className="row">
          <div className="arrow-container-small cursor-pointer small-calender-left-arrow" onClick={handleLeftArrowClick}>
            <img
              src="/icons/arrowLeft.svg"
              alt="Arrow left icon"
              className="arrow-small"
            />
          </div>
          <div className="arrow-container-small cursor-pointer small-calender-right-arrow" onClick={handleRightArrowClick}>
            <img
              src="/icons/arrowRight.svg"
              alt="Arrow right icon"
              className="arrow-small"
            />
          </div>
        </div>
      </div>
      <div className="small-calender-grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <div key={index} className="small-calender-grid-weekday">
            {day}
          </div>
        ))}
        {daysToShow.map((dayObj, index) => (
          <div
            key={index}
            className={
              dayObj.type === "today"
                ? "small-calender-current-day-container cursor-pointer"
                : "small-calender-number-container cursor-pointer"
            }
          >
            <div className={getContainerClassName(dayObj.type)}>
              {dayObj.day}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getDaysToShow(date: Date) {
  const daysToShow = [];

  const month = date.getMonth();
  const year = date.getFullYear();
  const today = new Date();

  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalDaysToShow = 42;
  const daysUsed = daysInMonth + firstDayOfWeek;
  const totalDaysLeftToShow = totalDaysToShow - daysUsed;

  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    daysToShow.push({ day: day, type: "notCurrent" });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      daysToShow.push({ day: day, type: "today" });
    } else {
      daysToShow.push({ day: day, type: "current" });
    }
  }

  for (let day = 1; day <= totalDaysLeftToShow; day++) {
    daysToShow.push({ day: day, type: "notCurrent" });
  }

  return daysToShow;
}
