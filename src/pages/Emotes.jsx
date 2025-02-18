import { IonButton } from "@ionic/react";

import Laugh from "../Gifs/Laugh.gif";
import Cry from "../Gifs/Cry.gif";
import Heart from "../Gifs/Heart.gif";
import LoveEyes from "../Gifs/LoveEyes.gif";
import Sleepy from "../Gifs/Sleepy.gif";
import Food from "../Gifs/Food.gif";
import Drinks from "../Gifs/Drinks.gif";
import Melt from "../Gifs/Melt.gif";
import Love from "../Gifs/Love.gif";
import Angry from "../Gifs/Angry.gif";
import Shock from "../Gifs/Shock.gif";
import Sad from "../Gifs/Sad.gif";
import Eyes from "../Gifs/Eyes.gif";
import HeartPink from "../Gifs/HeartPink.gif";
import Tired from "../Gifs/Tired.gif";
import Walking from "../Gifs/Walking.gif";
import Sleep from "../Gifs/Sleep.gif";
import Kiss from "../Gifs/Kiss.gif";

export default function Emotes(props) {
  return (
    <div className="w-full grid grid-rows-6 grid-cols-2 md:grid-cols-3 gap-5 overflow-y-auto justify-center p-5">
      <IonButton
        id="1"
        onClick={() => props.alertHandler(1)}
        fill="clear"
        className="no-ripple w-full active:scale-90 active:transition-all hover:-rotate-2 hover:-translate-y-2 hover:-translate-x-2 transition-all border-4 border-zinc-400 shadow-md rounded-xl aspect-square"
      >
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Laugh} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Laughing</p>
        </div>
      </IonButton>
      <IonButton id="2" onClick={() => props.alertHandler(2)} fill="clear" className="no-ripple w-full active:scale-90 active:transition-all hover:-translate-y-2 transition-all border-4 shadow-md rounded-xl border-zinc-400 aspect-square">
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Heart} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Heart</p>
        </div>
      </IonButton>
      <IonButton
        id="3"
        onClick={() => props.alertHandler(3)}
        fill="clear"
        className="no-ripple w-full active:scale-90 active:transition-all hover:rotate-2 hover:-translate-y-2 hover:translate-x-2 transition-all border-4 border-zinc-400 shadow-md rounded-xl aspect-square"
      >
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={HeartPink} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Heart</p>
        </div>
      </IonButton>
      <IonButton
        id="4"
        onClick={() => props.alertHandler(4)}
        fill="clear"
        className="no-ripple w-full active:scale-90 active:transition-all hover:-rotate-2 hover:-translate-y-2 hover:-translate-x-2 transition-all border-4 shadow-md border-zinc-400 rounded-xl aspect-square"
      >
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={LoveEyes} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Love</p>
        </div>
      </IonButton>
      <IonButton id="5" onClick={() => props.alertHandler(5)} fill="clear" className="no-ripple w-full active:scale-90 active:transition-all hover:-translate-y-2 transition-all border-4 shadow-md border-zinc-400 rounded-xl aspect-square">
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Love} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Lovely</p>
        </div>
      </IonButton>
      <IonButton
        id="6"
        onClick={() => props.alertHandler(6)}
        fill="clear"
        className="no-ripple w-full active:scale-90 active:transition-all hover:rotate-2 hover:-translate-y-2 hover:translate-x-2 transition-all border-4 border-zinc-400 shadow-md  rounded-xl aspect-square"
      >
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Food} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Food</p>
        </div>
      </IonButton>
      <IonButton
        id="7"
        onClick={() => props.alertHandler(7)}
        fill="clear"
        className="no-ripple w-full active:scale-90 active:transition-all hover:-rotate-2 hover:-translate-y-2 hover:-translate-x-2 transition-all border-4 shadow-md border-zinc-400 rounded-xl aspect-square"
      >
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Drinks} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Drinks</p>
        </div>
      </IonButton>
      <IonButton id="8" onClick={() => props.alertHandler(8)} fill="clear" className="no-ripple w-full active:scale-90 active:transition-all hover:-translate-y-2 transition-all border-4 shadow-md border-zinc-400 rounded-xl aspect-square">
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Sleepy} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Sleepy</p>
        </div>
      </IonButton>
      <IonButton
        id="9"
        onClick={() => props.alertHandler(9)}
        fill="clear"
        className="no-ripple w-full active:scale-90 active:transition-all hover:rotate-2 hover:-translate-y-2 hover:translate-x-2 transition-all border-4 shadow-md border-zinc-400 rounded-xl aspect-square"
      >
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Sleep} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Sleep</p>
        </div>
      </IonButton>
      <IonButton
        id="10"
        onClick={() => props.alertHandler(10)}
        fill="clear"
        className="no-ripple w-full active:scale-90 active:transition-all hover:-rotate-2 hover:-translate-y-2 hover:-translate-x-2 transition-all border-4 shadow-md border-zinc-400 rounded-xl aspect-square"
      >
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Angry} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Angry</p>
        </div>
      </IonButton>
      <IonButton id="11" onClick={() => props.alertHandler(11)} fill="clear" className="no-ripple w-full active:scale-90 active:transition-all hover:-translate-y-2 transition-all border-4 shadow-md border-zinc-400 rounded-xl aspect-square">
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Shock} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Shock</p>
        </div>
      </IonButton>
      <IonButton
        id="12"
        onClick={() => props.alertHandler(12)}
        fill="clear"
        className="no-ripple w-full active:scale-90 active:transition-all hover:rotate-2 hover:-translate-y-2 hover:translate-x-2 transition-all border-4 shadow-md border-zinc-400 rounded-xl aspect-square"
      >
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Sad} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Sad</p>
        </div>
      </IonButton>
      <IonButton
        id="13"
        onClick={() => props.alertHandler(13)}
        fill="clear"
        className="no-ripple w-full active:scale-90 active:transition-all hover:-rotate-2 hover:-translate-y-2 hover:-translate-x-2 transition-all border-4 shadow-md border-zinc-400 rounded-xl aspect-square"
      >
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Cry} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Cry</p>
        </div>
      </IonButton>
      <IonButton id="14" onClick={() => props.alertHandler(14)} fill="clear" className="no-ripple w-full active:scale-90 active:transition-all hover:-translate-y-2 transition-all border-4 shadow-md border-zinc-400 rounded-xl aspect-square">
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Tired} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Tired</p>
        </div>
      </IonButton>
      <IonButton
        id="15"
        onClick={() => props.alertHandler(15)}
        fill="clear"
        className="no-ripple w-full active:scale-90 active:transition-all hover:rotate-2 hover:-translate-y-2 hover:translate-x-2 transition-all border-4 shadow-md border-zinc-400 rounded-xl aspect-square"
      >
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Eyes} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Eyes</p>
        </div>
      </IonButton>
      <IonButton
        id="16"
        onClick={() => props.alertHandler(16)}
        fill="clear"
        className="no-ripple w-full active:scale-90 active:transition-all hover:-rotate-2 hover:-translate-y-2 hover:-translate-x-2 transition-all border-4 shadow-md border-zinc-400 rounded-xl aspect-square"
      >
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Walking} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Walking</p>
        </div>
      </IonButton>
      <IonButton id="17" onClick={() => props.alertHandler(17)} fill="clear" className="no-ripple w-full active:scale-90 active:transition-all hover:-translate-y-2 transition-all border-4 shadow-md border-zinc-400 rounded-xl aspect-square">
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Melt} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Melting</p>
        </div>
      </IonButton>
      <IonButton
        id="18"
        onClick={() => props.alertHandler(18)}
        fill="clear"
        className="no-ripple w-full active:scale-90 active:transition-all hover:rotate-2 hover:-translate-y-2 hover:translate-x-2 transition-all border-4 shadow-md border-zinc-400 rounded-xl aspect-square"
      >
        <div className="w-full h-full flex flex-col items-center gap-3 md:gap-5 justify-center p-3 md:p-5">
          <img src={Kiss} width={164} alt="Emoji" />
          <p className="text-lg md:text-2xl font-semibold text-zinc-800">Kiss</p>
        </div>
      </IonButton>
    </div>
  );
}
