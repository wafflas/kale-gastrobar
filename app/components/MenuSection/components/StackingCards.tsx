"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PolaroidImage from "./PolaroidImage";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CardData {
  title: string;
  description: string;
  src: string;
  rotation: number;
}

const cards: CardData[] = [
  {
    title: "Delicious Dish 1",
    description:
      "Our chef's creative inspiration combines flavors that dance on your palate.",
    src: "/images/MenuSection/menu1.webp",
    rotation: -6,
  },
  {
    title: "Delicious Dish 2",
    description:
      "A story between tradition and innovation, crafted with finest seasonal ingredients.",
    src: "/images/MenuSection/menu2.webp",
    rotation: 4,
  },
  {
    title: "Delicious Dish 3",
    description:
      "Cooking as storytelling - our dishes are both crisp and ethereal.",
    src: "/images/MenuSection/menu3.webp",
    rotation: -3,
  },
  {
    title: "Delicious Dish 4",
    description:
      "The coastlines of flavor documented in our latest culinary creation.",
    src: "/images/MenuSection/menu4.webp",
    rotation: 5,
  },
  {
    title: "Delicious Dish 5",
    description:
      "Our chef shares the first chapter of the latest menu project.",
    src: "/images/MenuSection/menu5.webp",
    rotation: -2,
  },
];

export default function StackingCards() {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);

  const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref, card5Ref];

  useEffect(() => {
    if (!cardsContainerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const createTimeline = (start: string) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsContainerRef.current?.closest("section"),
            start: start,
            end: "+=1600",
            scrub: 1,
          },
        });

        tl.addLabel("card1");
        tl.to(card1Ref.current, { yPercent: 0, opacity: 1 });

        tl.from(card2Ref.current, { yPercent: 75, opacity: 0 });
        tl.addLabel("card2");
        tl.to(
          card1Ref.current,
          { scale: 0.925, yPercent: -0.75, opacity: 1 },
          "-=0.3",
        );
        tl.to(card2Ref.current, { yPercent: 0, opacity: 1 });

        tl.from(card3Ref.current, { yPercent: 75, opacity: 0 });
        tl.addLabel("card3");
        tl.to(
          card2Ref.current,
          { scale: 0.95, yPercent: -0.5, opacity: 1 },
          "-=0.3",
        );
        tl.to(card3Ref.current, { yPercent: 0, opacity: 1 });

        tl.from(card4Ref.current, { yPercent: 75, opacity: 0 });
        tl.addLabel("card4");
        tl.to(
          card3Ref.current,
          { scale: 0.98, yPercent: -0.4, opacity: 1 },
          "-=0.3",
        );
        tl.to(card4Ref.current, { yPercent: 0, opacity: 1 });

        tl.from(card5Ref.current, { yPercent: 75, opacity: 0 });
        tl.addLabel("card5");
        tl.to(
          card4Ref.current,
          { scale: 0.99, yPercent: -0.3, opacity: 1 },
          "-=0.3",
        );
        tl.to(card5Ref.current, { yPercent: 0, opacity: 1 });

        tl.to(
          card1Ref.current,
          { scale: 0.925, yPercent: -1.5, opacity: 0.9 },
          "-=0.3",
        );
        tl.to(
          card2Ref.current,
          { scale: 0.95, yPercent: -1.125, opacity: 0.9 },
          "-=0.3",
        );
        tl.to(
          card3Ref.current,
          { scale: 0.98, yPercent: -0.85, opacity: 0.9 },
          "-=0.3",
        );

        return tl;
      };

      //here is the "lock" on viewport before the scrolling animation starts

      // Desktop
      mm.add("(min-width: 1024px)", () => {
        createTimeline("top top");
      });

      // iPad / Tablet
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        createTimeline("top -100%");
      });

      // Mobile
      mm.add("(max-width: 767px)", () => {
        createTimeline("center center");
      });
    }, cardsContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardsContainerRef}
      className="relative flex justify-center items-center h-[28vh] md:h-[58vh] mb-24 -mt-10"
    >
      {cards.map((card, index) => (
        <div
          key={index}
          ref={cardRefs[index]}
          className="absolute w-[62%] md:w-[58%] h-[28vh] md:h-[58vh] flex justify-center items-center"
          style={{
            top: `${index * 16}px`,
            zIndex: index + 2,
          }}
        >
          <div className="origin-center scale-100 lg:scale-[1.32]">
            <PolaroidImage
              src={card.src}
              alt={card.title}
              width={320}
              height={368}
              rotation={card.rotation}
              className="shadow-xl select-none pointer-events-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
