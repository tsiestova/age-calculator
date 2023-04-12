import "./App.css";
import Card from "./components/Card";
import { createContext, useState } from "react";
export const UserContext = createContext(null);

function App() {
  const initialState = {
    year: {
      value: "",
    },
    month: {
      value: "",
    },
    day: {
      value: "",
    },

    isSubmitting: "",
  };

  const [userData, setUserData] = useState(initialState);

  const data = {
    userData,
    setUserData,
  };

  return (
    <div className="App">
      <UserContext.Provider value={data}>
        <Card />
      </UserContext.Provider>
    </div>
  );
}

export default App;
