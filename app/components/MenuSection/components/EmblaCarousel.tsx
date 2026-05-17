"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import "./EmblaCarousel.css";

/* ─────────────────────── helpers ─────────────────────── */

const TWEEN_FACTOR_BASE = 0.36;

const numberWithinRange = (num: number, min: number, max: number): number =>
  Math.min(Math.max(num, min), max);

/* ──────────────── useDotButton ───────────────────────── */

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return { selectedIndex, scrollSnaps, onDotButtonClick };
};

/* ──────────────── Main carousel component ───────────── */

export interface MenuGalleryItem {
  src: string;
  alt: string;
  title: string;
}

interface EmblaCarouselProps {
  slides: MenuGalleryItem[];
  options?: EmblaOptionsType;
}

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  /* ── grab the inner nodes we'll tween ── */
  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(
        ".menu-embla__slide__inner",
      ) as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current =
      TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  /* ── scale + opacity tween on scroll ── */
  const tweenScaleOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);
                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue =
            1 - Math.abs(diffToTarget * tweenFactor.current);

          /* scale: centre slide = 1, others shrink */
          const scale = numberWithinRange(tweenValue, 0, 1).toString();

          /* opacity: centre slide = 1, others dim toward 0.25 */
          const opacity = numberWithinRange(
            0.25 + tweenValue * 0.75,
            0.25,
            1,
          ).toString();

          const tweenNode = tweenNodes.current[slideIndex];
          if (tweenNode) {
            tweenNode.style.transform = `scale(${scale})`;
            tweenNode.style.opacity = opacity;
          }
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScaleOpacity(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScaleOpacity)
      .on("scroll", tweenScaleOpacity)
      .on("slideFocus", tweenScaleOpacity);
  }, [emblaApi, tweenScaleOpacity, setTweenNodes, setTweenFactor]);

  return (
    <div className="menu-embla">
      {/* viewport */}
      <div className="menu-embla__viewport" ref={emblaRef}>
        <div className="menu-embla__container">
          {slides.map((item, index) => (
            <div className="menu-embla__slide" key={item.src}>
              <div className="menu-embla__slide__inner">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 52vw, 60vw"
                  priority={index === 0}
                />
                <div className="menu-embla__slide__overlay" />
                <div className="menu-embla__slide__caption">
                  <p className="menu-embla__slide__title">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* edge-fade overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-[linear-gradient(90deg,rgba(93,62,50,1)_0%,rgba(93,62,50,0)_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-[linear-gradient(270deg,rgba(93,62,50,1)_0%,rgba(93,62,50,0)_100%)]" />

      {/* dot indicators */}
      <div className="menu-embla__dots">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onDotButtonClick(index)}
            className={"menu-embla__dot".concat(
              index === selectedIndex ? " menu-embla__dot--selected" : "",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;
