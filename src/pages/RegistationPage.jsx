import { IonContent, IonButton, IonInput, IonPage, IonText } from "@ionic/react";
import { RegisterUser } from "./Database";
import { useState } from "react";
import { Storage } from "@capacitor/storage";
import { motion } from "motion/react";

function RegistationPage(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    const saveValue = async (key, value) => {
      await Storage.set({
        key: key,
        value: value,
      });
      console.log(`${key} saved!`);
    };
    if (password == passwordRepeat) {
      const result = await RegisterUser(props.database, email, password, username);
      console.log(result);
      if (result.status == "success") {
        saveValue("Auth", "True");
        saveValue("AuthName", result.user.username);
        saveValue("AuthID", result.user.id);
        saveValue("AuthEmail", result.user.email);
        window.location.reload();
      }
    }
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="w-full h-full flex justify-center items-center"
        >
          <div className="w-full flex flex-col text-center items-center p-5">
            <p className="text-5xl text-center font-medium text-zinc-700">Sign Up</p>
            <form className="w-full items-center flex flex-col" onSubmit={(e) => handleRegister(e)}>
              <label className="form-control w-full max-w-md mt-10">
                <div className="label">
                  <span className=" font-semibold text-zinc-700">Username</span>
                </div>
                <input minLength="4" maxLength="16" required type="text" placeholder="Username" className="input input-bordered w-full" onInput={(e) => setUsername(e.target.value)} />
              </label>
              <label className="form-control w-full max-w-md mt-4">
                <div className="label">
                  <span className=" font-semibold text-zinc-700">Email</span>
                </div>
                <input required type="email" placeholder="Your email" className="input input-bordered w-full" onInput={(e) => setEmail(e.target.value)} />
              </label>
              <label className="form-control w-full  max-w-md mt-4">
                <div className="label">
                  <span className=" font-semibold text-zinc-700">Password</span>
                </div>
                <input required minLength="8" type="password" placeholder="Enter your password" className="input input-bordered w-full" onInput={(e) => setPassword(e.target.value)} />
              </label>
              <label className="form-control w-full  max-w-md">
                <div className="label">
                  <span className=" font-semibold text-zinc-700 mt-4">Repeat Password</span>
                </div>
                <input required minLength="8" type="password" placeholder="Enter your password" className="input input-bordered w-full" onInput={(e) => setPasswordRepeat(e.target.value)} />
              </label>
              <button type="submit" className="btn btn-primary text-white w-full max-w-md mt-2">
                Sign Up
              </button>
              <div className="mt-2 max-w-md">
                <span className=" font-semibold text-zinc-700 mt-4">Already have an account? </span>
                <span onClick={() => (window.location = "/login")} className=" font-semibold text-zinc-900 mt-4 hover:text-zinc-700 transition-all">
                  Sign In
                </span>
              </div>
            </form>
          </div>
        </motion.div>
      </IonContent>
    </IonPage>
  );
}

export default RegistationPage;
