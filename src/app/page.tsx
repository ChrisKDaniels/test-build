import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleDollarSign, ArrowUpRight, AlertTriangle, Clock, Calendar } from "lucide-react";

const BridgeLoanDashboard = () => {
  // Initial Loan Data
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

  // State to manage loans
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

  // Handle form submission
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Loans</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loans.length}</div>
          </CardContent>
        </Card>
        {/* Other metrics can go here */}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Loans</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Interest Rate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Collateral
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Maturity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Risk Level
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loans.map((loan, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {loan.projectName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${(loan.loanAmount / 1000000).toFixed(1)}M
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.interestRate}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.collateral}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {loan.maturityDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              loan.status === "Current"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {loan.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              loan.riskLevel === "Low"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {loan.riskLevel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BridgeLoanDashboard;