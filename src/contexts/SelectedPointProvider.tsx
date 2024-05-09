import React, { useState, FC } from "react";
import { SelectedPointContext } from "./SelectedPointContext";
import {
  IPoint,
  IQueryNearbyTable,
} from "../interfaces/queryNearbyFacilities.interface";
import { SearchResult } from "../interfaces/searchResult.interface";
import { SelectedPointProviderProps } from "../interfaces/context.provider.interface";

export const SelectedPointProvider: FC<SelectedPointProviderProps> = ({
  children,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<IPoint | null>(null);
  const [nearbyFacilities, setNearbyFacilities] = useState<{
    [key: string]: any;
  }>({});
  const [isLoadingNearbyFacilities, setIsLoadingNearbyFacilities] =
    useState<boolean>(false);
  const [errorNearbyFacilities, setErrorNearbyFacilities] = useState<
    string | null
  >(null);
  const [radius, setRadius] = useState<number>(3);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null
  );
  const initCenter: [number, number] = [-80.8390451463933, 35.22644477165184];
  const initZoomLevel = 1;
  const tablesDefault: IQueryNearbyTable[] = [
    { table_name: "busstops_pt", table_nicename: "Bus Stops", color: "rgb(255 0 0)" },
    { table_name: "cats_light_rail_stations", table_nicename: "CATS Light Rail Stations", color: "rgb(105 100 100)" },
    { table_name: "charlotte_fire_department_stations", table_nicename: "Charlotte Fire Department Stations", color: "rgb(255 165 0)" },
    { table_name: "hospitals", table_nicename: "Hospitals", color: "rgb(30 130 130)" },
    { table_name: "libraries", table_nicename: "Libraries", color: "rgb(5 55 255)" },
    { table_name: "schools", table_nicename: "Schools", color: "rgb(250 115 15)" },
    { table_name: "cats_park_and_ride", table_nicename: "CATS Park & Ride", color: "rgb(255 0 255)" },
  ];
  const [tables, setTables] = useState<IQueryNearbyTable[]>(tablesDefault);

  const value = {
    selectedPoint,
    setSelectedPoint,
    nearbyFacilities,
    setNearbyFacilities,
    isLoadingNearbyFacilities,
    setIsLoadingNearbyFacilities,
    errorNearbyFacilities,
    setErrorNearbyFacilities,
    radius,
    setRadius,
    selectedResult,
    setSelectedResult,
    initCenter,
    initZoomLevel,
    tables,
    setTables,
  };

  return (
    <SelectedPointContext.Provider value={value}>
      {children}
    </SelectedPointContext.Provider>
  );
};
