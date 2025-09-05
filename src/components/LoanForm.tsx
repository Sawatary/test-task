import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useForm } from '../context/FormContext';
import { apiService } from '../services/apiService';

interface LoanFormProps {
  onPrev: () => void;
  onSubmit: () => void;
}

export function LoanForm({ onPrev, onSubmit }: LoanFormProps) {
  const { formData, updateLoan } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value);
    updateLoan({ amount });
  };

  const handleTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = parseInt(e.target.value);
    updateLoan({ term });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const title = `${formData.personal.firstName} ${formData.personal.lastName}`;
      await apiService.submitLoanApplication(title);

      onSubmit();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Произошла ошибка при отправке заявки');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatAmount = (amount: number) => `$${amount}`;

  const formatTerm = (term: number) => `${term} ${term === 1 ? 'день' : term < 5 ? 'дня' : 'дней'}`;

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0 d-flex align-items-center justify-content-center">
                <span className="icon icon-money me-2"></span>
                Step 3: Loan Parameters
              </h4>
              <p className="mb-0 mt-2 text-muted small">Choose your loan amount and term</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="amount" className="form-label d-flex justify-content-between align-items-center">
                    <span>Loan Amount:</span>
                    <strong className="text-primary fs-5">{formatAmount(formData.loan.amount)}</strong>
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    id="amount"
                    min="200"
                    max="1000"
                    step="100"
                    value={formData.loan.amount}
                    onChange={handleAmountChange}
                  />
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">$200</small>
                    <small className="text-muted">$1000</small>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="term" className="form-label d-flex justify-content-between align-items-center">
                    <span>Loan Term:</span>
                    <strong className="text-primary fs-5">{formatTerm(formData.loan.term)}</strong>
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    id="term"
                    min="10"
                    max="30"
                    step="1"
                    value={formData.loan.term}
                    onChange={handleTermChange}
                  />
                  <div className="d-flex justify-content-between">
                    <small className="text-muted">10 дней</small>
                    <small className="text-muted">30 дней</small>
                  </div>
                </div>

                <div className="alert alert-info">
                  <h6 className="d-flex align-items-center">
                    Loan Summary
                  </h6>
                  <div className="row mt-3">
                    <div className="col-6">
                      <div className="text-center">
                        <div className="h4 text-primary mb-0">{formatAmount(formData.loan.amount)}</div>
                        <small className="text-muted">Amount</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-center">
                        <div className="h4 text-primary mb-0">{formatTerm(formData.loan.term)}</div>
                        <small className="text-muted">Term</small>
                      </div>
                    </div>
                  </div>
                </div>

                {submitError && (
                  <div className="alert alert-danger" role="alert">
                    {submitError}
                  </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-lg"
                    onClick={onPrev}
                    disabled={isSubmitting}
                  >
                    <span className="icon icon-arrow-left me-2"></span>
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-success btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Submitting...</span>
                        </span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span className="icon icon-send me-2"></span>
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}