import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { fetchUsers } from "../api/users";
import type { User } from "../api/users";
import LoadingSpinner from "../utils/loadingSpinner";

// Define chart data shape
interface ChartData {
  date: string;
  payment: number;
}

const UsersChart: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        console.error("Error loading user data:", err);
        setError("Failed to load data");
      }
    };
    fetchData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!users.length) return <LoadingSpinner />;

  // Transform API response into chart data format
  const chartData: ChartData[] = users.map((user) => ({
    date: user.firstName,
    payment: user.payment.amount,
  }));

  return (
    <div className="bar-chart">
      <h2>Payment Amounts</h2>
      <BarChart width={500} height={300} data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Bar dataKey="payment" fill="#00c1f3" />
      </BarChart>
    </div>
  );
};

export default UsersChart;
