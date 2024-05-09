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
  Card,
  CardBody,
  Stack,
  StackDivider,
  Heading,
  Divider,
  AbsoluteCenter,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
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
                        <Text as={"b"}>
                          {" "}
                          &nbsp; {getFacilityNiceName(facilityName)}
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {facilityData ? (
                      <TableContainer>
                        {facilityData.map(
                          (item: any, index: React.Key | null | undefined) => (
                            <Table key={index} size={"sm"}>
                              <Tbody>
                              {facilityName === "busstops_pt" && (
                                <>
                                    <Tr>
                                      <Td>Stop ID</Td>
                                      <Td>{item.stopid}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Routes</Td>
                                      <Td>{item.routes}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Stop Desc</Td>
                                      <Td>{item.stopdesc}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Distance</Td>
                                      <Td>{item.distance_mile} miles</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Coordinates</Td>
                                      <Td><Badge colorScheme="green">Lat: {item.y_2264}</Badge> | <Badge colorScheme="blue">Lon: {item.x_2264}</Badge></Td>
                                    </Tr>
                                    <Divider borderColor={"red"}/>
                                </>
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
                              {facilityName ===
                                "charlotte_fire_department_stations" && (
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
                                  {item.schlname} - {item.address} -{" "}
                                  {item.x_2264} - {item.y_2264} -{" "}
                                  {item.distance_mile} miles
                                </span>
                              )}
                              </Tbody>
                            </Table>
                          )
                        )}
                      </TableContainer>
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
