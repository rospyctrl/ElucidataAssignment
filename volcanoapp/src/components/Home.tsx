import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { DataType } from "../types/types";
import Table from "./Table";
import Graph from "./Graph";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";

type Props = {
  data: DataType[];
};

function Home({ data }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5" marginTop="2rem" marginBottom="4rem">
        Content
      </Typography>
      <Grid alignItems="center" justifyContent="center" container spacing={5}>
        <Grid alignItems="center" justifyContent="center" xs={12} md={6}>
          <Table data={data} />
        </Grid>
        <Grid
          alignItems="center"
          justifyContent="center"
          xs={12}
          md={6}
          height={"100%"}
        >
          <Card variant="outlined">
            <Graph values={data} />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
