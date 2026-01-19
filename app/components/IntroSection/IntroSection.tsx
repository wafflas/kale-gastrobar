"use client";

import Image from "next/image";
import Logo from "../shared/Logo";
import Button from "../shared/Button";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function IntroSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y1 = useTransform(smoothProgress, [0, 1], [-50, 50]); // Moves up
  const y2 = useTransform(smoothProgress, [0, 1], [50, -50]); // Moves down
  const y3 = useTransform(smoothProgress, [0, 1], [75, -75]); // Moves up faster
  const y4 = useTransform(smoothProgress, [0, 1], [-40, 40]);   // Moves down slower

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[95vh] lg:min-h-[160vh] w-full bg-cream overflow-hidden flex flex-col items-center justify-center py-12 px-4 md:py-32 md:px-6 lg:py-72 my-10"
    >
      
      {/* --- DESKTOP FLOATING IMAGES (lg and up) --- */}
      <motion.div 
        style={{ y: y1 }}
        className="hidden lg:block absolute top-[-10%] left-[-1%] w-[22%] xl:w-[28%] aspect-4/5 z-0"
      >
        <Image src="/images/IntroSection/intro1.png" alt="intro1" fill className="object-cover" />
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="hidden lg:block absolute top-[8%] right-[-2%] w-[20%] xl:w-[25%] aspect-3/5 z-0"
      >
        <Image src="/images/IntroSection/intro2.png" alt="intro2" fill className="object-cover" />
      </motion.div>

      <motion.div 
        style={{ y: y3 }}
        className="hidden lg:block absolute bottom-[10%] left-[3%] w-[18%] xl:w-[22%] aspect-4/5 z-0"
      >
        <Image src="/images/IntroSection/intro3.png" alt="intro3" fill className="object-cover" />
      </motion.div>

      <motion.div 
        style={{ y: y4 }}
        className="hidden lg:block absolute bottom-[5%] right-[8%] w-[22%] xl:w-[26%] aspect-4/3 z-0"
      >
        <Image src="/images/IntroSection/intro4.png" alt="intro4" fill className="object-cover" />
      </motion.div>

      {/* --- MOBILE FLOATING IMAGES (below lg) --- */}
      <motion.div 
        style={{ y: y1 }}
        className="lg:hidden absolute top-[5%] left-[-5%] w-[42%] aspect-4/5 z-0"
      >
        <Image src="/images/IntroSection/intro1.png" alt="intro1" fill className="object-cover" />
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="lg:hidden absolute top-[14%] right-[-8%] w-[35%] aspect-3/5 z-0"
      >
        <Image src="/images/IntroSection/intro2.png" alt="intro2" fill className="object-cover" />
      </motion.div>

      <motion.div 
        style={{ y: y3 }}
        className="lg:hidden absolute bottom-[10%] left-[-4%] w-[35%] aspect-4/5 z-0"
      >
        <Image src="/images/IntroSection/intro3.png" alt="intro3" fill className="object-cover" />
      </motion.div>

      <motion.div 
        style={{ y: y4 }}
        className="lg:hidden absolute bottom-[4%] right-[-10%] w-[50%] aspect-4/3 z-0"
      >
        <Image src="/images/IntroSection/intro4.png" alt="intro4" fill className="object-cover" />
      </motion.div>

      {/* --- CENTER CONTENT --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center max-w-[85%] md:max-w-2xl lg:max-w-3xl space-y-4 md:space-y-10"
      >
        <div className="mb-2">
          <Logo useImage={true} imageSrc="/logo2.png" size="xs" />
        </div>
        
        <h2 className="font-vollkorn text-[34px] md:text-[80px] lg:text-[100px] text-darkbrown leading-[1.1] font-medium">
          A place to find <br className="hidden md:block" /> again.
        </h2>

        <div className="space-y-3 md:space-y-8 px-2">
          <p className="font-ubuntu text-[16px] md:text-[30px] lg:text-[35px] text-darkbrown leading-tight font-light">
            We are hosts out of conviction.
          </p>
          <p className="font-ubuntu text-[13px] md:text-[18px] lg:text-[22px] text-darkbrown/80 leading-relaxed font-normal max-w-lg mx-auto">
            People who believe in good food and what it can trigger. We serve attentively, personally and with an open eye for the essentials: <span className="font-bold text-darkbrown">you.</span>
          </p>
        </div>

        <div className="pt-2 md:pt-4">
          <Button variant="primary" size="md" className="bg-darkbrown! text-cream! rounded-full px-8 md:px-10">
            RESERVE NOW
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
