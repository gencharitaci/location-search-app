import { useState, useEffect } from 'react';
import { GeoJSONFeatureCollection } from '../interfaces/queryGeoJSON.interface';

const useFetchGeoJSON = (tableName: string) => {
    const [geoJSON, setGeoJSON] = useState<GeoJSONFeatureCollection | null>(null);
    const [isLoadingGeoJSON, setIsLoadingGeoJSON] = useState<boolean>(false);
    const [errorGeoJSON, setErrorGeoJSON] = useState<string | null>(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      if (!tableName) {
        setGeoJSON(null);
        setErrorGeoJSON('No table name specified');
        return;
      }

      setIsLoadingGeoJSON(true);
      setErrorGeoJSON(null);

      try {
        const response = await fetch(`https://api.mcmap.org/v1/geojson/${tableName}?geom_column=the_geom&precision=9`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setGeoJSON(data);
    } catch (e) {
        if (e instanceof Error) {
          setErrorGeoJSON(`Failed to fetch GeoJSON: ${e.message}`);
        } else {
          setErrorGeoJSON(`An unexpected error occurred`);
        }
      } finally {
        setIsLoadingGeoJSON(false);
      }
    };

    fetchGeoJSON();
  }, [tableName]); 

  return { geoJSON, isLoadingGeoJSON, errorGeoJSON };
};

export default useFetchGeoJSON;
