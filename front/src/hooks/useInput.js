import {useState} from 'react';

export const UseInput = (initialState, place = 'Type something...') => {
  const [value, setValue] = useState(initialState)
  return [
    {
      value,
      onChange: e => setValue(e.target.value),
      placeholder: place
    },
    () => setValue(initialState)
  ]
};