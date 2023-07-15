import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios, { AxiosError } from "axios";
import Home from "./components/Home";
import { DataType } from "./types/types";
import Toast from "./components/Toast";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import { pointData } from "./utils/data";

function App() {
  const [dataArray, setDataArray] = useState<DataType[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const generateContentHandler = async () => {
    try {
      setLoading(true);
      // setDataArray(pointData)
      const response = await axios.get(
        "http://127.0.0.1:8000/api/differential?limit=5000"
      );
      if (response.data.data) {
        console.log(response.data.data);
        setDataArray(response.data.data);
      }
    } catch (err: AxiosError | any) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.detail || "An error occurred");
        setOpen(true);
      } else {
        setError("An error occurred");
        setOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Container>
        {dataArray.length > 0 && <Button onClick={() =>  setDataArray([])}>Go Back</Button>}
        {dataArray.length <= 0 && (
          <Box display="flex" flexDirection="column">
            <Typography margin="4rem" variant="h6" align="center">
              Click on the button below to generate the graph and table
            </Typography>
            {!loading && (
              <Button variant="contained" onClick={generateContentHandler}>
                Generate
              </Button>
            )}
            {loading && (
              <LoadingButton
                loading
                loadingIndicator="Loading…"
                variant="outlined"
              >
                Fetch data
              </LoadingButton>
            )}
          </Box>
        )}
        {dataArray.length > 0 && !loading && <Home data={dataArray} />}
      </Container>

      <Toast error={error} open={open} setOpen={setOpen} />
    </div>
  );
}

export default App;
