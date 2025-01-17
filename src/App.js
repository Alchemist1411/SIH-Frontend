import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import PredictionForm from "./components/PredictionForm";
import PredictionResult from "./components/PredictionResult";
import { makePrediction } from "./services/PredictionService";

import { Login, Signup, Registration, Landing } from "./components";

import { Navbar, Footer, Sidebar } from "./components";
import {
  Ecommerce,
  Orders,
  MarketPlace,
  FpoRegistration,
  LandingPage,
  Calendar,
  Employees,
  Customers,
  Kanban,
  ColorPicker,
  Editor,
} from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  // const [data, setData] = useState({
  //   State: 'Chattisgarh',
  //   // ... other data ...
  // });
  // const [prediction, setPrediction] = useState(null);
  // const [error, setError] = useState(null);

  // const handleChange = (event) => {
  //   setData({
  //     ...data,
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const response = await makePrediction(data);
  //     setPrediction(response.prediction);
  //     setError(null);
  //   } catch (error) {
  //     setError(error.message);
  //     setPrediction(null);
  //   }
  // };

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              <Routes>
                {/* dashboard  */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/DashBoard" element={<Ecommerce />} />

                {/* pages  */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/MarketPlace" element={<MarketPlace />} />
                <Route
                  path="/FPO Recomendation"
                  element={<FpoRegistration />}
                />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/register" element={<Registration />} />

                {/* apps  */}
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
        {/* <div className="App">
          <h1>Price Prediction</h1>
          <PredictionForm onSubmit={handleSubmit} data={data} handleChange={handleChange} />
          <PredictionResult prediction={prediction} error={error} />
        </div> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
