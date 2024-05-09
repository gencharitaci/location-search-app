import { useState, useEffect } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import useGeoJSONFeatureGraphics from "./useGeoJSONFeatureGraphics";
import { FacilitiesData } from "../interfaces/facilities.interface";

const useGraphicsGeoJSONLayer = (facilitiesData: FacilitiesData) => {
  const [graphicsLayer, setGraphicsLayer] = useState<GraphicsLayer | null>(
    null
  );

  useEffect(() => {
    const layer = new GraphicsLayer();
    setGraphicsLayer(layer);
    return () => {
      layer.removeAll();
    };
  }, []);

  useGeoJSONFeatureGraphics(graphicsLayer, facilitiesData);

  return graphicsLayer;
};

export default useGraphicsGeoJSONLayer;
