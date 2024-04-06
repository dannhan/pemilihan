"use client";

import { ResponsivePie } from "@nivo/pie";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export function Chart({ data /* see data tab */ }: { data: any }) {
  return (
    <ResponsivePie
      data={data}
      layers={["arcs", "arcLabels"]}
      sortByValue
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      theme={{ labels: { text: { fontSize: 14 } } }}
      valueFormat={(item) => `${item}%`}
      arcLabel={(item) => `${item.value.toFixed(0)}%`}
      innerRadius={0.4}
      padAngle={0.4}
      cornerRadius={4}
      borderWidth={1}
      activeOuterRadiusOffset={8}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    />
  );
}
