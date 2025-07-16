import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  goToPreviousWeek,
  goToNextWeek,
  goToToday,
} from "../store/slices/dateSlice";
import { formatDate } from "../utils/dateUtils";

export default function Header() {
  const dispatch = useAppDispatch();
  const currentDateString = useAppSelector((state) => state.date.currentDate);
  const currentDate = new Date(currentDateString);

  const handleTodayClick = () => {
    dispatch(goToToday());
  };

  const handleLeftArrowClick = () => {
    dispatch(goToPreviousWeek());
  };
  const handleRightArrowClick = () => {
    dispatch(goToNextWeek());
  };

  return (
    <header className="header-container row">
      <div className="icon-and-logo-container">
        <div className="main-icon-container cursor-pointer">
          <img
            src="/icons/menuIcon.svg"
            alt="Menu icon"
            className="menu-icon"
          />
        </div>

        <img
          src="/images/Logo.png"
          alt="Calender logo"
          height="30"
          width="34"
        />

        <p className="logo-text">Calendar</p>
      </div>

      <div className="header-second-part row">
        <div className="after-logo-first-part row">
          <button className="button-header" onClick={handleTodayClick}>
            Today
          </button>

          <div className="arrows-container row">
            <div
              className="arrow-container-big cursor-pointer left-header-arrow"
              onClick={handleLeftArrowClick}
            >
              <img
                src="/icons/arrowLeft.svg"
                alt="Arrow left icon"
                className="arrow-big"
              />
            </div>

            <div
              className="arrow-container-big cursor-pointer right-header-arrow"
              onClick={handleRightArrowClick}
            >
              <img
                src="/icons/arrowRight.svg"
                alt="Arrow right icon"
                className="arrow-big"
              />
            </div>
          </div>
          <p className="header-date-text">{formatDate(currentDate)}</p>
        </div>

        <button className="button-header row">
          Week
          <img
            src="/icons/triangleDown.svg"
            alt="Dropdown icon"
            className="dropdown-triangle"
          />
        </button>
      </div>
    </header>
  );
}
