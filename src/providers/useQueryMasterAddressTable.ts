import { useState } from "react";
import { MasterAddressTableParams } from "../interfaces/queryMasterAddressTable.interface";
import { SearchResult } from "../interfaces/searchResult.interface";
import { QueryOptions } from "../interfaces/query.options.interface";

export function useMasterAddressQuery() {
  const [data, setData] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const queryMasterAddressTable = async (
    options: QueryOptions
  ): Promise<void> => {
    const url: string = "https://api.mcmap.org/v1/query/master_address_table";
    let params: MasterAddressTableParams;

    if (options.address) {
      // address search
      params = {
        columns: `
          full_address,
          round(ST_x(ST_transform(the_geom,4326))::NUMERIC,4) as lon,
          round(ST_y(ST_transform(the_geom,4326))::NUMERIC,4) as lat,
          round(ST_x(the_geom)::NUMERIC, 4) AS x,
          round(ST_y(the_geom)::NUMERIC, 4) AS y
        `,
        filter: `full_address like '${options.address.toUpperCase()}%'`,
        limit: "5",
      };
    } else if (options.coordinates) {
      // map click search
      const { x, y, radius = 300 } = options.coordinates;
      params = {
        columns: `
          full_address,
          round(ST_x(ST_transform(the_geom,4326))::NUMERIC,4) as lon,
          round(ST_y(ST_transform(the_geom,4326))::NUMERIC,4) as lat,
          round(ST_x(the_geom)::NUMERIC, 4) AS x,
          round(ST_y(the_geom)::NUMERIC, 4) AS y
        `,
        filter: `ST_DWithin(the_geom, ST_SetSRID(ST_MakePoint(${x}, ${y}), 2264), ${radius})`,
        limit: "5",
      };
    } else {
      return;
    }

    const queryString: string = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const fullUrl: string = `${url}?${queryString}`;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(fullUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error: any) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { queryMasterAddressTable, data, loading, error };
}
