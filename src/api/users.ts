import loadingSpinner from "../utils/loadingSpinner";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  payment: {
    amount: number;
    payment_date: string;
    number_made: number;
  };
  company: {
    name: string;
  };
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) {
    loadingSpinner({ message: "Failed to fetch users" });
  }
  return await res.json();
}
