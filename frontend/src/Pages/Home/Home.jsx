import React, { useState, useEffect } from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";


import { Link } from "react-router-dom";
import { read, utils } from "xlsx";

import CharDataService from "../../services/services";
import { Box } from "@mui/system";

export default function Home() {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [errorAccount, setErrorAccount] = useState(false)
  const [errorDesc, setErrorDesc] = useState(false)

  const columns = [
    { id: "id", label: "ID", minWidth: 100 },
    { id: "AcctType", label: "Account Type", minWidth: 100 },
    { id: "Account", label: "Account", minWidth: 100 },
    { id: "Description", label: "Description", minWidth: 170 },
    { id: "Department", label: "Department", minWidth: 100 },
    { id: "TypicalBal", label: "Typical Balance", minWidth: 100 },
    { id: "DebitOffset", label: "Debit Offset", minWidth: 100 },
    { id: "CreditOffset", label: "Credit Offset", minWidth: 100 },
  ];

  useEffect(() => {
    const getCharts = () => {
      CharDataService.get_all()
        .then((response) => {
          setState(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getCharts();
  }, []);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json(worksheet);
        console.log(json)

        setTimeout(() => {
          CharDataService.create_chart(json)
        }, 10)
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const handleAccountChange = (e) => {
    if (e.target.value === undefined) {
      setErrorAccount(false)
    }
    const search = e.target.value
    const getChart = state.find(chart => chart.Account === search)

    if (getChart) {
      setState([getChart])
      setErrorAccount(false)
    }
    else {
      setErrorAccount(true)
    }
    console.log(getChart)
  }

  const handleDescriptionChange = (e) => {
    if (e.target.value === undefined) {
      setErrorDesc(false)
    }

    const search = e.target.value
    const getChart = state.find(chart => chart.Description === search)

    if (getChart) {
      setState([getChart])
      setErrorDesc(false)
    }
    else {
      setErrorDesc(true)
    }
    console.log(getChart)
  }

  return (
    <Container maxWidth="lg">
      <ButtonGroup
        variant="contained"
        size="large"
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "20px auto",
          boxShadow: "none",
        }}
      >
        <Button component="label">
          Upload file
          <input
            hidden
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            type="file"
            onChange={readUploadFile}
          />
        </Button>
          <Box>
            <TextField 
              onChange={handleAccountChange}
              error = { errorAccount }
              name='account'
              id="outlined" 
              label="Account"
              helperText={ errorAccount ? "Chart Account not found" : null}
            />
          </Box>
          <Box>
            <TextField 
              onChange={handleDescriptionChange}
              error = { errorDesc }
              name='desc'  
              id="outlined" 
              label="Description"
              helperText={ errorDesc ? "Chart Description not found" : null}
            />
          </Box>
      </ButtonGroup>
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "50px" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {state
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      component={Link}
                      to={`/chart/${row.id}`}
                      hover
                      role="checkbox"
                      key={row.id}
                      tabIndex={-1}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={state.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
}
