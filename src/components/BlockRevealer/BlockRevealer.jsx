import { useEffect, useRef } from 'react';
import anime from 'animejs';
import './BlockRevealer.css';

const BlockRevealer = ({ 
  children, 
  direction = 'lr', 
  bgcolor = '#7f40f1',
  delay = 0,
  duration = 500,
  easing = 'easeInOutQuint',
  coverArea = 0,
  isContentHidden = true,
  onStart,
  onCover,
  onComplete,
  className = ''
}) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const revealerRef = useRef(null);

  useEffect(() => {
    const reveal = () => {
      if (contentRef.current && isContentHidden) {
        contentRef.current.style.opacity = 0;
      }

      const transformSettings = {
        lr: { 
          value: 'scale3d(0,1,1)', 
          origin: { initial: '0 50%', halfway: '100% 50%' },
          axis: 'X'
        },
        rl: { 
          value: 'scale3d(0,1,1)', 
          origin: { initial: '100% 50%', halfway: '0 50%' },
          axis: 'X'
        },
        tb: { 
          value: 'scale3d(1,0,1)', 
          origin: { initial: '50% 0', halfway: '50% 100%' },
          axis: 'Y'
        },
        bt: { 
          value: 'scale3d(1,0,1)', 
          origin: { initial: '50% 100%', halfway: '50% 0' },
          axis: 'Y'
        }
      }[direction];

      if (revealerRef.current) {
        revealerRef.current.style.transform = transformSettings.value;
        revealerRef.current.style.transformOrigin = transformSettings.origin.initial;
        revealerRef.current.style.backgroundColor = bgcolor;
        revealerRef.current.style.opacity = 1;
      }

      const isHorizontal = direction === 'lr' || direction === 'rl';
      const scale = isHorizontal ? 'scaleX' : 'scaleY';
      const coverScale = 1 - (coverArea / 100);

      const timeline = anime.timeline({
        duration,
        easing,
        delay,
        begin: () => onStart?.(contentRef.current, revealerRef.current)
      });

      timeline
        .add({
          targets: revealerRef.current,
          [scale]: [0, 1],
          complete: () => {
            if (revealerRef.current) {
              revealerRef.current.style.transformOrigin = transformSettings.origin.halfway;
            }
            if (contentRef.current) {
              contentRef.current.style.opacity = 1;
            }
            onCover?.(contentRef.current, revealerRef.current);
          }
        })
        .add({
          targets: revealerRef.current,
          [scale]: [1, coverScale],
          complete: () => {
            if (revealerRef.current && coverScale === 0) {
              revealerRef.current.style.opacity = 0;
            }
            onComplete?.(contentRef.current, revealerRef.current);
          }
        });
    };

    reveal();
  }, [direction, bgcolor, delay, duration, easing, coverArea, isContentHidden, onStart, onCover, onComplete]);

  return (
    <div ref={containerRef} className={`block-revealer ${className}`}>
      <div ref={contentRef} className="block-revealer__content">
        {children}
      </div>
      <div ref={revealerRef} className="block-revealer__element"></div>
    </div>
  );
};

export default BlockRevealer;
