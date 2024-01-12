"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import './mobileUsers.css';
import Layout from '../components/layout';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveButton from './removeButton';
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";


const getMobileUsers = async () => {
  try {
    const res = await fetch("/api/mobile-users", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch mobile users");
    }

    const response = await res.json();
    return response.mobileUserData || [];
  } catch (error) {
    console.log("Error loading mobile users: ", error);
  }
};

const MobileUser = () => {
  const [mobileUserData, setMobileUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mobileUserData.length / entriesPerPage);
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(currentPage * entriesPerPage, mobileUserData.length);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  useEffect(() => {
    const fetchMobileUSers = async () => {
      try {
        const mobileUsers = await getMobileUsers();
        const sortedMobileUsers = mobileUsers.slice().sort((a, b) => a.firstName.localeCompare(b.firstName));
        setMobileUserData(sortedMobileUsers);
      } catch (error) {
        console.error("Error fetching mobile users:", error);
      }
    };

    fetchMobileUSers();
  }, []);

  useEffect(() => {
    console.log(mobileUserData);
  }, [mobileUserData]);

  const filteredUsers = mobileUserData.filter((mobile) =>
    mobile.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mobile.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Layout />
      <div className='mobile-container-box'>
        <div className="searchContainer">
          <p style={{ fontWeight: "bold" }}>Search</p>
          <input
            type="text"
            id="searchName"
            name="searchName"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className='mobile-table-container'>
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ minWidth: 600 }}
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">First Name</TableCell>
                  <TableCell className="table-header">Last Name</TableCell>
                  <TableCell className="table-header">Email</TableCell>
                  <TableCell className="table-header">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(
                    (currentPage - 1) * entriesPerPage,
                    currentPage * entriesPerPage
                  )
                  .map((mobile) => (
                    <TableRow
                      key={mobile._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell className="table-body">{mobile.firstName}</TableCell>
                      <TableCell className="table-body">{mobile.lastName}</TableCell>
                      <TableCell className="table-body">{mobile.email}</TableCell>
                      <TableCell className="table-body">
                        <RemoveButton id={mobile._id} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <ArrowBackIosRoundedIcon />
          </button>
          <span>{`Showing entries ${startRange}-${endRange} of ${totalPages}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ArrowForwardIosRoundedIcon />
          </button>
        </div>
      </div>
    </>
  )
}

export default MobileUser;
