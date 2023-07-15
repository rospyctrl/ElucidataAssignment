import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataType } from "../types/types";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";

export default function BasicTable({ data }: { data: DataType[] }) {
  const [rowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const visibleRows = React.useMemo(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, page, rowsPerPage]);

  return (
    <Box sx={{ width: "100%", backgroundColor: "#e2e8f0" }}>
      <TableContainer
        sx={{ width: "100%", backgroundColor: "white" }}
        component={Paper}
      >
        <Table width="100%" sx={{ minWidth: 850 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">logFC</TableCell>
              <TableCell align="right">AveExpr</TableCell>
              <TableCell align="right">t</TableCell>
              <TableCell align="right">BH</TableCell>
              <TableCell align="right">B</TableCell>
              <TableCell align="right">P.Value</TableCell>
              <TableCell align="right">adj.P.Val</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow
                key={row[""]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row[""]}</TableCell>

                <TableCell component="th" scope="row">
                  {row.logFC}
                </TableCell>
                <TableCell align="right">{row.AveExpr}</TableCell>
                <TableCell align="right">{row.t}</TableCell>
                <TableCell align="right">{row.BH}</TableCell>
                <TableCell align="right">{row.B}</TableCell>
                <TableCell align="right">{row["P.Value"]}</TableCell>
                <TableCell align="right">{row["adj.P.Val"]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Box>
  );
}
