import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ExpenseManager from './components/ExpenseManager';

const App = () => {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ExpenseManager />} />
            {/* Additional routes can be added here */}
          </Routes>
        </div>
      </Router>
  );
};

export default App;
