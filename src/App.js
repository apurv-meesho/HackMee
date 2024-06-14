import logo from './logo.svg';
import './App.css';
import Homepage from './Components/Homepage';
import GiftIdeas from './Components/GiftIdeas';
// import AllGiftIdeas from './Components/AllGiftIdeas';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/gift",
      element: <GiftIdeas />,
    },
    
  ]);
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
