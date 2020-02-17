import React from "react";
import "./App.css";
import Routes from "../../components/Routes/Routes";
import configureStore from "../../redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();

function App() {
  return (
    <ReduxProvider store={store}>
      <div className="App">
        <header className="App-header">Speedy maths</header>
        <Routes></Routes>
      </div>
    </ReduxProvider>
  );
}

export default App;
