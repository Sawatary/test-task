import { useState, type FormEvent } from 'react';
import { IMaskInput } from 'react-imask';
import { useForm } from '../context/FormContext';
import type { ValidationErrors } from '../types';

interface PersonalFormProps {
  onNext: () => void;
}

export function PersonalForm({ onNext }: PersonalFormProps) {
  const { formData, updatePersonal } = useForm();
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.personal.phone || formData.personal.phone.replace(/\D/g, '').length !== 10) {
      newErrors.phone = 'Введите корректный номер телефона в формате 0XXX XXX XXX';
    }

    if (!formData.personal.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно для заполнения';
    }

    if (!formData.personal.lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна для заполнения';
    }

    if (!formData.personal.gender) {
      newErrors.gender = 'Выберите пол';
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

  const handleInputChange = (field: keyof typeof formData.personal, value: string) => {
    updatePersonal({ [field]: value });
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
                <span className="icon icon-user me-2"></span>
                Step 1: Personal Information
              </h4>
              <p className="mb-0 mt-2 text-muted small">Enter your basic information</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <IMaskInput
                    mask="0000 000 000"
                    value={formData.personal.phone}
                    onAccept={(value) => handleInputChange('phone', value as string)}
                    className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    type="tel"
                    placeholder="0XXX XXX XXX"
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    id="firstName"
                    value={formData.personal.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">{errors.firstName}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    id="lastName"
                    value={formData.personal.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">{errors.lastName}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender <span className="text-danger">*</span>
                  </label>
                  <select
                    className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
                    id="gender"
                    value={formData.personal.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value as 'male' | 'female')}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender && (
                    <div className="invalid-feedback">{errors.gender}</div>
                  )}
                </div>

                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    <span className="icon icon-arrow-right me-2"></span>
                    Next
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