"use client";
import React from "react";
import "./branch3.css";
import {
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
//import Counter from "./Counter";
//import Chart from "./Chart";

const Dashboard = () => {
  return (
    <div className="branch3-container">
    
      <div className="graphs-container">
        <div className="top-container">
          <div className="counters-container">
            
          </div>
          <div className="customers-container">
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
              </Paper>
            </Grid>
          </div>
        </div>
        <div className="bar-container"></div>
      </div>
    </div>
  );
};
export default Dashboard;