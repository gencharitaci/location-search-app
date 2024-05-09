import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useMasterAddressQuery } from "../providers/useQueryMasterAddressTable";
import useFetchNearbyFacilities from "../providers/useFetchNearbyFacilities";
import ResultsDrawer from "./ResultsDrawer";
import {
  ResultItemProps,
  SearchResult,
} from "../interfaces/searchResult.interface";
import { useSelectedPoint } from "../contexts/SelectedPointContext";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { queryMasterAddressTable, data, loading, error } =
    useMasterAddressQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    setSelectedPoint,
    nearbyFacilities,
    radius,
    setRadius,
    selectedResult,
    setSelectedResult,
    isLoadingNearbyFacilities,
    errorNearbyFacilities,
  } = useSelectedPoint();

  useFetchNearbyFacilities();
  console.log(nearbyFacilities);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);

    // Perform address search when there are more than 1 characters
    if (value.length > 1 && handleSearch) {
      handleSearch(value);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const handleSearch = (value: string) => {
    queryMasterAddressTable({ address: value });
  };
  console.log("Search Term:", searchTerm);
  
  const handleRadiusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRadius(parseInt(event.target.value, 10));
  };

  const handleResultClicked = (result: SearchResult) => {
    setSelectedResult(result);
    setSelectedPoint({ y: parseFloat(result.y), x: parseFloat(result.x) });
    onOpen();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  

  return (
    <Box
      width="460px"
      position="absolute"
      top="5px"
      left="50%"
      transform="translateX(-50%)"
      zIndex="100"
      ref={searchBarRef}
    >
      <InputGroup>
        <InputLeftElement
          mt="100px"
          pointerEvents="none"
          children={<SearchIcon color="#3182ce" />}
        />
        <Input
          placeholder="Search in Mecklenburg Demo App"
          position="absolute"
          top="100px"
          left="50%"
          transform="translateX(-50%)"
          zIndex="1"
          width="480px"
          border="1px solid gray"
          borderRadius="lg"
          focusBorderColor="blue.400"
          alignItems="center"
          bg="gray.200"
          color="black"
          colorScheme="gray"
          _placeholder={{ color: "gray.500" }}
          value={searchTerm}
          onChange={handleChange}
        />
        {/* Radius Selector within Input */}
        <InputRightElement
          w="140px"
          mt="100px"
          children={
            <Select
              size="sm"
              border="none"
              placeholder="Facilities within"
              value={radius}
              onChange={handleRadiusChange}
              bg="gray.200"
              _hover={{ cursor: "pointer" }}
              _focus={{ outline: "none" }}
            >
              <option value="1">1 Mile</option>
              <option value="2">2 Miles</option>
              <option value="3">3 Miles</option>
              <option value="5">5 Miles</option>
              <option value="10">10 Miles</option>
            </Select>
          }
        />
      </InputGroup>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {isLoadingNearbyFacilities && <div>Loading Nearby Facilities...</div>}
      {errorNearbyFacilities && <div>Error: {errorNearbyFacilities}</div>}

      {data && data.length > 0 && showResults && (
        <VStack
          spacing={1}
          mt={140}
          align="stretch"
          bg="white"
          shadow="md"
          borderRadius="md"
          border="1px solid #E2E8F0"
          overflow="hidden"
        >
          <Divider />
          {data.map((result, index) => (
            <ResultItem
              key={index}
              result={result}
              onClick={() => handleResultClicked(result)}
            />
          ))}
        </VStack>
      )}
      {isOpen && selectedResult && (
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

const ResultItem = ({ result, onClick }: ResultItemProps) => {
  return (
    <Card _hover={{ bg: "gray.100" }} onClick={onClick}>
      <CardBody p={2}>
        <Flex direction="column" gap={2}>
          <Flex
            alignItems={"center"}
            justifyContent={"start"}
            flexDir={"row"}
            gap={2}
          >
            <Badge colorScheme="green">{`Lat: ${result.y}`}</Badge>
            <Badge colorScheme="blue">{`Lon: ${result.x}`}</Badge>
          </Flex>
          <Text fontSize="md" as="b">
            {result.full_address}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default SearchBar;
