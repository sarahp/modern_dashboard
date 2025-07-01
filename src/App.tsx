import './App.css';
import { useState, useEffect } from "react";
import { Table, TableBody, TableRow, Typography, Button } from "@mui/material";
import Logo from "./assets/logo.png";
import CustomerTable from "./components/CustomerTable";
import CompanyTable from "./components/CompanyTable";
import UsersChart from "./components/UsersChart";
import CompanyPie from "./components/CompaniesChart";
import { fetchUsers } from "./api/users";
import { fetchCompanies } from "./api/companies";
import formatCurrency from "./utils/currencyFormatter";
import loadingSpinner from "./utils/loadingSpinner";
import type { User } from "./api/users";
import type { Company } from "./api/companies";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);  
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
        const companies = await fetchCompanies();
        setCompanies(companies);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data" as any);
      }
    };
    fetchData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!users.length || !companies.length) return loadingSpinner("Loading dashboard details..." as any);

  // Calculations using fetched data
  const sumTotalPayment = users.reduce(
    (acc, user) => acc + user.payment.amount * user.payment.number_made,
    0
  );

  const sumNumberPayments = users.reduce(
    (acc, user) => acc + user.payment.number_made,
    0
  );

  const numberUsers = users.length;
  const numberCompanies = companies.length;

  return (
    <div className="App">
      <header>
        <img className="logo" src={Logo} alt="Logo, rainbow colors with processor says ExampleDashboards." />
        <h2 className="num-users-up">
          Number of Users up <span>6%</span> over past month
        </h2>
        <Table className="heads-up">
          <TableBody>
            <TableRow>
              <th>Total Paid</th>
              <th>Number of Payments</th>
              <th>Number of Users</th>
              <th>Number of Companies</th>
            </TableRow>
            <TableRow className="hud-data">
              <td>{formatCurrency(sumTotalPayment)}</td>
              <td>{sumNumberPayments}</td>
              <td>{numberUsers}</td>
              <td>{numberCompanies}</td>
            </TableRow>
          </TableBody>
        </Table>
      </header>

      <main>
        <div className="charts">
          <UsersChart />
          <CompanyPie />
        </div>

        <div className="main-tables">
          <CustomerTable />
          <CompanyTable />
        </div>
      </main>

      <footer>
        <Typography className="footer-menu">
          <Button href="https://www.youtube.com/watch?v=KkCcqRpaDic" target="_blank" rel="noopener noreferrer">
            Dashboard Walkthrough Video
          </Button>
          <Button href="#">Marketing Dashboard</Button>
          <Button href="#">Sales Info</Button>
          <Button href="#">Growth Goals</Button>
        </Typography>
      </footer>
    </div>
  );
};

export default App;
