import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { FormData, PersonalData, AddressData, LoanData } from '../types';

const initialState: FormData = {
  personal: {
    phone: '',
    firstName: '',
    lastName: '',
    gender: ''
  },
  address: {
    workplace: '',
    address: ''
  },
  loan: {
    amount: 200,
    term: 10
  }
};

type FormAction = 
  | { type: 'UPDATE_PERSONAL'; payload: Partial<PersonalData> }
  | { type: 'UPDATE_ADDRESS'; payload: Partial<AddressData> }
  | { type: 'UPDATE_LOAN'; payload: Partial<LoanData> }
  | { type: 'RESET_FORM' };

function formReducer(state: FormData, action: FormAction): FormData {
  switch (action.type) {
    case 'UPDATE_PERSONAL':
      return {
        ...state,
        personal: { ...state.personal, ...action.payload }
      };
    case 'UPDATE_ADDRESS':
      return {
        ...state,
        address: { ...state.address, ...action.payload }
      };
    case 'UPDATE_LOAN':
      return {
        ...state,
        loan: { ...state.loan, ...action.payload }
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

interface FormContextType {
  formData: FormData;
  updatePersonal: (data: Partial<PersonalData>) => void;
  updateAddress: (data: Partial<AddressData>) => void;
  updateLoan: (data: Partial<LoanData>) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export function FormProvider({ children }: FormProviderProps) {
  const [formData, dispatch] = useReducer(formReducer, initialState);

  const updatePersonal = (data: Partial<PersonalData>) => {
    dispatch({ type: 'UPDATE_PERSONAL', payload: data });
  };

  const updateAddress = (data: Partial<AddressData>) => {
    dispatch({ type: 'UPDATE_ADDRESS', payload: data });
  };

  const updateLoan = (data: Partial<LoanData>) => {
    dispatch({ type: 'UPDATE_LOAN', payload: data });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const value: FormContextType = {
    formData,
    updatePersonal,
    updateAddress,
    updateLoan,
    resetForm
  };

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}