🌍 Earthquake Visualization App
📌 Overview

This React-based web application visualizes recent earthquake activity around the world to help users understand seismic patterns.
It fetches real-time data from the USGS Earthquake API and provides interactive visualizations using maps and charts.

✨ Features

🔹 Live Earthquake Data

Fetches data from the USGS Earthquake API
.

Displays earthquakes that occurred in the past month.

🔹 Interactive World Map

Built with React Leaflet.

Each earthquake is represented as a popup marker.

Popup colors vary by magnitude, helping identify severity quickly.

🔹 Graphical Visualization

Uses Recharts for bar chart representation.

Shows count of earthquakes by magnitude and region.

🔹 User Filters

Checkbox filters for both magnitude and regions.

Updates both the map and bar chart based on user selections.

🛠️ Tech Stack

React.js – Frontend framework

React Leaflet – Interactive maps

Recharts – Data visualization (bar charts)

USGS Earthquake API – Live earthquake data

🚀 How It Works

The app fetches GeoJSON data from the USGS API.

Converts it into JSON and extracts:

Magnitude

Region/Location

Coordinates

Displays earthquakes on an interactive world map with colored popups.

Generates a bar chart showing the distribution of earthquakes.

Users can filter by magnitude and region to explore seismic patterns more deeply.
