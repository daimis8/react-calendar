import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeModal } from "../store/slices/modalSlice";
import { addEvent } from "../store/slices/eventsSlice";

const generateTimeOptions = (startFromNext = false) => {
  const options = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      if (startFromNext && hour === 0 && minute === 0) continue;

      const time24 = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;

      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const displayTime = `${displayHour}:${minute
        .toString()
        .padStart(2, "0")} ${period}`;

      options.push({
        value: time24,
        label: displayTime,
      });
    }
  }

  return options;
};

const generateDateOptions = () => {
  const options = [];
  const today = new Date();

  for (let i = -30; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const day = date.getDate();

    options.push({
      value: date.toISOString().split("T")[0],
      label: `${weekday}, ${month} ${day}`,
    });
  }

  return options;
};

export default function Modal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const loading = useAppSelector((state) => state.events.loading);
  const selectedTimeSlot = useAppSelector(
    (state) => state.modal.selectedTimeSlot
  );

  const dateOptions = generateDateOptions();
  const startTimeOptions = generateTimeOptions(false);
  const endTimeOptions = generateTimeOptions(true);

  useEffect(() => {
    if (isOpen && selectedTimeSlot) {
      setFormData((prev) => ({
        ...prev,
        date: selectedTimeSlot.selectedDate || "",
        startTime: selectedTimeSlot.startTime || "",
        endTime: selectedTimeSlot.endTime || "",
      }));
    }
  }, [isOpen, selectedTimeSlot]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        description: "",
      });
    }
  }, [isOpen]);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    dispatch(addEvent(formData));
    dispatch(closeModal());
    setFormData({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
    });
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      alert("Title is required");
      return false;
    }
    if (!formData.date) {
      alert("Date is required");
      return false;
    }
    if (!formData.startTime) {
      alert("Start time is required");
      return false;
    }
    if (!formData.endTime) {
      alert("End time is required");
      return false;
    }
    if (
      formData.startTime &&
      formData.endTime &&
      formData.endTime <= formData.startTime
    ) {
      alert("End time must be after start time");
      return false;
    }
    return true;
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      style={{ display: "flex" }}
      onClick={handleOverlayClick}
    >
      <div className="modal-container">
        <div className="top-bar-container">
          <div
            className="close-icon-container cursor-pointer"
            onClick={handleClose}
          >
            <img src="/icons/close.svg" alt="close.svg" />
          </div>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add title"
            className="title cursor-pointer"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <div className="date-choice-container">
            <select
              id="eventDate"
              className="event-date cursor-pointer"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            >
              <option value="">Select Date</option>
              {dateOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              id="eventStartTime"
              className="event-time-selector cursor-pointer"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
            >
              <option value="">Start</option>
              {startTimeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <p className="time-from-to-symbol">-</p>

            <select
              id="eventEndTime"
              className="event-time-selector cursor-pointer"
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
            >
              <option value="">End</option>
              {endTimeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <textarea
            name="description"
            placeholder="Add description"
            rows={4}
            className="form-description cursor-pointer"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
          <button
            type="submit"
            className="form-save-button cursor-pointer"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
