import React, { useState, useRef, useEffect } from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chart from "chart.js/auto";
import "./FutureEarningCalculator.css";

function FutureEarningCalculator() {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [annualSalary, setAnnualSalary] = useState(50000);
  const [targetBranch, setTargetBranch] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  const [collegeRankingRange, setCollegeRankingRange] = useState("");
  const [currency, setCurrency] = useState("USD");
  const years = 5;
  const interestRate = 0.1;
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  useEffect(() => {
    if (chartRef1.current !== null) {
      if (chartRef1.current.chartInstance) {
        chartRef1.current.chartInstance.destroy();
      }

      const ctx1 = chartRef1.current.getContext("2d");
      const newChartInstance1 = new Chart(ctx1, {
        type: "bar",
        data: {
          labels: Array.from({ length: years }, (_, i) => (i + 1).toString()),
          datasets: [
            {
              label: "Estimated Future Earnings",
              backgroundColor: "#36a2eb",
              borderColor: "#36a2eb",
              borderWidth: 1,
              hoverBackgroundColor: "#36a2eb",
              hoverBorderColor: "#36a2eb",
              data: generateData(),
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Estimated Future Earnings ($)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Years",
              },
            },
          },
          plugins: {
            tooltip: {
              mode: "index",
              intersect: false,
            },
          },
        },
      });

      chartRef1.current.chartInstance = newChartInstance1;
    }

    if (chartRef2.current !== null) {
      if (chartRef2.current.chartInstance) {
        chartRef2.current.chartInstance.destroy();
      }

      const ctx2 = chartRef2.current.getContext("2d");
      const newChartInstance2 = new Chart(ctx2, {
        type: "line",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "Example Data",
              data: [12, 19, 3, 5, 2, 3],
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      chartRef2.current.chartInstance = newChartInstance2;
    }
  }, [loanAmount, annualSalary, currency]);

  const generateData = () => {
    const data = [];
    for (let i = 1; i <= years; i++) {
      data.push(futureEarnings(loanAmount, annualSalary, i, interestRate));
    }
    return data;
  };

  const futureEarnings = (loanAmount, annualSalary, years, interestRate) => {
    const totalEarnings = annualSalary * years;
    const totalLoanCost = loanAmount * Math.pow(1 + interestRate, years);
    return totalEarnings - totalLoanCost;
  };

  const handleLoanAmountChange = (event, newValue) => {
    setLoanAmount(newValue);
  };

  const handleAnnualSalaryChange = (event, newValue) => {
    setAnnualSalary(newValue);
  };

  const handleTargetBranchChange = (event) => {
    setTargetBranch(event.target.value);
  };

  const handleTargetCountryChange = (event) => {
    setTargetCountry(event.target.value);
  };

  const handleCollegeRankingRangeChange = (event) => {
    setCollegeRankingRange(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div className="container">
      <div className="content">
        <Typography variant="h4" gutterBottom>
          Future Earnings Calculator
        </Typography>
        <div className="sliders">
          <div className="slider-container">
            <Typography
              className="slider-label"
              id="loan-amount-slider"
              gutterBottom
            >
              Loan Amount: ${loanAmount}
            </Typography>
            <Slider
              value={loanAmount}
              min={1000}
              max={10000}
              step={100}
              onChange={handleLoanAmountChange}
              aria-labelledby="loan-amount-slider"
            />
          </div>
          <div className="slider-container">
            <Typography
              className="slider-label"
              id="annual-salary-slider"
              gutterBottom
            >
              Annual Salary: ${annualSalary}
            </Typography>
            <Slider
              value={annualSalary}
              min={20000}
              max={100000}
              step={1000}
              onChange={handleAnnualSalaryChange}
              aria-labelledby="annual-salary-slider"
            />
          </div>
        </div>
        <div className="dropdowns">
          <Select
            value={targetBranch}
            onChange={handleTargetBranchChange}
            displayEmpty
            className="dropdown"
            variant="outlined"
          >
            <MenuItem value="" disabled>
              Target Branch
            </MenuItem>
            <MenuItem value="Computer Science">Computer Science</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
          </Select>
          <Select
            value={targetCountry}
            onChange={handleTargetCountryChange}
            displayEmpty
            className="dropdown"
            variant="outlined"
          >
            <MenuItem value="" disabled>
              Target Country
            </MenuItem>
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="UK">UK</MenuItem>
          </Select>
          <Select
            value={collegeRankingRange}
            onChange={handleCollegeRankingRangeChange}
            displayEmpty
            className="dropdown"
            variant="outlined"
          >
            <MenuItem value="" disabled>
              College Ranking Range
            </MenuItem>
            <MenuItem value="Top 100">Top 100</MenuItem>
            <MenuItem value="Top 500">Top 500</MenuItem>
            <MenuItem value="Top 1000">Top 1000</MenuItem>
          </Select>
          <Select
            value={currency}
            onChange={handleCurrencyChange}
            className="dropdown"
            variant="outlined"
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
            <MenuItem value="CAD">CAD</MenuItem>
          </Select>
        </div>
      </div>
      <div className="chart-container">
        <canvas ref={chartRef1} id="futureEarningsChart"></canvas>
      </div>
      <div className="chart-container">
        <canvas ref={chartRef2} id="exampleChart"></canvas>
      </div>
    </div>
  );
}

export default FutureEarningCalculator;
