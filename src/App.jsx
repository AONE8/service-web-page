import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import MainPage from "./pages/Main/Main";
import RootLayout from "./pages/Root";
import { WOAServiceAction } from "./pages/WOAService";
import ErrorPage from "./pages/Error/Error";

function App() {
  // визначення маршрутів вебінтерфейсу
  const router = createBrowserRouter([
    {
      path: "/",
      id: "root",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Navigate to="/main" />,
        },
        {
          path: "main",
          element: <MainPage />,
        },
      ],
    },
    // визначення шляху, що виконує action для відправки даних на сервер
    {
      path: "/api/woa-selection",
      element: <p>No content</p>,
      action: WOAServiceAction,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
