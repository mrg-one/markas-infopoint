import { type AppType } from "next/app";
import { Geist } from "next/font/google";
import "~/styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { useRouter } from "next/router";

const geist = Geist({
  subsets: ["latin"],
});

// Generate random properties for floating objects
const NUM_OBJECTS = 40;
function useFloatingObjects() {
  return useMemo(
    () =>
      Array.from({ length: NUM_OBJECTS }).map(() => ({
        size: Math.random() * 32 + 24, // 24px - 56px
        left: Math.random() * 90 + 5, // 5% - 95%
        top: Math.random() * 90 + 5, // 5% - 95%
        delay: Math.random() * 10,
        duration: Math.random() * 10 + 10, // 10s - 20s
        color: [
          "bg-white/70 border border-white/80",
          "bg-markas/80 border border-white/40",
          "bg-white/90 border border-markas/40",
        ][Math.floor(Math.random() * 3)],
        shadow: Math.random() > 0.5 ? "shadow-lg" : "shadow-md",
      })),
    []
  );
}

const MyApp: AppType = ({ Component, pageProps }) => {
  const objects = useFloatingObjects();
  const router = useRouter();

  return (
    <div className={`${geist.className} overflow-x-hidden`}>
      <div className="fixed inset-0 -z-10 bg-white" />
      {objects.map((obj, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute rounded-full ${obj.color} ${obj.shadow}`}
          style={{
            width: obj.size,
            height: obj.size,
            left: `${obj.left}%`,
            top: `${obj.top}%`,
            backdropFilter: "blur(0px)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: obj.duration,
            delay: obj.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
      <title>Infoboard</title>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MyApp;
