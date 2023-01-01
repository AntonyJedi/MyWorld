import React, {useState, useEffect} from 'react'

export const useScroll = (initialState) => {
  const [scroll, setScroll] = useState(initialState);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 200);
    });
  }, []);
  return scroll
}