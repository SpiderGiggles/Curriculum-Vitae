export interface userCredentials {
  email: string;
  password: string;
}

export interface registerData {
  firstName: string;
  lastName: string;
  dob: string;       // YYYY-MM-DD
  street: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}