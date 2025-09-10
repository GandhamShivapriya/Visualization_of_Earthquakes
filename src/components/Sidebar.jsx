import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

export default function Sidebar({
  className,
  magnitudes,
  regions,
  selectedMagnitudes,
  setSelectedMagnitudes,
  selectedRegions,
  setSelectedRegions,
  data,
  loading,
  error,
}) {
  // Handle magnitude toggle
  const toggleMag = (mag) => {
    setSelectedMagnitudes((prev) =>
      prev.includes(mag) ? prev.filter((m) => m !== mag) : [...prev, mag]
    );
  };

  // Handle region toggle (max 5)
  const toggleRegion = (region) => {
    setSelectedRegions((prev) => {
      if (prev.includes(region)) return prev.filter((r) => r !== region);
      if (prev.length >= 5) return prev; // block more than 5
      return [...prev, region];
    });
  };

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!data) return [];

    const counts = {};

    data.forEach((eq) => {
      const mag = Math.floor(eq.properties?.mag || 0);
      const place = eq.properties?.place || "";
      const region = place.includes(" of ")
        ? place.split(" of ").pop().trim()
        : place;

      const magOk =
        selectedMagnitudes.length === 0 || selectedMagnitudes.includes(mag);

      const regionOk =
        selectedRegions.length === 0 || selectedRegions.includes(region);

      if (magOk && regionOk) {
        counts[region] = (counts[region] || 0) + 1;
      }
    });

    return Object.entries(counts).map(([region, count]) => ({
      name: region,
      earthquakes: count,
    }));
  }, [data, selectedMagnitudes, selectedRegions]);

  return (
    <div className={`${className} p-4 overflow-auto`}>
      <h2 className="text-2xl font-bold mb-4">Filters & Insights</h2>

      {/* Magnitude selector */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Magnitudes</h3>
        <div className="flex flex-wrap gap-2">
          {magnitudes.length === 0 ? (
            <span className="text-xl text-gray-500">
              No magnitudes available.
            </span>
          ) : (
            magnitudes.map((mag) => (
              <button
                key={mag}
                onClick={() => toggleMag(mag)}
                className={`px-3 py-1 text-lg rounded-lg border ${
                  selectedMagnitudes.includes(mag)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {mag}+
              </button>
            ))
          )}
        </div>
      </div>

      {/* Region selector */}
      <div className="mb-4 regions-selector">
        <h3 className="text-xl font-semibold mb-2">Regions (max 5)</h3>
        <div className="flex flex-col gap-1 max-h-40 overflow-y-auto border rounded p-2">
          {regions.length === 0 ? (
            <span className="text-gray-500">No regions available.</span>
          ) : (
            regions.map((region) => (
              <label key={region} className="text-lg flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedRegions.includes(region)}
                  onChange={() => toggleRegion(region)}
                />
                <span>{region}</span>
              </label>
            ))
          )}
        </div>
      </div>

      {/* Chart */}
      <h3 className="text-xl font-semibold mb-2">Earthquake Stats</h3>
      <div className="h-64 bg-white rounded-lg shadow p-2 stats">
        {selectedMagnitudes.length === 0 && selectedRegions.length === 0 ? (
          <span className="text-gray-500 text-center text-lg block">
            Please select a filter to display the graph.
          </span>
        ) : chartData.length === 0 ? (
          <span className="text-gray-500">No data available.</span>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name">
                <Label
                  value="Countries"
                  style={{
                    textAnchor: "middle",
                    fontSize: 18,
                    fontWeight: "bold",
                    fill: "black",
                  }}
                  offset={-5}
                  position="insideBottom"
                />
              </XAxis>
              <YAxis>
                <Label
                  value="Monthly Earthquake Count"
                  angle={-90}
                  position="insideLeft"
                  style={{
                    textAnchor: "middle",
                    fontSize: 18,
                    fontWeight: "bold",
                    fill: "black",
                  }}
                />
              </YAxis>
              <Tooltip />
              <Bar dataKey="earthquakes" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Status */}
      {loading && <p className="mt-4">Loading earthquakes...</p>}
      {error && <p className="mt-4 text-red-500">Error loading data</p>}
    </div>
  );
}
