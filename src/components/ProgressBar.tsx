import React from 'react';

const BadgeList = () => {
  // inline styling for dynamic progression bar
  const progressionArticle = '90%';
  const progressionPackage = '50%';
  const progressionQuiz = '90%';
  const stylesArticle = { determinate: { width: progressionArticle } };
  const stylesPackage = { determinate: { width: progressionPackage } };
  const stylesQuiz = { determinate: { width: progressionQuiz } };

  return (
    <div className="progressBar">
      <div className="progressBar__card">
        <p className="progressBar__card__percent">{progressionArticle}</p>
        <div className="progressBar__card__smallText">
          <h2 className="progressBar__card__smallText__title">Articles Lus</h2>
          <p className="progressBar__card__smallText__current">Rank actuel</p>
        </div>
        <p className="progressBar__card__next">Dans x articles: prochain reward</p>
        <div className="progressBar__card__readArticles">
          <div
            style={stylesArticle.determinate}
            className="progressBar__card__readArticles__bar determinate">
            {progressionArticle}
          </div>
        </div>
      </div>
      <div className="progressBar__card">
        <p className="progressBar__card__percent">{progressionPackage}</p>
        <div className="progressBar__card__smallText">
          <h2 className="progressBar__card__smallText__title">Package completés</h2>
          <p className="progressBar__card__smallText__current">Rank actuel</p>
        </div>
        <p className="progressBar__card__next">Dans x articles: prochain reward</p>
        <div className="progressBar__card__packagesCompleted">
          <div
            style={stylesPackage.determinate}
            className="progressBar__card__packageCompleted__bar determinate">
            {progressionPackage}
          </div>
        </div>
      </div>
      <div className="progressBar__card">
        <p className="progressBar__card__percent">{progressionQuiz}</p>
        <div className="progressBar__card__smallText">
          <h2 className="progressBar__card__smallText__title">Quiz reussis</h2>
          <p className="progressBar__card__smallText__current">Rank actuel</p>
        </div>
        <p className="progressBar__card__next">Dans x articles: prochain reward</p>
        <div className="progressBar__card__quizz">
          <div
            style={stylesQuiz.determinate}
            className="progressBar__card__quiz__bar determinate">
            {progressionQuiz}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeList;
