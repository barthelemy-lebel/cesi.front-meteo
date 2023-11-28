import React from 'react';
import PropTypes from 'prop-types';
import '../boxdoc.css';

const BoxDoc = (props) => {
  const {
    title,
    alertText,
    alertIcon,
    recommendationText,
    learnMoreLink,
  } = props;

  return (
    <div className="box-doc-container">
      <div className="box-doc">
        {title && <h2>{title}</h2>}
        {alertText && (
          <div className="alert">
            {alertIcon && <div className="icon">{alertIcon}</div>}
            <p>{alertText}</p>
          </div>
        )}
        {recommendationText && (
          <div className="recommendation">
            <p className="recommendation-title">Recommandation :</p>
            <p className="recommendation-text">{recommendationText}</p>
          </div>
        )}
        {learnMoreLink && (
        <div className="learn-more">
          <p>
            Pour en savoir plus, cliquez ici :{' '}
            <a className="orange-link" href={learnMoreLink}>
              {learnMoreLink}
            </a>
          </p>
        </div>
      )}
      </div>
    </div>
  );
};

BoxDoc.propTypes = {
  title: PropTypes.string,
  alertText: PropTypes.string,
  alertIcon: PropTypes.element,
  recommendationText: PropTypes.string,
  learnMoreLink: PropTypes.string,
};

export default BoxDoc;