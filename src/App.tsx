import * as React from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";

import MapComponent from "./components/MapView";
import { SelectedPointProvider } from "./contexts/SelectedPointProvider";
import Navbar from "./components/NavBar";

export const App = () => (
  <SelectedPointProvider>
    <ChakraProvider theme={theme}>
      <Navbar />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="calc(100vh - 122px)" p={1}>
          
          <MapComponent />
        </Grid>
      </Box>
    </ChakraProvider>
  </SelectedPointProvider>
);
