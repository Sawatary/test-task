import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import { PersonalForm } from './components/PersonalForm';
import { AddressForm } from './components/AddressForm';
import { LoanForm } from './components/LoanForm';
import { SuccessModal } from './components/SuccessModal';
import { ProgressIndicator } from './components/ProgressIndicator';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function PersonalFormWrapper() {
  const navigate = useNavigate();
  return <PersonalForm onNext={() => navigate('/address')} />;
}

function AddressFormWrapper() {
  const navigate = useNavigate();
  return (
    <AddressForm 
      onNext={() => navigate('/loan')}
      onPrev={() => navigate('/personal')}
    />
  );
}

function LoanFormWrapper({ onSubmit }: { onSubmit: () => void }) {
  const navigate = useNavigate();
  return (
    <LoanForm 
      onPrev={() => navigate('/address')}
      onSubmit={onSubmit}
    />
  );
}

function App() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleFormSubmit = () => {
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <FormProvider>
      <Router>
        <div className="min-vh-100 bg-light">
          <nav className="navbar navbar-dark bg-primary">
            <div className="container">
              <span className="navbar-brand mb-0 h1">Loan Application</span>
            </div>
          </nav>

          <ProgressIndicator />

          <Routes>
            <Route path="/" element={<Navigate to="/personal" replace />} />
            <Route path="/personal" element={<PersonalFormWrapper />} />
            <Route path="/address" element={<AddressFormWrapper />} />
            <Route path="/loan" element={<LoanFormWrapper onSubmit={handleFormSubmit} />} />
          </Routes>

          <SuccessModal 
            isOpen={showSuccessModal} 
            onClose={handleModalClose}
          />
        </div>
      </Router>
    </FormProvider>
  );
};

export default App;
