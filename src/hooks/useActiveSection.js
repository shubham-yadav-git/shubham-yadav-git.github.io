import { useState, useEffect } from 'react';

const SECTIONS = ['hero', 'about', 'skills', 'resume', 'projects', 'blog', 'contact'];

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observers = [];
    const visibilityMap = {};

    const updateActive = () => {
      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let mostVisible = activeSection;
      for (const id of SECTIONS) {
        const ratio = visibilityMap[id] || 0;
        if (ratio > maxRatio) {
          maxRatio = ratio;
          mostVisible = id;
        }
      }
      if (maxRatio > 0) {
        setActiveSection(mostVisible);
      }
    };

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            visibilityMap[id] = entry.intersectionRatio;
          });
          updateActive();
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.75, 1.0] }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return activeSection;
}
