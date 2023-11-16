"use client";
import React from "react";
import { useState, useEffect } from "react";
import "./UpdateSupply.css";
import { Button } from "@mui/material";
// import * as React from "react";
// import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Add } from "@mui/icons-material";
import ProductSelection from "./productSelection";
import AddLaundry from "../addLaundry/page";

const getSupplies = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/supply", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch supplies");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.supplies;
  } catch (error) {
    console.log("Error loading supplies: ", error);
  }
};

export default function UpdateSupply() {
  const [supplies, setSupplies] = React.useState([]);
  const [name, setName] = useState("");
  const [supplyId, setSupplyId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("");
  let stock = 0;
  const [selectedSupply, setSelectedSupply] = useState([]);

  var today = new Date();
  var date =
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes();
  var dateTime = date + "   (" + time + ")";

  //gets supplies list
  React.useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const suppliesData = await getSupplies();
        setSupplies(suppliesData);
      } catch (error) {
        console.error("Error fetching supplies:", error);
      }
    };

    fetchSupplies();
  }, []);

  React.useEffect(() => { }, [supplies]);

  console.log({ supplies });
  useEffect(() => {
    setName(selectedSupply.supplyName);
  }, [selectedSupply]);

  const onClickSave = async () => {
    console.log(selectedSupply);
    console.log(time, name, quantity, type);
    const response = await fetch("/api/inventory", {
      method: "POST",
      body: JSON.stringify({
        date: dateTime,
        supplyName: name,
        supplyId: supplyId,
        quantity: quantity,
        type: type,
      }),
    });

    console.log(response);
    console.log(selectedSupply.supplyName);
    console.log(name);
    console.log(supplyId);
    console.log(typeof selectedSupply.availableStock);
    console.log(typeof +quantity);
    if (type === "In") {
      stock = parseInt(selectedSupply.availableStock, 10) + +quantity;
    } else if (type === "Out") {
      stock = parseInt(selectedSupply.availableStock, 10) - +quantity;
    } else {
      // Handle an invalid type
      console.error("Invalid type");
      return;
    }
    console.log(stock);

    const res = await fetch(`http://localhost:3000/api/supply?id=${supplyId}`, {
      method: "PATCH",
      body: JSON.stringify({ availableStock: stock }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log("Supply record updated successfully");
    } else {
      console.error("Failed to update supply record");
    }

    // const res = await fetch(`http://localhost:3000/api/supply?id=${supplyId}`, {
    //   method: "PATCH",
    //   body: JSON.stringify({
    //     availableStock: quantity, // if IN, iadd sa available stocks, if out isubtract
    //   }),
    // });

    // if (res.ok) {
    //   router.refresh();
    // }
    // const response = await fetch(`/api/supply/${supplyName}/`);
    // const data = await response.json();
    // console.log(data);
    window.location.reload();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleUpdateSupply = async ({ detergentData, fabConData }) => {
  //   try {
  //     console.log("Updating detergent supply:", detergentData.supplyId, detergentData.quantity, detergentData.type);
  //     console.log("Updating fabcon supply:", fabConData.supplyId, fabConData.quantity, fabConData.type);

  //     // Assuming you have separate API endpoints for detergent and fabcon
  //     const resDetergent = await fetch(`/api/inventory?type=${detergentData.type}`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         date: dateTime,
  //         supplyName: selectedSupply.supplyName, // Use the selectedSupply information
  //         supplyId: detergentData.supplyId,
  //         quantity: detergentData.quantity,
  //         type: detergentData.type,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const resFabCon = await fetch(`/api/inventory?type=${fabConData.type}`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         date: dateTime,
  //         supplyName: selectedSupply.supplyName, // Use the selectedSupply information
  //         supplyId: fabConData.supplyId,
  //         quantity: fabConData.quantity,
  //         type: fabConData.type,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (resDetergent.ok && resFabCon.ok) {
  //       console.log("Supplies updated successfully");
  //     } else {
  //       console.error("Failed to update supplies");
  //     }

  //     // Assuming you have separate API endpoints for updating available stock for detergent and fabcon
  //     const resDetergentStock = await fetch(`http://localhost:3000/api/supply?id=${detergentData.supplyId}`, {
  //       method: "PATCH",
  //       body: JSON.stringify({ availableStock: +detergentData.quantity }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     const resFabConStock = await fetch(`http://localhost:3000/api/supply?id=${fabConData.supplyId}`, {
  //       method: "PATCH",
  //       body: JSON.stringify({ availableStock: +fabConData.quantity }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (resDetergentStock.ok && resFabConStock.ok) {
  //       console.log("Supply records updated successfully");
  //     } else {
  //       console.error("Failed to update supply records");
  //     }
  //   } catch (error) {
  //     console.error("Error updating supplies:", error);
  //   }
  // };

  return (
    <div>
      <Button
        style={{
          backgroundColor: "white",
          color: "black",
          width: "200px",
          height: "50px",
          fontWeight: "bold",
          alignSelf: "flex-end",
          margin: "30px",
          borderRadius: "10px",
          // marginLeft: "83.5%",
        }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Update Supplies
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="title">Update Supply</DialogTitle>
        <DialogContent>
          <div className="update-supply-form">
            <div className="input">
              {/* make every input a selection */}
              <div className="supply-name">
                <p>Supply Name</p>
                <select
                  className="dropdown"
                  onChange={(e) => {
                    setSupplyId(e.target.value);
                    setSelectedSupply(
                      supplies.find((supply) => supply._id === e.target.value)
                    );
                    // setName(selectedSupply.supplyName);
                  }}
                >
                  <option>Select Supply Name</option>
                  {supplies.map((supply, i) => (
                    <option key={i} value={supply._id}>
                      {supply.supplyName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="quantity">
                <p>Quantity</p>
                <input
                  className="text-box"
                  value={quantity}
                  onChange={(e) => setQuantity(e.currentTarget.value)}
                ></input>
              </div>

              <div className="Type">
                <p>Type</p>

                <select
                  className="dropdown"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Select Type</option>
                  <option value="In">IN</option>
                  <option value="Out">OUT</option>
                </select>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            // href="/role/staff/supplyInOut"
            className="dialog-button"
            onClick={() => {
              onClickSave();
              handleClose();
            }}
          >
            Save
          </Button>
          <Button
            // href="/role/staff/components/main-content/manageCustomer"
            className="dialog-button"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* <AddLaundry onUpdateSupply={handleUpdateSupply} /> */}
    </div>
  );
}
