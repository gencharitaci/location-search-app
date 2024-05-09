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
  Divider,
  Table,
  TableContainer,
  Tbody,
  Td,
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
                                      <Td><Badge colorScheme="green">X: {item.x_2264}</Badge> | <Badge colorScheme="blue">Y: {item.y_2264}</Badge></Td>
                                    </Tr>
                                    <Divider borderColor={"red"}/>
                                </>
                              )}
                              {facilityName === "cats_light_rail_stations" && (
                                <>
                                    <Tr>
                                      <Td>Stop Name</Td>
                                      <Td>{item.name}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Mode</Td>
                                      <Td>{item.mode}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Distance</Td>
                                      <Td>{item.distance_mile} miles</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Coordinates</Td>
                                      <Td><Badge colorScheme="green">X: {item.x_2264}</Badge> | <Badge colorScheme="blue">Y: {item.y_2264}</Badge></Td>
                                    </Tr>
                                    <Divider borderColor={"red"}/>
                                </>
                              )}
                              {facilityName === "charlotte_fire_department_stations" && (
                                <>
                                    <Tr>
                                      <Td>Station</Td>
                                      <Td>{item.label}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Address</Td>
                                      <Td>{item.address}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Topo</Td>
                                      <Td>{item.topo}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Distance</Td>
                                      <Td>{item.distance_mile} miles</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Coordinates</Td>
                                      <Td><Badge colorScheme="green">X: {item.x_2264}</Badge> | <Badge colorScheme="blue">Y: {item.y_2264}</Badge></Td>
                                    </Tr>
                                    <Divider borderColor={"red"}/>
                                </>
                              )}
                              {facilityName === "hospitals" && (
                                <>
                                    <Tr>
                                      <Td>Name</Td>
                                      <Td>{item.name}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Address</Td>
                                      <Td>{item.address}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Phone</Td>
                                      <Td>{item.phone}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Distance</Td>
                                      <Td>{item.distance_mile} miles</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Coordinates</Td>
                                      <Td><Badge colorScheme="green">X: {item.x_2264}</Badge> | <Badge colorScheme="blue">Y: {item.y_2264}</Badge></Td>
                                    </Tr>
                                    <Divider borderColor={"red"}/>
                                </>
                              )}
                              {facilityName === "libraries" && (
                                <>
                                    <Tr>
                                      <Td>Name</Td>
                                      <Td>{item.name}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Type</Td>
                                      <Td>{item.library_type}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Address</Td>
                                      <Td>{item.address}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Distance</Td>
                                      <Td>{item.distance_mile} miles</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Coordinates</Td>
                                      <Td><Badge colorScheme="green">X: {item.x_2264}</Badge> | <Badge colorScheme="blue">Y: {item.y_2264}</Badge></Td>
                                    </Tr>
                                    <Divider borderColor={"red"}/>
                                </>
                              )}
                              {facilityName === "schools" && (
                                <>
                                    <Tr>
                                      <Td>School Name</Td>
                                      <Td>{item.schlname}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Type</Td>
                                      <Td>{item.type}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Address</Td>
                                      <Td>{item.address}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Distance</Td>
                                      <Td>{item.distance_mile} miles</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Coordinates</Td>
                                      <Td><Badge colorScheme="green">X: {item.x_2264}</Badge> | <Badge colorScheme="blue">Y: {item.y_2264}</Badge></Td>
                                    </Tr>
                                    <Divider borderColor={"red"}/>
                                </>
                              )}
                              {facilityName === "cats_park_and_ride" && (
                                <>
                                    <Tr>
                                      <Td>Name</Td>
                                      <Td>{item.name}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Address</Td>
                                      <Td>{item.address}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Routes</Td>
                                      <Td>{item.routes}</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Distance</Td>
                                      <Td>{item.distance_mile} miles</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>Coordinates</Td>
                                      <Td><Badge colorScheme="green">X: {item.x_2264}</Badge> | <Badge colorScheme="blue">Y: {item.y_2264}</Badge></Td>
                                    </Tr>
                                    <Divider borderColor={"red"}/>
                                </>
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
