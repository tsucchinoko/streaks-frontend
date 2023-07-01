import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

export const MotionBox = ({ children }: { children: ReactNode }) => {
  const buttonVariants = {
    hover: {
      scale: 1.2,
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.9,
      backgroundColor: '#66cdaa',
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
      {children}
    </motion.div>
  );
};
