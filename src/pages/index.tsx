import { easeInOut, motion } from "framer-motion";
import Link from "next/link";
import { IoNewspaperOutline } from "react-icons/io5";
import { CiWarning } from "react-icons/ci";
import { FaRegStar } from "react-icons/fa";
import { MdDiversity1 } from "react-icons/md";



const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15, // delay between each child
    },
  },
};

const optionVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: easeInOut } },
};

const infopointVariants = {
  hidden: { opacity: 0, scale: 0.92, rotate: -6 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: easeInOut },
  },
};

const followPages = [
  { href: "/news", label: <div className="flex gap-2"><IoNewspaperOutline/>News</div> },
  { href: "/important", label: <div className="flex gap-2"><CiWarning/>Wichtiges</div> },
  { href: "/etc", label: <div className="flex gap-2"><FaRegStar/>Sonstiges</div>  },
  { href: "/thisisus", label: <div className="flex gap-2"><MdDiversity1/>Family</div> },
]

export default function Home() {
  return (
    <>
      <div className="w-screen h-screen justify-center items-center p-50 text-white">
        <div className="w-full h-fill grid grid-cols-2 gap-4">
          <motion.div
            className="w-full h-fill m-10 bg-markas rounded-4xl z-20 flex items-center justify-left pl-10 text-8xl"
            variants={infopointVariants}
            initial="hidden"
            animate="show"
          >
            <span>Markas Infopoint</span>
          </motion.div>
          <motion.div
            className="w-full h-full grid grid-cols-1 gap-4 p-10"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {followPages.map((page) => (
              <motion.div
                key={page.href}
                variants={optionVariants}
                className="w-full h-full p-10 bg-markas z-20 rounded-4xl flex items-center text-4xl"
              >
                <Link href={page.href}>{page.label}</Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
