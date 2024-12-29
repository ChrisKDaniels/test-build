"use client"; // Add this to ensure the file is treated as a client component

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleDollarSign, ArrowUpRight, AlertTriangle, Clock, Calendar } from "lucide-react";

const BridgeLoanDashboard = () => {
  const initialLoans = [
    {
      projectName: "Summer Storm",
      loanAmount: 2500000,
      interestRate: 8.5,
      collateral: "Tax Credits",
      maturityDate: "2024-06-15",
      status: "Current",
      riskLevel: "Low",
    },
    {
      projectName: "Dark Winter",
      loanAmount: 1800000,
      interestRate: 9.0,
      collateral: "Pre-Sales",
      maturityDate: "2024-08-30",
      status: "Watch",
      riskLevel: "Medium",
    },
  ];

  const [loans, setLoans] = useState(initialLoans);
  const [showForm, setShowForm] = useState(false);
  const [newLoan, setNewLoan] = useState({
    projectName: "",
    loanAmount: "",
    interestRate: "",
    collateral: "",
    maturityDate: "",
    status: "Current",
    riskLevel: "Low",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLoan({ ...newLoan, [name]: value });
  };

  // Handle adding a new loan
  const handleAddLoan = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedLoan = {
      ...newLoan,
      loanAmount: parseFloat(newLoan.loanAmount),
      interestRate: parseFloat(newLoan.interestRate),
    };
    setLoans([...loans, formattedLoan]);
    setShowForm(false);
    setNewLoan({
      projectName: "",
      loanAmount: "",
      interestRate: "",
      collateral: "",
      maturityDate: "",
      status: "Current",
      riskLevel: "Low",
    });
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Bridge Loan Portfolio</h1>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Form" : "New Loan"}
          </button>
        </div>
      </div>

      {/* New Loan Form */}
      {showForm && (
        <form onSubmit={handleAddLoan} className="p-4 bg-white border rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={newLoan.projectName}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
            <input
              type="number"
              name="loanAmount"
              value={newLoan.loanAmount}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Interest Rate</label>
            <input
              type="number"
              step="0.01"
              name="interestRate"
              value={newLoan.interestRate}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Collateral</label>
            <input
              type="text"
              name="collateral"
              value={newLoan.collateral}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Maturity Date</label>
            <input
              type="date"
              name="maturityDate"
              value={newLoan.maturityDate}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Loan
          </button>
        </form>
      )}

      {/* Loans Table */}
      <div className="mt-4">
        <table className="min-w-full bg-white divide-y divide-gray-200 rounded-lg">
          <thead>
            <tr>
              <th>Project</th>
              <th>Loan Amount</th>
              <th>Interest Rate</th>
              <th>Collateral</th>
              <th>Maturity</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, idx) => (
              <tr key={idx}>
                <td>{loan.projectName}</td>
                <td>${loan.loanAmount.toLocaleString()}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.collateral}</td>
                <td>{loan.maturityDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BridgeLoanDashboard;