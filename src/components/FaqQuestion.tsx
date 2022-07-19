import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import React, { useState } from 'react';

import IFaq from '../interfaces/IFaq';

const FaqQuestion = ({ id, question, answer }: IFaq) => {
  const [answerOpened, setAnswerOpened] = useState<boolean>(false);

  return (
    <button
      className="faqQuestion"
      onClick={() => {
        setAnswerOpened(!answerOpened);
      }}
      key={id}>
      <div
        className={`faqQuestion__question ${
          answerOpened && 'faqQuestion__question--withanswer'
        }`}>
        <QuestionMarkIcon />
        <h4>{question}</h4>
        <button type="button">
          <ArrowBackIosNewIcon />
        </button>
      </div>
      {answerOpened && <p className="faqQuestion__answer">{answer}</p>}
    </button>
  );
};

export default FaqQuestion;
