import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Stack,
} from "@mui/material";

import ChartDataService from "../../services/services";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Update() {
  const navigate = useNavigate()
  const [state, setState] = useState({
    AcctType: "",
    Account: "",
    Description: "",
    Department: "",
    TypicalBal: "",
    DebitOffset: "",
    CreditOffset: ""
});
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    navigate(`/`)
  };

  useEffect(() => {
    const getCharts = () => {
      ChartDataService.get_one(id)
        .then((response) => {
          setState(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getCharts();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    ChartDataService.update_chart(id, state).then((response) => {
      if (response.status === 200) {
        handleOpen(true)
      } else {
        setMessage(response.data)
      }
    })
    .catch(err => console.log(err))
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleClick = (e) => {
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
  }

  const handleDelete = () => {
    ChartDataService.delete_chart(id)
    navigate('/')
  }


  return (
    <Container align="center">
      <Stack direction='row' spacing={3} sx={{
        marginTop: '20px',
        justifyContent: 'flex-end'
      }}>
        <Button onClick={handleClick} variant='contained' color='error'>
          Delete
        </Button>
        <Modal
            open={deleteOpen}
            onClose={handleDeleteClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Are you sure do you want to delete this account?
              </Typography>
              <Button onClick={handleDelete} variant='contained' color='error'>
                Sure
              </Button>
            </Box>
          </Modal>
      </Stack>
      <form onSubmit={handleSubmit}>
        <br />
        <TextField
          name="AcctType"
          type="text"
          label="Account Type"
          variant="standard"
          onChange={handleChange}
          value={state.AcctType}
        />
        <br />
        <TextField
          name="Account"
          type="text"
          label="Account"
          variant="standard"
          onChange={handleChange}
          value={state.Account}
        />
        <br />
        <TextField
          name="Description"
          type="text"
          label="Description"
          variant="standard"
          onChange={handleChange}
          value={state.Description}
        />
        <br />
        <TextField
          name="Department"
          type="text"
          label="Department"
          variant="standard"
          onChange={handleChange}
          value={state.Department}
        />
        <br />
        <TextField
          name="TypicalBal"
          type="text"
          label="Typical Balance"
          variant="standard"
          onChange={handleChange}
          value={state.TypicalBal}
        />
        <br />
        <TextField
          name="DebitOffset"
          type="text"
          label="Debit Offset"
          variant="standard"
          onChange={handleChange}
          value={state.DebitOffset}
        />
        <br />
        <TextField
          name="CreditOffset"
          type="text"
          label="Credit Offset"
          variant="standard"
          onChange={handleChange}
          value={state.CreditOffset}
        />
        <br />
        <br />
        <br />
        <Button
          type="submit"
          sx={{
            color: "#000",
            borderColor: "#000",
          }}
          variant="outlined"
        >
          Update
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {message}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Account Updated
            </Typography>
          </Box>
        </Modal>
      </form>
    </Container>
  );
}
