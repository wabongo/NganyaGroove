import { useEffect, useRef } from 'react';
import './TiltCard.css';

const TiltCard = ({ children, className = '', options = {} }) => {
  const cardRef = useRef(null);
  const boundingRef = useRef(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  const defaultOptions = {
    perspective: 1000,
    scale: 1.05,
    rotation: {
      x: 20,  // max rotation in degrees
      y: 20,
      z: 0
    },
    transition: {
      duration: 400,  // ms
      easing: 'cubic-bezier(.03,.98,.52,.99)'
    },
    shine: true
  };

  const mergedOptions = { ...defaultOptions, ...options };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMouseEnter = (e) => {
      const cardBounds = card.getBoundingClientRect();
      boundingRef.current = {
        top: cardBounds.top,
        left: cardBounds.left,
        width: cardBounds.width,
        height: cardBounds.height
      };
      
      card.style.transition = 'none';
      if (mergedOptions.shine) {
        const shine = card.querySelector('.shine');
        if (shine) shine.style.transition = 'none';
      }
    };

    const onMouseMove = (e) => {
      if (!boundingRef.current) return;

      const bounds = boundingRef.current;
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      
      const rotateX = ((mouseY - bounds.height / 2) / bounds.height) * mergedOptions.rotation.x * -1;
      const rotateY = ((mouseX - bounds.width / 2) / bounds.width) * mergedOptions.rotation.y;

      mousePositionRef.current = { x: mouseX, y: mouseY };

      card.style.transform = `
        perspective(${mergedOptions.perspective}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(${mergedOptions.scale}, ${mergedOptions.scale}, ${mergedOptions.scale})
      `;

      if (mergedOptions.shine) {
        const shine = card.querySelector('.shine');
        if (shine) {
          const brightness = 0.5 + (mouseY / bounds.height) * 0.5;
          shine.style.background = `linear-gradient(
            ${Math.atan2(mouseY - bounds.height / 2, mouseX - bounds.width / 2) * (180 / Math.PI)}deg,
            rgba(255,255,255,${brightness}) 0%,
            rgba(255,255,255,0) 80%
          )`;
        }
      }
    };

    const onMouseLeave = () => {
      boundingRef.current = null;
      card.style.transition = `transform ${mergedOptions.transition.duration}ms ${mergedOptions.transition.easing}`;
      card.style.transform = `
        perspective(${mergedOptions.perspective}px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
      `;

      if (mergedOptions.shine) {
        const shine = card.querySelector('.shine');
        if (shine) {
          shine.style.transition = `opacity ${mergedOptions.transition.duration}ms ${mergedOptions.transition.easing}`;
          shine.style.opacity = '0';
        }
      }
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', onMouseEnter);
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [mergedOptions]);

  return (
    <div ref={cardRef} className={`tilt-card ${className}`}>
      {mergedOptions.shine && <div className="shine" />}
      <div className="tilt-card-content">
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
