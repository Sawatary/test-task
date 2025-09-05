export interface PersonalData {
  phone: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | '';
}

export interface AddressData {
  workplace: string;
  address: string;
}

export interface LoanData {
  amount: number;
  term: number;
}

export interface FormData {
  personal: PersonalData;
  address: AddressData;
  loan: LoanData;
}

export interface ProductCategory {
  slug: string;
  name: string;
  url: string;
}

export interface AddProductResponse {
  id: number;
  title: string;
  [key: string]: any;
}

export interface ValidationErrors {
  [key: string]: string;
}

export interface FormStepProps {
  onNext: () => void;
  onPrev?: () => void;
}