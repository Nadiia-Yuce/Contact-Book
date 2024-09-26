import { motion } from "framer-motion";
import css from "./LoadingCloud.module.css";

export default function LoadingCloud() {
  return (
    <motion.div
      className={css.cloud}
      animate={{ y: [0, -20, 0] }}
      transition={{
        repeat: Infinity, // безкінечне повторення
        duration: 2,
        ease: "easeInOut",
      }}
    >
      <div className={css.cloudShape}>
        <p className={css.loadingText}>Loading...</p>
      </div>
    </motion.div>
  );
}
