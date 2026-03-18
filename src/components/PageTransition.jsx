import { motion } from "framer-motion";

// variants define the 3 animation states
// you can tweak these values to change the feel
const variants = {
  initial: { opacity: 0, y: 16 },   // starts slightly below, invisible
  animate: { opacity: 1, y: 0 },    // settles into place, fully visible
  exit:    { opacity: 0, y: -16 },  // slides up and fades out
};

export const PageTransition = ({ children })=> {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}