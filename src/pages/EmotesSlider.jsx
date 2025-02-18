import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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
export default function EmotesSlider(props) {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(cards.length / 2));
  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  useEffect(() => {
    const handleTouchStart = (event) => {
      touchStartY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      const touchEndY = event.touches[0].clientY;
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
      <div className="relative w-full h-80 flex flex-col items-center">
        {cards.map((card, index) => {
          const offset = index - currentIndex;
          return (
            <motion.div
              key={card.id}
              className={`absolute px-10 py-7 rounded-2xl backdrop-blur-md z-0 shadow-xl border-[3px] border-zinc-300 text-white flex flex-col items-center justify-center ${offset === 0 ? "z-10" : "z-0"}`}
              animate={{
                y: offset * -200,
                scale: offset === 0 ? 1 : 0.85,
                opacity: Math.abs(offset) > 1 ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={() => (offset === 0 ? props.alertHandler(card.id) : null)}
            >
              <img draggable={false} src={card.image} alt={card.title} className="w-52 h-52 object-cover rounded-lg mb-4" />
              <h2 className="text-3xl font-bold text-zinc-800">{card.title}</h2>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
