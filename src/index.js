import ReactDOM from "react-dom";
import { AppProvider } from "./GlobalContext/GlobalContext";
import App from "./main/App";

ReactDOM.render(
  <AppProvider children={<App />} />,
  document.getElementById("root")
);
