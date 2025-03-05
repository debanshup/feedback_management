import React from "react";
import ReactApexChart from "react-apexcharts";

const FeedbackChart = ({ data }) => {
  const categories = data.map((entry) => entry.time);
  const seriesData = data.map((entry) => entry.count);

  const options = {
    chart: {
      type: "line",
      zoom: { enabled: true },
      toolbar: {
        show: true,
        tools: {
          download: true, // Allows downloading the chart
        },
      },
    },
    xaxis: {
      categories,
      title: { text: "Time", style: { fontSize: "14px", fontWeight: 600,  } },
     
    },
    yaxis: {
      title: { text: "Feedback Count", style: { fontSize: "14px", fontWeight: 600,  } },
  
    },
    title: {
      text: "Feedback Trend",
      align: "left",
      style: { fontSize: "16px", fontWeight: 700, },
    },
    stroke: {
      curve: "smooth", // Smooth lines
      width: 3,
    },
    markers: {
      size: 6,
      colors: ["#FFFFFF"],
      strokeColors: "#388E3C", // Green stroke color for marker
      strokeWidth: 2,
      hover: { size: 8 },
    },
    dataLabels: {
      enabled: false, // Keeps the chart clean
    },
    grid: {
      borderColor: "#E0E0E0",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "light",
      x: { show: true },
      y: {
        formatter: (val) => `${val} Feedbacks`, // Custom tooltip text
      },
      style: { fontSize: "12px", color: "#2C6B2F" },
    },
    colors: ["#388E3C"], // Green line color
    fill: {
      type: "gradient", // Using gradient fill
      gradient: {
        shade: "dark",
        type: "vertical", // Vertical gradient
        shadeIntensity: 0.5,
        gradientToColors: ["#66BB6A"], // Lighter green for the gradient
        stops: [0, 100], // Gradient stops
      },
    },
  };
  
  
  const series = [
    {
      name: "Feedback Count",
      data: seriesData,
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={400}
    />
  );
};

export default FeedbackChart;
