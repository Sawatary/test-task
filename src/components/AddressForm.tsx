import { useState, useEffect, type FormEvent } from 'react';
import { useForm } from '../context/FormContext';
import type { ValidationErrors, ProductCategory } from '../types';
import { apiService } from '../services/apiService';

interface AddressFormProps {
  onNext: () => void;
  onPrev: () => void;
}

export function AddressForm({ onNext, onPrev }: AddressFormProps) {
  const { formData, updateAddress } = useForm();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string>('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setApiError('');
        const fetchedCategories = await apiService.getProductCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        setApiError('Ошибка загрузки списка мест работы');
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.address.workplace.trim()) {
      newErrors.workplace = 'Выберите место работы';
    }

    if (!formData.address.address.trim()) {
      newErrors.address = 'Адрес проживания обязателен для заполнения';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleInputChange = (field: keyof typeof formData.address, value: string) => {
    updateAddress({ [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0 d-flex align-items-center justify-content-center">
                <span className="icon icon-home me-2"></span>
                Step 2: Address & Workplace
              </h4>
              <p className="mb-0 mt-2 text-muted small">Enter your workplace and address</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label htmlFor="workplace" className="form-label">
                    Workplace <span className="text-danger">*</span>
                  </label>
                  {loading ? (
                    <div className="d-flex align-items-center">
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                      </div>
                      <span>Загрузка списка мест работы...</span>
                    </div>
                  ) : (
                    <>
                      <select
                        className={`form-select ${errors.workplace ? 'is-invalid' : ''}`}
                        id="workplace"
                        value={formData.address.workplace}
                        onChange={(e) => handleInputChange('workplace', e.target.value)}
                        disabled={loading || apiError !== ''}
                      >
                        <option value="">Select workplace</option>
                        {categories.map((category) => (
                          <option key={category.slug} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {apiError && (
                        <div className="form-text text-danger">
                          {apiError}. Используется резервный список.
                        </div>
                      )}
                    </>
                  )}
                  {errors.workplace && (
                    <div className="invalid-feedback">{errors.workplace}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Home Address <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                    id="address"
                    value={formData.address.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your home address"
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>

                <div className="d-flex justify-content-between mt-4">
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-lg"
                    onClick={onPrev}
                  >
                    <span className="icon icon-arrow-left me-2"></span>
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    { loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </span>
                        Loading...
                      </>
                    ) : (
                      <>
                        <span className="icon icon-arrow-right me-2"></span>
                        Next
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