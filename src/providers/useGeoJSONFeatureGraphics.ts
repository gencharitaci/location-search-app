import { useEffect } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { Facility, FacilitiesData } from "../interfaces/facilities.interface";

const useGeoJSONFeatureGraphics = (
  graphicsLayer: GraphicsLayer | null,
  facilitiesData: FacilitiesData
) => {
  const categories = {
    busstops_pt: { color: [255, 0, 0] }, // Red
    cats_light_rail_stations: { color: [0, 255, 0] }, // Green
    charlotte_fire_department_stations: { color: [0, 0, 255] }, // Blue
    hospitals: { color: [255, 165, 0] }, // Orange
    libraries: { color: [128, 0, 128] }, // Purple
    schools: { color: [0, 128, 128] }, // Teal
  };

  const createSymbol = (color: number[]) =>
    new SimpleMarkerSymbol({
      color,
      outline: { color: [255, 255, 255], width: 1 },
      size: "12px",
    });

  const addFacilityPoints = (
    category: string,
    facilities: Facility[] | undefined,
    color: number[]
  ) => {
    if (!facilities || !graphicsLayer) return;

    const symbol = createSymbol(color);
    facilities.forEach((facility) => {
      const { x_2264, y_2264 } = facility;
      const point = new Point({
        x: parseFloat(x_2264),
        y: parseFloat(y_2264),
        spatialReference: { wkid: 2264 },
      });

      const graphic = new Graphic({ geometry: point, symbol });
      graphicsLayer.add(graphic);
    });
  };

  useEffect(() => {
    if (!graphicsLayer) return;

    graphicsLayer.removeAll();
    for (const category in categories) {
      addFacilityPoints(
        category,
        facilitiesData[category as keyof FacilitiesData],
        categories[category as keyof typeof categories].color
      );
    }
  }, [graphicsLayer, facilitiesData]);
};

export default useGeoJSONFeatureGraphics;
