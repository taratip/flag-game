import React from 'react';
import StyleButton from './StyleButton';
import './FlagAnswer.css';

const FlagAnswer = (props) => {
  const {correct, answer, onNext} = props;

  return (
    <div className='flag-answer'>
      {correct ?
        `Correct!: ${answer}`:
        `Incorrect! Correct Answer: ${answer}`
      }
      <StyleButton text="NEXT" onClick={onNext} />
    </div>
  );
}

export default FlagAnswer;
