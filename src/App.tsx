import Header from "./Components/Header";
import Aside from "./Components/Aside";
import Calender from "./Components/Calender";
import Modal from "./Components/Modal";
import { fetchEvents } from "./store/slices/eventsSlice";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch])

  return (
    <>
      <Header />
      <div className="main-container">
        <Aside />
        <Calender />
      </div>
      <Modal />
    </>
  );
}

export default App;
