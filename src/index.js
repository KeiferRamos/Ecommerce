import ReactDOM from "react-dom";
import { AppProvider } from "./GlobalContext/GlobalContext";
import App from "./main/App";

ReactDOM.render(
  <AppProvider children={<App />} />,
  document.getElementById("root")
);

for (var i = 0; i < 11; i++) {
  for (var j = 0; j < i; j++) {
    console.log("x");
  }
}
