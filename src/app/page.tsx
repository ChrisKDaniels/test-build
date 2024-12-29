"use client";

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

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Bridge Loan Portfolio</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            New Loan
          </button>
        </div>
      </div>

      {/* Metrics */}
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
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Loans</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Loan Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Interest Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {loan.projectName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${loan.loanAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {loan.interestRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Alert */}
      <Alert className="mt-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Attention</AlertTitle>
        <AlertDescription>
          Some loans are approaching maturity. Review the repayment schedules.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default BridgeLoanDashboard;