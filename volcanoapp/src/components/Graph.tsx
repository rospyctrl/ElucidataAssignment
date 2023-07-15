import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  Dot
} from "recharts";
import { DataType } from "../types/types";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  values: DataType[];
};
type scatterData = {
  x: number;
  y: number;
  name: string;
};

const RenderDot = ({ cx, cy } : {cx:any, cy:any}) => {
  return (
    <Dot cx={cx} cy={cy} fill="red" r={1} />
  )
}
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: any;
  payload: any;
  label: any;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Name : ${payload[0].payload.name}`}</p>
        <p className="label">{`log2FC value : ${payload[0].payload.x}`}</p>
        <p className="label">{`adj.p.val : ${payload[0].payload.y}`}</p>
      </div>
    );
  }

  return null;
};
function Graph({ values }: Props) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [scatterData, setScatterData] = React.useState<scatterData[]>([]);

  React.useEffect(() => {
    setLoading(true);
    prepareScatterData(values);
  }, [values]);

  const prepareScatterData = (data: DataType[]) => {
    console.log({ data });
    const updatedData = data.map((item: DataType) => {
      return {
        name: item[""],
        x: parseFloat(item.logFC),
        y: parseFloat(item["adj.P.Val"]),
      };
    });
    console.log({ updatedData });
    setScatterData(updatedData);
    setLoading(false);
  };



  

  return (
    <div>
      {loading && <CircularProgress />}
      {!loading && (
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
                left: 20,
            }}
            /* @ts-ignore */
            shape={<RenderDot/>}
          >
            <CartesianGrid />
            <XAxis label={{ value:  'Fold Change', angle: 0, position: 'bottom' }}type="number" dataKey="x" name="fold change" />
            <YAxis label={{ value:'-log10(P-value)', angle: -90, position: 'left' }} type="number" dataKey="y" name="weight" />
            {/* @ts-ignore */}
            <Tooltip content={<CustomTooltip />} />
            <Scatter
              name="DE Result: Volcano Plot"
              data={scatterData}
              fill="#8884d8"
            />
          </ScatterChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Graph;
