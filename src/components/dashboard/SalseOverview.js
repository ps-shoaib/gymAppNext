import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import dynamic from "next/dynamic";
import BaseCard from "../baseCard/BaseCard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = ({ Dates, RevenueByDate }) => {
  const optionssalesoverview = {
    grid: {
      show: true,
      borderColor: "transparent",
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        endingShape: "rounded",
        borderRadius: 5,
      },
    },

    colors: ["#fb9678", "#03c9d7"],
    fill: {
      type: "solid",
      opacity: 1,
    },
    chart: {
      offsetX: -15,
      toolbar: {
        show: true,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    markers: {
      size: 10,
    },
    legend: {
      show: true,
    },
    xaxis: {
      type: "Members Login",
      categories: Dates?.length > 0 ? Dates : [],
      // [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "July",
      //   "Aug",
      //   "Sept",
      //   "Oct",
      //   "Nov",
      //   "Dec",
      // ],
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    yaxis: {
      show: true,
      min: 0,
      max: RevenueByDate?.length > 0 ? Math.max(...RevenueByDate) : 10000,
      //  tickAmount: RevenueByDate?.length > 0 ? Math.max(...RevenueByDate) : '10',
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    stroke: {
      show: true,
      width: 50,
      lineCap: "butt",
      colors: ["transparent"],
    },
    tooltip: {
      theme: "dark",
    },
  };
  const seriessalesoverview = [
    {
      name: "Revenue",
      data: RevenueByDate?.length > 0 ?  RevenueByDate : []
      // [355, 390, 300, 350, 390, 180, 355, 390, 300, 350, 390, 180],
    },
    // {
    //   name: "Pixel Admin",
    //   data: [280, 250, 325, 215, 250, 310, 280, 250, 325, 215, 250, 310],
    // },

  ];
  return (
    <BaseCard title={`Revenue by Last 30 Dates`} 
    // description={`(Total ${TotalMembersLoginInLastMonth} Logins of Last Month)`}
    >
      <span className="text-muted">Revenue</span>

      <Chart
        options={optionssalesoverview}
        series={seriessalesoverview}
        type="bar"
        height="450px"
      />
      <span className="d-flex justify-content-center text-muted"> Last 30 Dates </span>
    </BaseCard>
  );
};

export default SalesOverview;
