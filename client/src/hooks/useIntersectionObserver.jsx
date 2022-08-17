import { useEffect, useState } from 'react';

/**
 * input variable reference will be a React ref retrieved with useRef
 * creates new intersectionobserver instance and pass it callback function
 * check if there is reference passsed in then start observing
 * when component is unmounted we will stop observing it
 * @param {object} reference
 * @returns boolean
 */

export const useIntersectionObserver = (reference) => {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      //callback function that does something when item becomes visible
      const handleIntersect = (entries, observer) => {
         //entries is array of items being observed
         if (entries[0].isIntersecting) {
            setTimeout(() => {
               setIsVisible(true);
               observer.unobserve(entries[0].target);
               observer.disconnect();
            }, '100');
         }
      };
      const observer = new IntersectionObserver(handleIntersect);
      if (reference) {
         observer.observe(reference.current);
      }
      return () => observer.disconnect();
   }, [reference]);
   return isVisible;
};
