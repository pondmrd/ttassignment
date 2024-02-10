import { useState } from "react";
import ModalX from "./Modal";
import { useSelector, useDispatch } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const TableX = ({ dataList, getDataList }) => {
  const openModal = useSelector((state) => state.openModal);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpenModal = (e, index) => {
    dispatch({ type: "OPEN" });
    dispatch({ type: "EDIT" });
    setCurrentIndex(index);
  };
  const handleCloseModal = () => {
    dispatch({ type: "CLOSE" });
    dispatch({ type: "NULL" });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Operation</TableCell>
              <TableCell align="center">HN เจ้าของ</TableCell>
              <TableCell align="center">ชื่อเจ้าของ</TableCell>
              <TableCell align="center">เบอร์ติดต่อ</TableCell>
              <TableCell align="center">อีเมล</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.map((data, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  <IconButton
                    aria-label="fingerprint"
                    color="success"
                    onClick={(e) => handleOpenModal(e, index)}
                  >
                    <DriveFileRenameOutlineIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">{data.hn}</TableCell>
                <TableCell align="center">
                  {data.name + " " + data.lastname}
                </TableCell>
                <TableCell align="center">{data.tel}</TableCell>
                <TableCell align="center">{data.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>{" "}
      <ModalX
        open={openModal}
        handleClose={handleCloseModal}
        data={dataList[currentIndex]}
        getDataList={getDataList}
      />
    </div>
  );
};

export default TableX;
