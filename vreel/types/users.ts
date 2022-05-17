import type { Slide } from "./slides";
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  business_address: string;
  billing_address: string;
  website: string;
  job_title: string;
  password: string;
  password_confirm: string;
  vreel: {
    slides: Slide[];
  };
}
export interface Enterprise {
  id: string;
  name: string;
  owner: string;
  email: string;
  employees: User[];
  vreel: {
    slides: Slide[];
  };
}
