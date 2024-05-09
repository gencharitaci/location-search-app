import MapView from "@arcgis/core/views/MapView";
import { IPoint } from "./queryNearbyFacilities.interface";

export interface MapComponentProps {
  zoomLevel?: number;
}

export interface ZoomToPointProps {
  view: MapView | null;
  point: IPoint | null;
  zoomLevel?: number;
}
