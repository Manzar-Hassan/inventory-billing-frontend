import React from "react";
import { Paper } from "@mui/material";
import {
  Chart,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

const LineChart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Earnings",
        data: [700, 400, 400, 400, 400, 400, 300, 300, 300, 300, 300, 300],
        backgroundColor: "#4e73df",
        borderColor: "#4e73df",
        borderWidth: 2,
        tension: 0.2,
        fill: {
          target: "origin",
          above: "rgba(78, 115, 223, 0.05)",
        },
        pointRadius: 3,
      },
      {
        label: "Sales",
        data: [1000, 600, 600, 600, 600, 600, 500, 500, 500, 500, 500, 500],
        backgroundColor: "#22b8cf",
        borderColor: "#22b8cf",
        borderWidth: 2,
        tension: 0.2,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    layout: {
      padding: 20,
    },
    plugins: {
      tooltip: {
        intersect: false,
        titleColor: "#5a5c69",
        backgroundColor: "#fff",
        bodyColor: "#858796",
        bodyFont: {
          family: "'Nunito', sans-serif",
        },
        titleFont: {
          family: "'Nunito', sans-serif",
          size: 14,
        },
        padding: 12,
        cornerRadius: 3,
        displayColors: false,
        borderWidth: 0.5,
        borderColor: "#858796",
      },
    },
    scales: {
      y: {
        ticks: {
          font: {
            family: "'Nunito', sans-serif",
          },
          maxTicksLimit: 6,
        },
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        title: {
          display: true,
          text: "Total revenue acquisition",
          font: {
            family: "'Nunito', sans-serif",
            size: 18,
          },
        },
      },
      x: {
        grid: {
          borderDash: [2, 2],
          drawBorder: false,
        },
        ticks: {
          font: {
            family: "'Nunito', sans-serif",
          },
        },
      },
    },
  };

  return (
    <Paper sx={{ padding: "2rem", borderRadius: "15px" }} elevation={5}>
      <Line data={data} options={options} />
    </Paper>
  );
};

export default LineChart;
