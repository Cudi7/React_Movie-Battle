import { useState } from 'react';

function useInput() {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    // advance solution, for when we have more than one input type (name, password, email, etc...)
    // setInput({ [e.target.name]: [e.target.value] });

    setInput(e.target.value);
  };

  const reset = () => {
    setInput('');
  };

  return [input, handleChange, reset];
}

export default useInput;
