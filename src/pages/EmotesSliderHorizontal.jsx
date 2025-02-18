import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

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
import Rose from "../Gifs/Rose.gif";
import Tired from "../Gifs/Tired.gif";
import Sleep from "../Gifs/Sleep.gif";

const cards = [
  { id: 1, image: Laugh, title: "Laughing" },
  { id: 2, image: Cry, title: "Crying" },
  { id: 3, image: Heart, title: "Heart" },
  { id: 4, image: LoveEyes, title: "Lovely" },
  { id: 5, image: Sleepy, title: "Sleepy" },
  { id: 6, image: Food, title: "Food" },
  { id: 7, image: Drinks, title: "Drink" },
  { id: 8, image: Melt, title: "Melting" },
  { id: 9, image: Love, title: "Love" },
  { id: 10, image: Angry, title: "Angry" },
  { id: 11, image: Shock, title: "Shock" },
  { id: 12, image: Sad, title: "Sad" },
  { id: 13, image: Eyes, title: "Eyes" },
  { id: 14, image: Rose, title: "Rose" },
  { id: 15, image: Tired, title: "Tired" },
  { id: 16, image: Sleep, title: "Sleep" },
];
export default function EmotesSliderHorizontal(props) {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(cards.length / 2));
  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  useEffect(() => {
    const handleTouchStart = (event) => {
      touchStartY.current = event.touches[0].clientX;
    };

    const handleTouchMove = (event) => {
      const touchEndY = event.touches[0].clientX;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) > 100) {
        setCurrentIndex((prev) => (deltaY < 0 ? Math.min(prev + 1, cards.length - 1) : Math.max(prev - 1, 0)));
        touchStartY.current = touchEndY;
      }
    };
    const handleScroll = (event) => {
      if (event.deltaY > 0) {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, cards.length - 1));
      }
    };

    const container = containerRef.current;
    container.addEventListener("wheel", handleScroll);
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);

    return () => {
      container.removeEventListener("wheel", handleScroll);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
  return (
    <div ref={containerRef} className="flex flex-col items-center h-full justify-center overflow-hidden">
      <div className="relative w-full h-80 flex flex-col items-center mt-20">
        {cards.map((card, index) => {
          const offset = index - currentIndex;
          return (
            <motion.div
              key={card.id}
              className={`absolute px-4 py-8 rounded-full ${offset === 0 ? "backdrop-blur-md shadow-xl border-[6px] border-secondary" : ""} text-white flex flex-col items-center justify-center`}
              animate={{
                x: offset * -185,
                y: Math.abs(offset) * 90,
                rotateZ: offset * -35,
                zIndex: offset === 0 ? 5 : Math.abs(offset),
                scale: offset === 0 ? 1 : 0.8,
                opacity: Math.abs(offset) > 1 ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <img draggable={false} src={card.image} alt={card.title} className="w-48 h-48 object-cover rounded-lg" />
            </motion.div>
          );
        })}
        <div className="absolute -bottom-36 justify-center items-center text-center w-full p-4 flex flex-col gap-3">
          <svg viewBox="0 0 100 50" className="w-full scale-x-[1.3] h-full fill-none stroke-[4px] stroke-zinc-300" xmlns="http://www.w3.org/2000/svg">
            <circle r="45" cx="50" cy="60" />
          </svg>
          <h2 className="text-5xl font-bold text-zinc-800 backdrop-blur-sm border-4 shadow-md border-zinc-300 px-4 py-2 rounded-2xl transition-all">{cards[currentIndex].title}</h2>
          <motion.div
            onClick={() => props.alertHandler(currentIndex)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="ring-4 ring-purple-500 btn btn-secondary text-white -bottom-32 text-3xl font-bold btn-block h-16 rounded-2xl shadow-lg"
          >
            Send
            <Send className="w-8 h-8" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
