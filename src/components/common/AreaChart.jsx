import { LineChart } from "@mui/x-charts/LineChart";

export function AreaChart({
  title = "AreaChart",
  ySeries = [],
  xLabels = [],
  width = 500,
  height = 300,
}) {
  const loading = ySeries.length == 0;
  console.log({ ySeries, xLabels });

  return (
    <>
      {loading && <span>loading</span>}
      {!loading && (
        <LineChart
          width={width}
          height={height}
          series={[
            { data: ySeries, label: title, area: true, showMark: false },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          sx={{
            ".MuiLineElement-root": {
              display: "none",
            },
          }}
        />
      )}
    </>
  );
}
