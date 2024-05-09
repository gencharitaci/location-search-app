// Base interface for all geometry types
export interface Geometry {
  type:
    | "Point"
    | "LineString"
    | "Polygon"
    | "MultiPoint"
    | "MultiLineString"
    | "MultiPolygon";
  coordinates: number[] | number[][] | number[][][];
}

// Specific interface for a Point geometry
export interface PointGeometry extends Geometry {
  type: "Point";
  coordinates: [number, number]; // Longitude, latitude
}

// Interface for a GeoJSON Feature
export interface GeoJSONFeature {
  type: "Feature";
  geometry: Geometry;
  properties: Record<string, any>; 
}

// Interface for a GeoJSON FeatureCollection
export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
}
