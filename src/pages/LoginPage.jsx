import { IonContent, IonPage } from "@ionic/react";
import { LoginUser } from "./Database";
import { useState } from "react";
import { Storage } from "@capacitor/storage";
import { motion } from "motion/react";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const saveValue = async (key, value) => {
      await Storage.set({
        key: key,
        value: value,
      });
      console.log(`${key} saved!`);
    };
    const result = await LoginUser(props.database, email, password);
    if (result.status == "success") {
      saveValue("Auth", "True");
      saveValue("AuthName", result.username);
      saveValue("AuthID", result.message.user.id.slice(0, 8));
      saveValue("AuthEmail", result.message.user.email);
      window.location.reload();
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
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-full flex flex-col text-center items-center p-5">
              <p className="text-5xl text-center font-medium text-zinc-700">Sign In</p>
              <form className="w-full items-center flex flex-col" onSubmit={(e) => handleLogin(e)}>
                <label className="form-control w-full max-w-md mt-10">
                  <div className="label">
                    <span className=" font-semibold text-zinc-700">Email</span>
                  </div>
                  <input type="email" placeholder="Your email" className="input input-bordered w-full" onInput={(e) => setEmail(e.target.value)} />
                </label>
                <label className="form-control w-full  max-w-md mt-4">
                  <div className="label">
                    <span className=" font-semibold text-zinc-700">Password</span>
                  </div>
                  <input type="password" placeholder="Enter your password" className="input input-bordered w-full" onInput={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit" className="btn btn-primary text-white w-full max-w-md mt-2">
                  Sign In
                </button>
                <div className="mt-2 max-w-md">
                  <span className=" font-semibold text-zinc-700 mt-4">Don't have an account? </span>
                  <span onClick={() => (window.location = "/register")} className=" font-semibold text-zinc-900 mt-4 hover:text-zinc-700 transition-all">
                    Sign Up
                  </span>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </IonContent>
    </IonPage>
  );
}

export default LoginPage;
