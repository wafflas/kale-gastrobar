import { motion } from "framer-motion";

export default function FortressScroll() {
  return (
    <div className="w-full h-full overflow-visible">
      <motion.svg
        viewBox="-50 -50 1797 1368"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
      >
        <defs>
          <path
            id="curvedTextPath"
            d="M0 0.5 H1100 Q1153.38 0.5 1200 20 L1450 105 Q1485.25 118.373 1520 150 L1620 310 Q1646.19 344.431 1665 390 L1690 590 Q1696 630.771 1696 680 V1267.5"
          />
          
          <clipPath id="revealClip">
            <motion.rect
              x="0"
              y="-90"
              height="1368"
              variants={{
                hidden: { width: 0 },
                visible: { width: 1750 }
              }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
            />
          </clipPath>
        </defs>

        <text
          className="font-vollkorn font-bold uppercase"
          clipPath="url(#revealClip)"
          style={{
            fontSize: "100px",
            fill: "var(--color-cream)",
            stroke: "var(--color-darkbrown)",
            strokeWidth: "3px",
            paintOrder: "stroke fill",
            letterSpacing: "0.08em"
          }}
        >
          <textPath
            href="#curvedTextPath"
            startOffset="0%"
            spacing="exact"
          >
            Elevated evenings by the fortress walls...
          </textPath>
        </text>
      </motion.svg>
    </div>
  );
}
