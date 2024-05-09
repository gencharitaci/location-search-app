import React from "react";
import {
  Box,
  Flex,
  Heading,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";


const Navbar = () => {
  const bgColor = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(0, 0, 0, 0.8)");
  const logoSrc = "/assets/county-seal-white-small-retina.png"; 
  const backgroundImage = "https://source.unsplash.com/random/1920x1080?nature";

  return (
    <Box
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      p={3}
      width="100%"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        px={8}
        py={4}
        backgroundColor={bgColor}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Flex alignItems="center">
          <Image src={logoSrc} alt="Company Logo" boxSize="50px" mr={4} />
          <Heading size="2xl">Mecklenburg Country | GIS Demo App</Heading>
        </Flex>
        <ColorModeSwitcher />
      </Flex>
    </Box>
  );
};

export default Navbar;
