import { motion } from "framer-motion";
import { Settings, LogOut } from "lucide-react";
import { IonMenuToggle, IonAlert } from "@ionic/react";
import { useState } from "react";
import { UserPlus, PowerOff } from "lucide-react";
import { Storage } from "@capacitor/storage";
import { initBLE } from "./BLE";

export default function Menu() {
  const [dataStatus, setDataStatus] = useState(true);
  const [inputValue, setInputValue] = useState(true);
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
      <div className="flex justify-around items-center border-t-2 shadow-inner border-zinc-300 p-3 w-full">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="text-zinc-600 border-[4px] border-zinc-300 rounded-xl p-3">
          <IonMenuToggle>
            <Settings className="h-12 w-12" />
          </IonMenuToggle>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="text-zinc-600 border-[4px] rounded-xl border-zinc-300 p-3" id="SignOutAlertTrigger">
          <LogOut className="h-12 w-20" />
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
      </div>
    </>
  );
}
