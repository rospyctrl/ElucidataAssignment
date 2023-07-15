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
  Dot,
} from "recharts";
import { DataType } from "../types/types";
import CircularProgress from "@mui/material/CircularProgress";
import { getBaseLog } from "../utils/helper";

type Props = {
  values: DataType[];
};
type scatterData = {
  x: number;
  y: number;
  name: string;
};
type DotProps = {
  cx : number;
  cy : number;
}

const RenderDot: React.FC<DotProps> = ({ cx, cy }) => {
  return (
    <Dot cx={cx} cy={cy} r={15} />
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
        y: -getBaseLog(10, parseFloat(item["adj.P.Val"])),
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
            stackOffset="sign"
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
            /* @ts-ignore */
            shape={<RenderDot />}
          >
            <CartesianGrid />
            <XAxis
              label={{ value: "Fold Change", angle: 0, position: "bottom" }}
              type="number"
              dataKey="x"
              name="fold change"
            />
            <YAxis
              label={{ value: "-log10(P-value)", angle: -90, position: "left" }}
              type="number"
              dataKey="y"
              name="weight"
              interval={0}
            />
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
