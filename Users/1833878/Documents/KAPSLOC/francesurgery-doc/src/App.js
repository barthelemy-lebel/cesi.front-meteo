import React from 'react';
import BoxDoc from './components/boxdoc';

const App = () => {
  return (
    <div>
      <BoxDoc
        title="Alimentation"
        alertText="attention si tu amgne trop c'est des kilos quentu vas )."
        alertIcon={<span>👍</span>}
        recommendationText="Il est recommandé de manger de la viande."
        learnMoreLink="https://france-surgery.com/fr/"
      />
    </div>
  );
};

export default App;
