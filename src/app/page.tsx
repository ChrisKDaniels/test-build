"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleDollarSign, ArrowUpRight, AlertTriangle, Clock, Calendar, X } from 'lucide-react';

const BridgeLoanDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBridgeLoans, setActiveBridgeLoans] = useState([
    {
      projectName: "Summer Storm",
      loanAmount: 2500000,
      interestRate: 8.5,
      collateral: "Tax Credits",
      maturityDate: "2024-06-15",
      status: "Current",
      riskLevel: "Low"
    },
    {
      projectName: "Dark Winter",
      loanAmount: 1800000,
      interestRate: 9.0,
      collateral: "Pre-Sales",
      maturityDate: "2024-08-30",
      status: "Watch",
      riskLevel: "Medium"
    }
  ]);

  const [newLoan, setNewLoan] = useState({
    projectName: "",
    loanAmount: "",
    interestRate: "",
    collateral: "",
    maturityDate: "",
    status: "Current",
    riskLevel: "Low"
  });

  const metrics = {
    totalLoansActive: activeBridgeLoans.length,
    totalValueDeployed: activeBridgeLoans.reduce((sum, loan) => sum + loan.loanAmount, 0),
    averageInterestRate: activeBridgeLoans.reduce((sum, loan) => sum + loan.interestRate, 0) / activeBridgeLoans.length,
    upcomingMaturities: activeBridgeLoans.filter(loan => {
      const maturity = new Date(loan.maturityDate);
      const now = new Date();
      const daysUntilMaturity = (maturity.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
      return daysUntilMaturity <= 30;
    }).length
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    if (name === 'loanAmount') {
      processedValue = Number(value.replace(/[^0-9]/g, ''));
    } else if (name === 'interestRate') {
      processedValue = value.replace(/[^\d.]/g, '');
    }
    
    setNewLoan(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActiveBridgeLoans(prev => [...prev, newLoan]);
    setNewLoan({
      projectName: "",
      loanAmount: "",
      interestRate: "",
      collateral: "",
      maturityDate: "",
      status: "Current",
      riskLevel: "Low"
    });
    setIsModalOpen(false);
  };

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">New Bridge Loan</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Bridge Loan Portfolio</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            New Loan
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Loans
            </CardTitle>
            <CircleDollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalLoansActive}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Deployed
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(metrics.totalValueDeployed / 1000000).toFixed(1)}M
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Avg Interest Rate
            </CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.averageInterestRate.toFixed(1)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Upcoming Maturities
            </CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.upcomingMaturities}</div>
          </CardContent>
        </Card>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                name="projectName"
                value={newLoan.projectName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Amount ($)
              </label>
              <input
                type="text"
                name="loanAmount"
                value={newLoan.loanAmount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interest Rate (%)
              </label>
              <input
                type="text"
                name="interestRate"
                value={newLoan.interestRate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collateral Type
              </label>
              <select
                name="collateral"
                value={newLoan.collateral}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Select Collateral</option>
                <option value="Tax Credits">Tax Credits</option>
                <option value="Pre-Sales">Pre-Sales</option>
                <option value="Distribution Agreement">Distribution Agreement</option>
                <option value="Other Assets">Other Assets</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maturity Date
              </label>
              <input
                type="date"
                name="maturityDate"
                value={newLoan.maturityDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Loan
            </button>
          </div>
        </form>
      </Modal>

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
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Rate</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collateral</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maturity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activeBridgeLoans.map((loan, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{loan.projectName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(loan.loanAmount / 1000000).toFixed(1)}M</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.interestRate}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.collateral}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.maturityDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            loan.status === 'Current' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {loan.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            loan.riskLevel === 'Low' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-orange-100 text-orange-800'
                          }`}>
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

          <Alert className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Attention Required</AlertTitle>
            <AlertDescription>
              {metrics.upcomingMaturities} loans are approaching maturity within the next 30 days. Review the pending repayment schedules.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BridgeLoanDashboard;