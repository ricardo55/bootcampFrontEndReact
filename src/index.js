// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//import Clase1 from "./clase_1";
////import Clase2 from "./clase_2";
//import Clase3 from "./clase_3";
import RetoVideo from './verVideos';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <StrictMode>
  //<Clase3 />
  // </StrictMode>
  <RetoVideo />

);
