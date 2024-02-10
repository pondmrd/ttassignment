import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import styles from "./Modal.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useSelector } from "react-redux";

const ModalX = ({ open, handleClose, data, getDataList }) => {
  const mode = useSelector((state) => state.mode);
  const [errorMessage, setErrorMessage] = useState("");
  const [hn, setHn] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeHn = (e) => {
    setHn(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleChangeTel = (e) => {
    setTel(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    const setData = () => {
      if (open && mode === "EDIT") {
        setHn(data.hn);
        setName(data.name);
        setLastName(data.lastname);
        setTel(data.tel);
        setEmail(data.email);
      } else if (open && mode === "ADD") {
        setHn("");
        setName("");
        setLastName("");
        setTel("");
        setEmail("");
      }
      setErrorMessage("");
    };
    setData();
  }, [open]);

  const addNewPerson = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/add", {
        hn,
        name,
        lastname: lastName,
        tel,
        email,
      });
      if (response.data.isSuccess) {
        handleClose();
        getDataList();
      } else {
        setErrorMessage(response.data.errorMessage);
      }
    } catch (error) {
      setErrorMessage("Server Error");
      console.error(error);
    }
  };

  const editPerson = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/edit", {
        id: data.id,
        hn,
        name,
        lastname: lastName,
        tel,
        email,
      });
      if (response.data.isSuccess) {
        handleClose();
        getDataList();
      } else {
        setErrorMessage(response.data.errorMessage);
      }
    } catch (error) {
      setErrorMessage("Server Error");
      console.error(error);
    }
  };

  const deletePerson = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/delete", {
        id: data.id,
      });
      if (response.data.isSuccess) {
        handleClose();
        getDataList();
      } else {
        setErrorMessage(response.data.errorMessage);
      }
    } catch (error) {
      setErrorMessage("Server Error");
      console.error(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.container}>
        <h2>เจ้าของ</h2>
        <hr className={styles.title_line} />
        <div className={styles.field}>
          <div className={styles.text_zone}>
            <div>HN</div>
            <TextField size="small" value={hn} onChange={handleChangeHn} />
          </div>
          <div className={styles.text_zone}>
            <div>ชื่อ</div>
            <TextField size="small" value={name} onChange={handleChangeName} />
          </div>
          <div className={styles.text_zone}>
            <div>นามสกุล</div>
            <TextField
              size="small"
              value={lastName}
              onChange={handleChangeLastName}
            />
          </div>
          <div className={styles.text_zone}>
            <div>เบอร์ติดต่อ</div>
            <TextField size="small" value={tel} onChange={handleChangeTel} />
          </div>
          <div className={styles.text_zone}>
            <div>E-Mail</div>
            <TextField
              size="small"
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
        </div>
        <br />
        <div className={styles.button_zone}>
          <Button
            variant="contained"
            startIcon={<CancelIcon />}
            onClick={handleClose}
          >
            Cancel
          </Button>{" "}
          <Button
            variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={addNewPerson}
          >
            Add
          </Button>{" "}
          <Button
            disabled={mode === "ADD" ? true : false}
            variant="contained"
            color="secondary"
            startIcon={<SaveIcon />}
            onClick={editPerson}
          >
            Save
          </Button>{" "}
          <Button
            disabled={mode === "ADD" ? true : false}
            variant="outlined"
            color="secondary"
            startIcon={<DeleteSweepIcon />}
            onClick={deletePerson}
          >
            Delete
          </Button>
        </div>
        <div style={{ color: "red" }}>{errorMessage}</div>
      </div>
    </Modal>
  );
};

export default ModalX;
