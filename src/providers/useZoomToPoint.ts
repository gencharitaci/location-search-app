import { useEffect } from "react";
import Point from "@arcgis/core/geometry/Point";
import { ZoomToPointProps } from "../interfaces/map.interface";

const useZoomToPoint = ({ view, point, zoomLevel = 15 }: ZoomToPointProps) => {
  useEffect(() => {
    if (view && point) {
      const targetPoint = new Point({
        x: point.x,
        y: point.y,
      });

      try {
        view.goTo({
          target: targetPoint,
          zoom: zoomLevel,
        });
      } catch (error) {
        console.error("Error during zoom:", error);
      }
    }
  }, [view, point, zoomLevel]);
};

export default useZoomToPoint;
