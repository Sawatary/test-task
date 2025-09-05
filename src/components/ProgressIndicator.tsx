import { useLocation } from 'react-router-dom';

interface ProgressIndicatorProps {
  currentStep?: number;
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const location = useLocation();

  const getCurrentStep = () => {
    if (currentStep !== undefined) return currentStep;
    
    switch (location.pathname) {
      case '/personal': return 1;
      case '/address': return 2;
      case '/loan': return 3;
      default: return 1;
    }
  };

  const current = getCurrentStep();
  const steps = [
    { number: 1, title: 'Personal Info', path: '/personal' },
    { number: 2, title: 'Address & Work', path: '/address' },
    { number: 3, title: 'Loan Details', path: '/loan' }
  ];

  return (
    <div className="progress-indicator">
      {steps.map((step, index) => (
        <div className="progress-items" key={step.number}>
          <div className={`progress-step ${
            step.number === current ? 'active' : 
            step.number < current ? 'completed' : ''
          }`}>
            <div className="step-number">
              {step.number < current ? '✓' : step.number}
            </div>
            <span className="d-none d-sm-inline">{step.title}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`step-connector ${
              step.number < current ? 'completed' : ''
            }`}></div>
          )}
        </div>
      ))}
    </div>
  );
}