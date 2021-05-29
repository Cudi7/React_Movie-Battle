import { useState } from 'react';

function useLocalStorage(initialVal) {
  const [val] = useState(() => {
    let val;
    try {
      val = window.localStorage.getItem(initialVal)
        ? JSON.parse(window.localStorage.getItem(initialVal))
        : initialVal;
    } catch (error) {
      console.log(error.message);
      val = initialVal;
    }
    return val;
  });

  const handleVal = (newVal) => {
    window.localStorage.setItem(initialVal, JSON.stringify(newVal));
  };

  const restoreVal = (val) => {
    window.localStorage.removeItem(val);
  };

  return [val, handleVal, restoreVal];
}

export default useLocalStorage;
