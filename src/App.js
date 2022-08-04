import Header from "./components/Header";
import Hero from "./components/Hero";
import Home from "./components/Home";

import {
  Routes,
  Route,
} from "react-router-dom";
import Chat from "./components/Chat";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Hero/>} />
        </Route>
          <Route path="/channels" element={<Home />}>
            <Route path=":id" element={<Chat/>} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
