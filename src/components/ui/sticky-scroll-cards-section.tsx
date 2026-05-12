import React, { useState, useEffect, useRef } from 'react';

export interface FeatureCard {
  label: string;
  title: string;
  description: string;
  imageUrl: string;
  bgColor: string;
  textColor: string;
}

const useScrollAnimation = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
};

const AnimatedHeader = ({ label, title, subtitle }: { label: string; title: string; subtitle: string }) => {
  const [headerRef, headerInView] = useScrollAnimation();
  const [pRef, pInView] = useScrollAnimation();

  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <p className="text-xs font-bold tracking-[4px] uppercase text-white/40 mb-4">{label}</p>
      <h2
        ref={headerRef as React.RefObject<HTMLHeadingElement>}
        className={`text-4xl md:text-5xl font-black uppercase tracking-tight text-white transition-all duration-700 ease-out ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {title}
      </h2>
      <p
        ref={pRef as React.RefObject<HTMLParagraphElement>}
        className={`text-base text-white/55 mt-4 transition-all duration-700 ease-out delay-200 ${pInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {subtitle}
      </p>
    </div>
  );
};

interface StickyFeatureSectionProps {
  label: string;
  title: string;
  subtitle: string;
  cards: FeatureCard[];
}

export function StickyFeatureSection({ label, title, subtitle, cards }: StickyFeatureSectionProps) {
  return (
    <div className="font-sans" style={{ background: 'var(--bg)' }}>
      <div className="px-[5%]">
        <div className="max-w-7xl mx-auto">
          <section className="py-24 md:py-32 flex flex-col items-center">
            <AnimatedHeader label={label} title={title} subtitle={subtitle} />
            <div className="w-full">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`${card.bgColor} grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-8 p-8 md:p-12 rounded-3xl mb-10 sticky`}
                  style={{ top: `${80 + index * 24}px` }}
                >
                  <div className="flex flex-col justify-center">
                    <p className="text-xs font-bold tracking-[3px] uppercase mb-3 opacity-60">{card.label}</p>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-gray-900">{card.title}</h3>
                    <p className={`${card.textColor} leading-relaxed`}>{card.description}</p>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      loading="lazy"
                      className="w-full h-56 md:h-72 rounded-2xl shadow-xl object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image'; }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
