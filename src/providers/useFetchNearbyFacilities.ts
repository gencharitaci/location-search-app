import { useEffect } from "react";
import axios from "axios";
import { useSelectedPoint } from "../contexts/SelectedPointContext";

const useFetchNearbyFacilities = () => {
  const {
    selectedPoint,
    tables,
    radius,
    setNearbyFacilities,
    setIsLoadingNearbyFacilities,
    setErrorNearbyFacilities,
  } = useSelectedPoint();

  useEffect(() => {
    const fetchNearbyFacilities = async () => {
      if (!selectedPoint) return;

      setIsLoadingNearbyFacilities(true);
      setErrorNearbyFacilities(null);

      const params = {
        geom_column: "the_geom",
        columns:
          "*," +
          " round(ST_x(the_geom)::NUMERIC, 4) AS x_2264," +
          " round(ST_y(the_geom)::NUMERIC, 4) AS y_2264," +
          "round((ST_Distance(the_geom, ST_SetSRID(ST_MakePoint(" +
          selectedPoint.x +
          "," +
          selectedPoint.y +
          "), 2264)) * 0.000189394)::NUMERIC, 4) AS distance_mile",
        filter:
          "ST_DWithin(the_geom, ST_SetSRID(ST_MakePoint(" +
          selectedPoint.x +
          "," +
          selectedPoint.y +
          "), 2264), " +
          radius +
          " / 0.000189394)",
        limit: "10",
      };
      const paramsString = new URLSearchParams(params).toString();

      const nearbyFacilitiesPromises = tables.map(async (table) => {
        const { table_name } = table;
        const queryUrl = `https://api.mcmap.org/v1/nearest/${table_name}/${selectedPoint.x},${selectedPoint.y},2264?${paramsString}`;

        try {
          const response = await axios.get(queryUrl);
          return { [table_name]: response.data };
        } catch (errorNearbyFacilities) {
          console.error(
            `Failed to fetch data for ${table_name}`,
            errorNearbyFacilities
          );
          return { [table_name]: null };
        }
      });

      try {
        const resolvedData = await Promise.all(nearbyFacilitiesPromises);
        const newData = resolvedData.reduce(
          (acc, curr) => ({ ...acc, ...curr }),
          {}
        );
        setNearbyFacilities(newData);
      } catch (fetchError: unknown) {
        if (fetchError instanceof Error) {
          setErrorNearbyFacilities(
            `Failed to fetch nearby facilities: ${fetchError.message}`
          );
        } else {
          setErrorNearbyFacilities(
            "An unknown error occurred while fetching nearby facilities."
          );
        }
      } finally {
        setIsLoadingNearbyFacilities(false);
      }
    };

    fetchNearbyFacilities();
  }, [
    radius,
    selectedPoint,
    setErrorNearbyFacilities,
    setIsLoadingNearbyFacilities,
    setNearbyFacilities,
    tables,
  ]);

  return {};
};

export default useFetchNearbyFacilities;
