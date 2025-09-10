import React, { useState, useMemo } from "react";
import EarthquakeMap from "./EarthquakeMap";
import Sidebar from "./Sidebar";
import { useEarthquakes } from "../useEarthquakes";

export default function MainView() {


  const [selectedMagnitudes, setSelectedMagnitudes] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);

    const feedUrl =
    selectedMagnitudes.length === 0 && selectedRegions.length === 0
      ? "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
      : "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
    const { data, loading, error } = useEarthquakes(feedUrl);

  // Unique magnitudes
  const magnitudes = useMemo(() => {
    const mags = new Set();
    data.forEach((eq) => {
      if (eq.properties?.mag !== null) {
        mags.add(Math.floor(eq.properties.mag));
      }
    });
    return Array.from(mags).sort((a, b) => a - b);
  }, [data]);

  // Unique regions
  const regions = useMemo(() => {
    const set = new Set();
    data.forEach((eq) => {
      const place = eq.properties?.place;
      if (place) {
        const region = place.includes(" of ")
          ? place.split(" of ").pop().trim()
          : place;
        set.add(region);
      }
    });
    return Array.from(set).sort();
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((eq) => {
      const mag = Math.floor(eq.properties.mag || 0);
      const place = eq.properties?.place || "";
      const region = place.includes(" of ")
        ? place.split(" of ").pop().trim()
        : place;

      // If magnitudes selected → check match
      const magMatch =
        selectedMagnitudes.length === 0 || selectedMagnitudes.includes(mag);

      // If regions selected → check match
      const regionMatch =
        selectedRegions.length === 0 || selectedRegions.includes(region);

      return magMatch && regionMatch; // BOTH must match if both filters are set
    });
  }, [data, selectedMagnitudes, selectedRegions]);

  return (
    <div className="flex h-full combo-view">
      <EarthquakeMap
        className="w-2/4 h-full map"
        data={filteredData}
        loading={loading}
        error={error}
      />
      <Sidebar
        className="w-2/4 h-full border-l bg-[#444444] text-white sideview"
        magnitudes={magnitudes}
        regions={regions}
        selectedMagnitudes={selectedMagnitudes}
        setSelectedMagnitudes={setSelectedMagnitudes}
        selectedRegions={selectedRegions}
        setSelectedRegions={setSelectedRegions}
        data={data}
        loading={loading}
        error={error}
      />
    </div>
  );
}
