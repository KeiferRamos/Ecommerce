import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./GlobalContext/GlobalContext";
import App from "./main/App";

ReactDOM.render(
  <BrowserRouter>
    <AppProvider children={<App />} />
  </BrowserRouter>,
  document.getElementById("root")
);
