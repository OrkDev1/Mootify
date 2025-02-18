import { motion } from "framer-motion";
import { Settings, LogOut } from "lucide-react";
import { IonMenuToggle, IonAlert } from "@ionic/react";
import { useState } from "react";
import { UserPlus, PowerOff, RefreshCcw } from "lucide-react";
import { Storage } from "@capacitor/storage";
import { refreshMood } from "./Database";
import { initBLE, writeData } from "./BLE";

export default function Menu(props) {
  const [dataStatus, setDataStatus] = useState(true);
  const [inputValue, setInputValue] = useState(true);
  const [refreshStatus, setRefreshStatus] = useState(false);
  async function handleRefresh() {
    var returnValue = await refreshMood(props.database, props.user);
    console.log(returnValue);
    if (returnValue.status) {
      setRefreshStatus(true);
    }
  }
  return (
    <>
      <IonAlert
        header="Sign Out?"
        trigger="SignOutAlertTrigger"
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Ok",
            role: "confirm",
            handler: () => {
              Storage.remove({ key: "Auth" });
              Storage.remove({ key: "AuthID" });
              Storage.remove({ key: "AuthName" });
              Storage.remove({ key: "AuthEmail" });
              window.location.reload();
            },
          },
        ]}
      />
      <IonAlert
        header="Mood Update"
        isOpen={refreshStatus}
        buttons={[
          {
            text: "Display",
            role: "confirm",
            handler: async () => {
              setRefreshStatus(false);
              const device = await initBLE();
              await writeData(device.deviceId, data.mood + "&" + data.message);
            },
          },
        ]}
      />
      <div className="flex justify-around items-center border-t-2 shadow-inner border-zinc-300 p-3 w-full">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="text-zinc-600 border-[4px] border-zinc-300 rounded-xl p-3">
          <IonMenuToggle>
            <Settings className="h-12 w-12" />
          </IonMenuToggle>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="text-zinc-600 border-[4px] rounded-xl border-zinc-300 p-3" id="SignOutAlertTrigger">
          <LogOut className="h-12 w-12" />
        </motion.div>
        <motion.div
          id="addfriend"
          onClick={() => setDataStatus(!dataStatus)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="text-zinc-600 border-[4px] rounded-xl border-zinc-300 p-3"
        >
          <UserPlus className="h-12 w-12" />
        </motion.div>
        <motion.div onClick={() => handleRefresh()} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="text-zinc-600 border-[4px] rounded-xl border-zinc-300 p-3">
          <RefreshCcw className="h-12 w-12" />
        </motion.div>
      </div>
    </>
  );
}
