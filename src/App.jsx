import TrafficLight from "./components/TrafficLight"
import Header from "./components/Header";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import { TrafficLightsProvider } from "./context/TrafficLightContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <TrafficLightsProvider>
        <div className="App">
          <Header />
          <div className="container">
            <Outlet />
          </div>
        </div>
      </TrafficLightsProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "vertical",
        element: (
          <div className="traffic-light-vertical">
            <TrafficLightsProvider id={1}><TrafficLight /></TrafficLightsProvider>
          </div>
        ),
      },
      {
        path: "horizontal",
        element: (
          <div className="traffic-light-horizontal">
            <TrafficLightsProvider id={2}><TrafficLight /></TrafficLightsProvider>
          </div>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  ) ;
}

export default App;
