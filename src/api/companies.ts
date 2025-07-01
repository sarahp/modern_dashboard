import LoadingSpinner from "../utils/loadingSpinner";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Company {
  number: string;
  name: string;
  total_users: number;
  total_payments: number;
  number_paid: number;
}

export async function fetchCompanies(): Promise<Company[]> {
  const res = await fetch(`${BASE_URL}/companies`);
  if (!res.ok) {
    LoadingSpinner({ message: "Failed to fetch companies" });
  }
  return res.json();
}
