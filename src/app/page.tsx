"use client"; // Add this at the very top of the file

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLoan({ ...newLoan, [name]: value });
  };

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
      {/* Rest of your component code */}
    </div>
  );
};

export default BridgeLoanDashboard;