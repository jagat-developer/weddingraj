"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
};

const EASE_OUT_EMIL = [0.23, 1, 0.32, 1] as const;

export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const reduce = useReducedMotion();

  // emil: never scale(0). Default state is fully laid out (impeccable: don't gate visibility).
  // We animate FROM a slightly offset starting variant only when in view.
  const variants: Variants = reduce
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 8, scale: 0.99 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.42,
            ease: EASE_OUT_EMIL,
            delay,
          },
        },
      };

  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
