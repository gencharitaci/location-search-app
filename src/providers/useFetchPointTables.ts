import { useState, useEffect } from "react";
import axios from "axios";
import { IPointTable } from "../interfaces/point.table.interface";

const useFetchPointTables = () => {
  const [pointTables, setPointTables] = useState<IPointTable[]>([]);
  const [loadingPt, setLoadingPt] = useState<boolean>(true);
  const [errorPt, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(
          "https://api.mcmap.org/v1/list_tables"
        );
        if (response.data && response.status === 200) {
          const filteredTables: IPointTable[] = response.data.filter(
            (table: IPointTable) => table.type === "POINT"
          );
          setPointTables(filteredTables);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (errorPt) {
        setError("Error fetching tables: " + (errorPt as Error).message);
      } finally {
        setLoadingPt(false);
      }
    };

    fetchTables();
  }, []);

  return { pointTables, loadingPt, errorPt };
};

export default useFetchPointTables;
