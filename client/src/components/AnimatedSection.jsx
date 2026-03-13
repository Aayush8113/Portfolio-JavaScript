import { motion, useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";
import React, { forwardRef, useMemo } from "react";

/**
 * @constant {Array} CINEMATIC_EASE
 * Custom Bezier curve: Starts fast, decelerates smoothly.
 */
const CINEMATIC_EASE = [0.25, 0.46, 0.45, 0.94];

/**
 * AnimatedSection 3.0 (Architect Grade)
 * * A high-performance, accessible wrapper for scroll reveals.
 * Automatically handles 'prefers-reduced-motion' settings.
 */
const AnimatedSection = forwardRef(
  (
    {
      children,
      className = "",
      delay = 0,
      duration = 0.8,
      distance = 30,
      direction = "up",
      scale = 1,
      blur = true,
      threshold = 0.2,
      ...props // Pass through rest props (id, onClick, aria-*, etc.)
    },
    ref,
  ) => {
    // 1. Accessibility: Respect user's system motion settings
    const shouldReduceMotion = useReducedMotion();

    // 2. Memoize variants to prevent re-calculation on every render
    const variants = useMemo(() => {
      // If user prefers reduced motion, simplify to a basic fade
      if (shouldReduceMotion) {
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.5, delay },
          },
        };
      }

      // Direction Coordinate Map
      const directionMap = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance }, // Starts right, moves left
        right: { x: -distance }, // Starts left, moves right
        none: { x: 0, y: 0 },
      };

      const { x = 0, y = 0 } = directionMap[direction] || {};

      return {
        hidden: {
          opacity: 0,
          x,
          y,
          scale,
          // Using 'blur' triggers GPU compositing.
          // We condition it to save resources if disabled.
          filter: blur ? "blur(8px)" : "none",
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          // Explicitly set 'none' to ensure text is crisp after animation
          filter: "none",
          transition: {
            duration,
            ease: CINEMATIC_EASE,
            delay,
          },
        },
      };
    }, [direction, distance, scale, blur, duration, delay, shouldReduceMotion]);

    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: threshold,
          margin: "0px 0px -50px 0px",
        }} // Added margin for smoother trigger
        variants={variants}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

// 3. Debugging Name
AnimatedSection.displayName = "AnimatedSection";

// 4. Runtime Type Checking (Vital for large teams)
AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  duration: PropTypes.number,
  distance: PropTypes.number,
  direction: PropTypes.oneOf(["up", "down", "left", "right", "none"]),
  scale: PropTypes.number,
  blur: PropTypes.bool,
  threshold: PropTypes.number,
};

export default React.memo(AnimatedSection);
