import React, { useEffect, useState } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { fetchCompanies } from "../api/companies";
import LoadingSpinner from "../utils/loadingSpinner";

// Define a type for your company data structure
interface Company {
  name: string;
  total_payments: number;
}

interface ChartDataItem {
  name: string;
  value: number;
}

const colors = [
  "#ff8035", "#f54bb5", "#00c1f3", "#a862f1",
  "#00f5b1", "#009245", "#33b5ff", "#00feff", "#f28d00"
];

const CompanyPie: React.FC = () => {
  const [data, setData] = useState<ChartDataItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companies: Company[] = await fetchCompanies();
        const chartData: ChartDataItem[] = companies.map(company => ({
          name: company.name,
          value: company.total_payments,
        }));
        setData(chartData);
      } catch (err) {
        console.error("Error loading company data:", err);
        setError("Failed to load data");
      }
    };
    fetchData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!data.length) return <LoadingSpinner />;

  return (
    <div className="company-pie">
      <h2>Payments by Company</h2>
      <PieChart width={800} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={150}>
          {data.map((entry: ChartDataItem, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default CompanyPie;
