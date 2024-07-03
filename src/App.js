import Home from "./components/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import MovieDetails from "./components/MovieDetails";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/add-movie", element: <AddMovie /> },
    {path: "/edit-movie/:id", element:<AddMovie/>},
    { path: "/movie-details/:id", element: <MovieDetails /> },
  ]);

  return (
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
        <div className="bg-image">
          <RouterProvider router={router} />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
