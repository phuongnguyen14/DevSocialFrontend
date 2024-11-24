import { useState } from "react";
import { motion } from "framer-motion"; // Thư viện Framer Motion

export default function AnimatedIcon({ isOpen }) {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: isOpen ? 90 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        width: "24px",
        height: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isOpen ? (
          // ExpandMoreIcon
          <path
            d="M12 16.5l6-6h-12z"
            fill="#fff"
            stroke="#fff"
            strokeWidth="2"
          />
        ) : (
          // DragHandleIcon (2 gạch ngang)
          <>
            <rect x="4" y="8" width="16" height="2" fill="#fff" />
            <rect x="4" y="14" width="16" height="2" fill="#fff" />
          </>
        )}
      </svg>
    </motion.div>
  );
}
