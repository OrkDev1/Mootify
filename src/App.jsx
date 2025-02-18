import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useEffect, useState } from "react";
import { CreateDatabaseClient } from "./pages/Database";
import { Storage } from "@capacitor/storage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegistationPage from "./pages/RegistationPage";
import OneSignal from "onesignal-cordova-plugin";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
//import "@ionic/react/css/palettes/dark.system.css";

import "./theme/variables.css";
import { initBLE, writeData } from "./pages/BLE";

setupIonicReact();

const supabase = CreateDatabaseClient();

const App = () => {
  const [authStatus, setAuthStatus] = useState(null);
  if (typeof window !== "undefined" && "OneSignal" in window) {
    OneSignal.initialize("97ca7130-46f6-48fc-9a66-027c02be6339");
    OneSignal.Notifications.addEventListener("click", async (e) => {
      let clickData = await e.notification.additionalData.mood;
      let clickText = await e.notification.additionalData.message;
      console.log("Received Mood: " + clickData);
      console.log("Received Text: " + clickText);
      const device = await initBLE();
      await writeData(device.deviceId, clickData + "&" + clickText);
    });
  }
  useEffect(() => {
    var key = "Auth";
    Storage.get({ key }).then(({ value }) => {
      setAuthStatus(value);
    });
    if (typeof window !== "undefined" && "OneSignal" in window) {
      OneSignal.Notifications.requestPermission(true).then((success) => {
        console.log("Notification permission granted " + success);
      });
    }
  }, []);
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            {authStatus == "True" ? <Home database={supabase} /> : <Redirect to="/register" />}
          </Route>
          <Route exact path="/register">
            {authStatus == "True" ? <Redirect to="/home" /> : <RegistationPage database={supabase} />}
          </Route>
          <Route exact path="/login">
            {authStatus == "True" ? <Redirect to="/home" /> : <LoginPage database={supabase} />}
          </Route>
          <Route exact path="/">
            <Redirect to={authStatus == "True" ? "/home" : "/register"} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
