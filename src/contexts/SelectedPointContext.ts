import { createContext, useContext } from "react";
import { IPoint, IQueryNearbyTable  } from "../interfaces/queryNearbyFacilities.interface";
import { SearchResult } from "../interfaces/searchResult.interface";

export interface ISelectedPointContext {
  selectedPoint: IPoint | null;
  setSelectedPoint: React.Dispatch<React.SetStateAction<IPoint | null>>;
  nearbyFacilities: { [key: string]: any };
  setNearbyFacilities: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  isLoadingNearbyFacilities: boolean;
  setIsLoadingNearbyFacilities: React.Dispatch<React.SetStateAction<boolean>>;
  errorNearbyFacilities: string | null;
  setErrorNearbyFacilities: React.Dispatch<React.SetStateAction<string | null>>;
  radius: number;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
  selectedResult: SearchResult | null;
  setSelectedResult: React.Dispatch<React.SetStateAction<SearchResult | null>>;
  initCenter: [number, number];
  initZoomLevel: number;
  tables: IQueryNearbyTable[];
  setTables: React.Dispatch<React.SetStateAction<IQueryNearbyTable[]>>;
  
}

const contextDefaultValues: ISelectedPointContext = {
  selectedPoint: null,
  setSelectedPoint: () => {},
  nearbyFacilities: {},
  setNearbyFacilities: () => {},
  isLoadingNearbyFacilities: false,
  setIsLoadingNearbyFacilities: () => {},
  errorNearbyFacilities: null,
  setErrorNearbyFacilities: () => {},
  radius: 3,
  setRadius: () => {},
  selectedResult: null,
  setSelectedResult: () => {},
  initCenter: [-80.8390451463933, 35.22644477165184],
  initZoomLevel: 1,
  tables: [],
  setTables: () => {},
};

export const SelectedPointContext = createContext<ISelectedPointContext>(contextDefaultValues);

export const useSelectedPoint = () => {
  const context = useContext(SelectedPointContext);
  if (!context) {
    throw new Error("useSelectedPoint must be used within a SelectedPointProvider");
  }
  return context;
};
