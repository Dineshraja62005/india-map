import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './Map.css';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pfasData, setPfasData] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sites');
        const data = await response.json();
        setPfasData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // 2. Initialize Map (LIGHT THEME)
  useEffect(() => {
    if (map.current) return;

    const apiKey = 'Z5URJ8EPi1Ep6uxksueX'; 

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // BACK TO LIGHT THEME
      style: `https://api.maptiler.com/maps/dataviz-light/style.json?key=${apiKey}`,
      center: [78.9629, 20.5737],
      zoom: 4,
      interactive: false
    });

    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      setIsMapLoaded(true);
    });
  }, []);

  // 3. Add Data (Red Dots)
  useEffect(() => {
    if (!isMapLoaded || !pfasData) return;

    const mapInstance = map.current;

    if (mapInstance.getSource('pfas-points')) {
        mapInstance.getSource('pfas-points').setData(pfasData);
    } else {
        mapInstance.addSource('pfas-points', {
            type: 'geojson',
            data: pfasData
        });

        mapInstance.addLayer({
            id: 'pfas-circles',
            type: 'circle',
            source: 'pfas-points',
            paint: {
                'circle-color': '#ff0000', // Bright Red
                'circle-radius': 8,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#ffffff' // White stroke for contrast
            }
        });

        // Popups (Standard styling for light map)
        mapInstance.on('click', 'pfas-circles', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const { name, level } = e.features[0].properties;

            new maplibregl.Popup()
                .setLngLat(coordinates)
                .setHTML(`<strong>${name}</strong><br>PFAS Level: ${level}`)
                .addTo(mapInstance);
        });

        mapInstance.on('mouseenter', 'pfas-circles', () => {
            mapInstance.getCanvas().style.cursor = 'pointer';
        });
        mapInstance.on('mouseleave', 'pfas-circles', () => {
            mapInstance.getCanvas().style.cursor = '';
        });
    }
  }, [pfasData, isMapLoaded]);

  // Fullscreen Logic
  useEffect(() => {
    if (!map.current) return;
    if (isFullscreen) {
        map.current.dragPan.enable();
        map.current.scrollZoom.enable();
        map.current.resize();
    } else {
        map.current.dragPan.disable();
        map.current.scrollZoom.disable();
        map.current.resize();
    }
  }, [isFullscreen]);

  return (
    <div className={`map-wrap ${isFullscreen ? 'fullscreen' : ''}`}>
      {isFullscreen && (
        <button className="close-button" onClick={() => setIsFullscreen(false)}>×</button>
      )}
      {!isFullscreen && (
        <div className="overlay-fullscreen" onClick={() => setIsFullscreen(true)}>
          <div className="overlay-text">Explore Contamination Map</div>
        </div>
      )}
      <div className="map" ref={mapContainer} />
    </div>
  );
}