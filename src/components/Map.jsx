import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false); // State for fullscreen mode

  useEffect(() => {
    if (map.current) return;

    const apiKey = 'Z5URJ8EPi1Ep6uxksueX'; // Make sure your API key is here

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/dataviz-light/style.json?key=${apiKey}`,
      center: [78.9629, 20.5737],
      zoom: 4,
      interactive: false // Initially not interactive
    });
  }, []);

  // Effect to handle toggling fullscreen
// The new, corrected useEffect
  useEffect(() => {
    if (map.current) {
      if (isFullscreen) {
        // Correctly enable all interactions
        map.current.dragPan.enable();
        map.current.scrollZoom.enable();
        map.current.dragRotate.enable();
        map.current.touchZoomRotate.enable();
        map.current.resize(); // Resize the map to fit the new container
      } else {
        // Correctly disable all interactions
        map.current.dragPan.disable();
        map.current.scrollZoom.disable();
        map.current.dragRotate.disable();
        map.current.touchZoomRotate.disable();
        map.current.resize(); // Resize the map back
      }
    }
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    // Add a conditional class name
    <div className={`map-wrap ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Conditionally render a close button */}
      {isFullscreen && (
        <button className="close-button" onClick={toggleFullscreen}>×</button>
      )}

      {/* An overlay that triggers fullscreen */}
      {!isFullscreen && (
        <div className="overlay-fullscreen" onClick={toggleFullscreen}>
          <div className="overlay-text">Click to expand map</div>
        </div>
      )}

      <div className="map" ref={mapContainer} />
    </div>
  );
}