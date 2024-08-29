import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountCreationForm from "./components/AccountCreationForm"; // Create this component
import SuccessPage from "./components/SuccessPage"; // Create this component

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<AccountCreationForm />} />
            <Route path="/success" element={<SuccessPage />} />
        </Routes>
    </Router>
);

export default App;
