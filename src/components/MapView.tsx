import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import TileLayer from "@arcgis/core/layers/TileLayer";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import Basemap from "@arcgis/core/Basemap";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import Home from "@arcgis/core/widgets/Home";
// import Legend from "@arcgis/core/widgets/Legend";
// import Search from "@arcgis/core/widgets/Search";
// import LayerList from "@arcgis/core/widgets/LayerList";
import "@arcgis/core/assets/esri/themes/light/main.css";
import { Box, useDisclosure } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import ResultsDrawer from "./ResultsDrawer";
import { MapComponentProps } from "../interfaces/map.interface";
import { useSelectedPoint } from "../contexts/SelectedPointContext";
import useFetchNearbyFacilities from "../providers/useFetchNearbyFacilities";
import { useMasterAddressQuery } from "../providers/useQueryMasterAddressTable";
import useGraphicsGeoJSONLayer from "../providers/useGraphicsGeoJSONLayer";

const MapComponent: React.FC<MapComponentProps> = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    selectedPoint,
    setSelectedPoint,
    selectedResult,
    setSelectedResult,
    nearbyFacilities,
  } = useSelectedPoint();

  const [view, setView] = useState<MapView | null>(null);
  const graphicsLayerRef = useRef<GraphicsLayer | null>(null);
  const graphicsGeoJSONLayer = useGraphicsGeoJSONLayer(nearbyFacilities);
  const { queryMasterAddressTable, data } = useMasterAddressQuery();
  useFetchNearbyFacilities();

  useEffect(() => {
    // Ensure the div is available
    if (!mapDiv.current) return;

    if (mapDiv.current) {
      const basemapLayer = new TileLayer({
        url: "https://polaris2.mecklenburgcountync.gov/server/rest/services/basemap/MapServer",
      });

      const basemapMecklenburg = new Basemap({
        baseLayers: [basemapLayer],
        title: "Mecklenburg BaseMap",
        id: "mecklenburg-bm",
      });

      const graphicsLayer = new GraphicsLayer();
      graphicsLayerRef.current = graphicsLayer;

      const map = new Map({
        basemap: basemapMecklenburg,
        layers: [basemapLayer, graphicsLayer],
      });

      const mapView = new MapView({
        container: mapDiv.current!,
        map: map,
        center: [-80.8390451463933, 35.22644477165184],
        zoom: 6,
      });

      setView(mapView);

      const homeWidget = new Home({
        view: mapView,
      });
      mapView.ui.add(homeWidget, "top-left");

      const handleClickOnMap = (event: any) => {
        const point = new Point({
          x: event.mapPoint.x,
          y: event.mapPoint.y,
          spatialReference: { wkid: 2264 },
        });

        var clickSelectMarkerSymbol = new SimpleMarkerSymbol({
          color: [32, 32, 32],
          outline: {
            color: [45, 134, 245],
            width: 2,
          },
          size: "24px",
        });

        const clickPointGraphic = new Graphic({
          geometry: point,
          symbol: clickSelectMarkerSymbol,
        });

        graphicsLayer.removeAll();
        graphicsLayer.add(clickPointGraphic);

        setSelectedPoint(point);
        onOpen();

        mapView.when(() => {
          mapView.goTo({
            target: selectedPoint,
            zoom: 7,
          });
        });
      };

      mapView.on("click", handleClickOnMap);

      if (graphicsGeoJSONLayer) {
        map.layers.add(graphicsGeoJSONLayer);
      }

      return () => {
        view?.destroy();
        graphicsLayerRef.current = null;
      };
    }
  }, [mapDiv, setSelectedPoint, setView, onOpen, graphicsGeoJSONLayer]);

  useEffect(() => {
    if (selectedPoint) {
      queryMasterAddressTable({
        coordinates: { x: selectedPoint.x, y: selectedPoint.y },
      });
    }

    if (data && data.length > 0) {
      const { full_address, lat, lon, x, y } = data[0];
      setSelectedResult({
        full_address,
        lat,
        lon,
        x,
        y,
      });
    } else {
      setSelectedResult({
        full_address: "No Matching Address Found",
        lat: selectedPoint?.y?.toString() || "Unknown",
        lon: selectedPoint?.x?.toString() || "Unknown",
        x: selectedPoint?.x?.toString() || "Unknown",
        y: selectedPoint?.y?.toString() || "Unknown",
      });
    }
  }, [selectedPoint, setSelectedResult]);

  return (
    <Box>
      <div
        ref={mapDiv}
        className="h-full w-full"
        style={{ height: "calc(100vh - 120px)", width: "100%" }}
      ></div>
      {/* Search bar */}
      <SearchBar />
      {/* Results Drawer */}
      {selectedResult && (
        <ResultsDrawer
          isOpen={isOpen}
          onClose={onClose}
          result={selectedResult}
          nearbyFacilities={nearbyFacilities}
        />
      )}
    </Box>
  );
};

export default MapComponent;
