import React, { useEffect, useState } from "react";
import { Table, TableBody, TableRow, TableCell, TableHead, Paper } from "@mui/material";
import { fetchCompanies } from "../api/companies";
import formatCurrency from "../utils/currencyFormatter";
import LoadingSpinner from "../utils/loadingSpinner";

// Define type for company data
interface Company {
  number: number;
  name: string;
  total_users: number;
  total_payments: number;
  number_paid: number;
}

const CompanyTable: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesData: Company[] = (await fetchCompanies()).map((company: any) => ({
          ...company,
          number: Number(company.number), // cast number from string to number
        }));
        setCompanies(companiesData);
      } catch (err) {
        console.error("Error loading company data:", err);
        setError("Failed to load data");
      }
    };
    fetchData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!companies.length) return <LoadingSpinner />;

  return (
    <div className="company-table" style={{ width: '100%' }}>
      <h2>Companies</h2>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Total Users</TableCell>
              <TableCell align="right">Total Paid</TableCell>
              <TableCell align="right"># of Payments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.number}>
                <TableCell>{company.number}</TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell align="right">{company.total_users}</TableCell>
                <TableCell align="right">{formatCurrency(company.total_payments)}</TableCell>
                <TableCell align="right">{company.number_paid}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default CompanyTable;
