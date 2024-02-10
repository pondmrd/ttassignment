import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import styles from "./App.module.css";
import TableX from "./components/Table";
import axios from "axios";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [dataList, setDataList] = useState([]);

  const getDataList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/getall");
      setDataList(response.data.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDataList();
  }, []);

  const handleOpenModal = () => {
    dispatch({ type: "OPEN" });
    dispatch({ type: "ADD" });
  };

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h2>ค้นหาเจ้าของ</h2>
        <Button variant="outlined" onClick={handleOpenModal}>
          Add New
        </Button>
      </div>
      <hr className={styles.title_line} />
      <br />
      <TableX dataList={dataList} getDataList={getDataList} />
    </div>
  );
}

export default App;
