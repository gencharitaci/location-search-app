import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Box,
  useMediaQuery,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { ResultsDrawerProps } from "../interfaces/searchResult.interface";
import { useSelectedPoint } from "../contexts/SelectedPointContext";
import { FcInfo } from "react-icons/fc";


const ResultsDrawer: React.FC<ResultsDrawerProps> = ({
  isOpen,
  onClose,
  result,
  nearbyFacilities,
}) => {
  const { tables } = useSelectedPoint();
  const [isLargerThan450] = useMediaQuery("(min-width: 450px)");

  const getFacilityNiceName = (facilityName: string) => {
    const table = tables.find((t) => t.table_name === facilityName);
    return table ? table.table_nicename : facilityName;
  };

  const getFacilityColorCode = (facilityName: string) => {
    const table = tables.find((t) => t.table_name === facilityName);
    return table ? table.color : facilityName;
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement={isLargerThan450 ? "right" : "bottom"}
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Search Result Details</DrawerHeader>
        <DrawerBody>
          {result ? (
            <Box padding="4">
              <Text fontSize="xl" fontWeight="bold">
                {result.full_address}
              </Text>
              <Badge colorScheme="green">Lat: {result.lat}</Badge>
              <Badge colorScheme="blue">Lon: {result.lon}</Badge>
              <Badge colorScheme="red">X: {result.x}</Badge>
              <Badge colorScheme="orange">Y: {result.y}</Badge>
            </Box>
          ) : (
            <Text>No result selected.</Text>
          )}

          <Text fontSize="xl" fontWeight="bold">
            Nearby Facilities
          </Text>
          <Accordion allowToggle>
            {Object.entries(nearbyFacilities).map(
              ([facilityName, facilityData]) => (
                <AccordionItem key={facilityName}>
                  <h2>
                    <AccordionButton color={getFacilityColorCode(facilityName)}>
                      <FcInfo />
                      <Box as="span" flex="1" textAlign="left">
                        <Text as={"b"}> &nbsp; {getFacilityNiceName(facilityName)} {getFacilityColorCode(facilityName)}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {facilityData ? (
                      <ul>
                        {facilityData.map(
                          (item: any, index: React.Key | null | undefined) => (
                            <li key={index}>
                              {facilityName === "busstops_pt" && (
                                <span>
                                  {item.stopid} - {item.routes} -{" "}
                                  {item.stopdesc} - {item.x_2264} -{" "}
                                  {item.y_2264} - {item.distance_mile} miles
                                </span>
                              )}
                              {facilityName === "cats_light_rail_stations" && (
                                <span>
                                  {item.name} - {item.mode} - {item.x_2264} -{" "}
                                  {item.y_2264} - {item.distance_mile} miles
                                </span>
                              )}
                              {facilityName === "cats_park_and_ride" && (
                                <span>
                                  {item.name} - {item.address} - {item.routes} -{" "}
                                  {item.x_2264} - {item.y_2264} -{" "}
                                  {item.distance_mile} miles
                                </span>
                              )}
                              {facilityName === "charlotte_fire_department_stations" && (
                                <span>
                                  {item.station_name} - {item.address} -{" "}
                                  {item.x_2264} - {item.y_2264} -{" "}
                                  {item.distance_mile} miles
                                </span>
                              )}
                              {facilityName === "hospitals" && (
                                <span>
                                  {item.name} - {item.address} - {item.x_2264} -{" "}
                                  {item.y_2264} - {item.distance_mile} miles
                                </span>
                              )}
                              {facilityName === "libraries" && (
                                <span>
                                  {item.name} - {item.address} - {item.x_2264} -{" "}
                                  {item.y_2264} - {item.distance_mile} miles
                                </span>
                              )}
                              {facilityName === "schools" && (
                                <span>
                                  {item.name} - {item.address} - {item.x_2264} -{" "}
                                  {item.y_2264} - {item.distance_mile} miles
                                </span>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    ) : (
                      <Text>No data available for {facilityName}</Text>
                    )}
                  </AccordionPanel>
                </AccordionItem>
              )
            )}
          </Accordion>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ResultsDrawer;
