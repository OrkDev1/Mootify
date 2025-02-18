import { IonContent, IonMenu, IonPage, IonAlert } from "@ionic/react";
import { useState, useEffect } from "react";
import { Storage } from "@capacitor/storage";
import { motion } from "framer-motion";
import { getUserFriends, AddFriend, UpdateDatabseValue } from "./Database";
import { User } from "lucide-react";
import EmotesSliderHorizontal from "./EmotesSliderHorizontal";
import Menu from "./Menu";

function Home(props) {
  const [showAlert, setShowAlert] = useState(0);
  const [email, setEmail] = useState();
  const [userID, setUserID] = useState();
  const [userName, setUserName] = useState();
  const [friendID, setFriendID] = useState();
  const [message, setMessage] = useState();
  const [friendStatus, setFriendStatus] = useState({ status: "", message: "" });
  const [friends, setFriends] = useState([]);
  const [selectedFriendIndex, setSelectedFriendIndex] = useState(0);

  async function handleSendEmote(userID, moodID, message) {
    setShowAlert(0);
    if (message != null) {
      await UpdateDatabseValue(props.database, userID, moodID, message);
    } else {
      setFriendStatus({ status: "error", message: "You need to add a message!" });
    }
  }
  async function addFriend(userID, friendID) {
    if (friendID != null && friendID != undefined && friendID.length == 8) {
      const result = await AddFriend(props.database, userID, friendID);
      setFriendStatus(result);
      setFriendID(null);
    } else {
      setFriendStatus({ status: "error", message: "Invalid Mooty ID" });
    }
  }
  useEffect(() => {
    var key = "AuthID";
    Storage.get({ key }).then(({ value }) => {
      setUserID(value);
    });
    key = "AuthName";
    Storage.get({ key }).then(({ value }) => {
      setUserName(value);
    });
    key = "AuthEmail";
    Storage.get({ key }).then(({ value }) => {
      setEmail(value);
    });
    async function getUser() {
      const result = await getUserFriends(props.database, userID);
      setFriends(result);
    }
    if (userID) getUser();
  }, [userID]);
  const saveValue = async (key, value) => {
    await Storage.set({
      key: key,
      value: value,
    });
    console.log(`${key} saved!`);
  };
  return (
    <>
      <IonMenu contentId="main-content">
        <IonContent scrollY={false} fullscreen className="ion-padding">
          <div className="flex items-center flex-col py-24 h-full">
            <h1 className="text-4xl font-semibold tracking-tight self-start text-zinc-800">Settings</h1>
            <div className="py-6 w-full flex flex-col gap-2 font-medium text-zinc-700">
              <div className="flex flex-col border-zinc-300 border-2 p-2 gap-2 rounded-lg">
                <h1 className="text-2xl font-semibold">Account</h1>
                <div className="flex gap-2 border-2 border-zinc-300 rounded-lg p-2">
                  <div className="relative flex items-center justify-center">
                    <User className="absolute stroke-zinc-400 w-10 h-10" />
                    <svg viewBox="0 0 100 100" className="w-14 fill-zinc-100 stroke-[4px] stroke-zinc-200" xmlns="http://www.w3.org/2000/svg">
                      <circle r="45" cx="50" cy="50" />
                    </svg>
                  </div>
                  <div className="flex w-full flex-col overflow-hidden whitespace-nowrap">
                    <p className="font-semibold text-md">{userName}</p>
                    <p className="font-semibold text-md flex gap-1">
                      ID: <a className="font-medium">{userID}</a>
                    </p>
                    <p className="text-sm">{email}</p>
                  </div>
                </div>
              </div>
              <div className="py-2">
                <div className="flex gap-2 border-2 flex-col rounded-lg border-zinc-300 p-2">
                  <h1 className="text-2xl font-semibold">Settings</h1>
                </div>
              </div>
            </div>
          </div>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonAlert
          isOpen={!!friendStatus.status}
          header={friendStatus.status == "error" ? "Error" : "Success"}
          message={friendStatus.message}
          buttons={[
            {
              text: "OK",
              role: "confirm",
            },
          ]}
          onDidDismiss={() => {
            setFriendStatus({ status: "", message: "" });
            window.location.reload();
          }}
        />
        <IonAlert
          header="Send Emote?"
          isOpen={parseInt(showAlert) > 0 && parseInt(showAlert) < 19}
          trigger={showAlert}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
                setShowAlert(0);
              },
            },
            {
              text: "Send",
              role: "confirm",
              handler: () => {
                handleSendEmote(friends[selectedFriendIndex].id, showAlert, message);
              },
            },
          ]}
          inputs={[
            {
              placeholder: "Message",
              type: "text",
              attributes: {
                maxlength: 32,
              },
            },
          ]}
          onInput={(e) => setMessage(e.target.value)}
        />
        <IonAlert
          header="Add Mooty"
          trigger="addfriend"
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
            },
            {
              text: "Add Mooty",
              role: "confirm",
              handler: () => {
                addFriend(userID, friendID);
              },
            },
          ]}
          inputs={[
            {
              placeholder: "User ID",
              type: "text",
              attributes: {
                maxlength: 8,
              },
            },
          ]}
          onInput={(e) => setFriendID(e.target.value)}
        />
        <IonContent scrollY={false} fullscreen>
          <div className="w-full h-full items-center flex-col justify-center flex">
            <div className="textContainer tracking-tighter pb-4 scale-y-110 border-zinc-300 w-full border-b-2">Mootify</div>
            <div className="w-full h-full">
              <div className="w-full p-4 absolute">
                <h1 className="text-3xl tracking-tighter font-semibold text-zinc-700">Mooties</h1>
                <div className="py-2 items-center overflow-x-auto w-full flex justify-start gap-8">
                  {friends.length > 0 &&
                    friends.map((friend, index) => (
                      <div key={index}>
                        <button
                          onClick={() => {
                            setSelectedFriendIndex(index);
                          }}
                          className="flex flex-col justify-center items-center"
                        >
                          <motion.span
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className={`p-1.5 shadow-md border-4 rounded-2xl ${selectedFriendIndex == index ? "border-secondary shadow-secondary" : "border-zinc-300"}`}
                          >
                            <User className="stroke-zinc-600 w-10 h-10" />
                          </motion.span>
                          <div className="text-md font-semibold text-zinc-700" key={index}>
                            {friend.username}
                          </div>
                        </button>
                      </div>
                    ))}
                </div>
              </div>
              <EmotesSliderHorizontal alertHandler={setShowAlert} />
            </div>
            <Menu />
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}

export default Home;
