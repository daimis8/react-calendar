import Header from "./Components/Header";
import Aside from "./Components/Aside";
import { DateProvider } from "./Context/DateProvider";

function App() {
  return (
    <DateProvider>
      <>
        <Header />
        <div className="main-container">
          <Aside />
        </div>
      </>
    </DateProvider>
  );
}

export default App;
