import * as React from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
// import { Logo } from "./Logo"

import MapComponent from "./components/MapView";
import { SelectedPointProvider } from "./contexts/SelectedPointProvider";

export const App = () => (
  <SelectedPointProvider>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <MapComponent />
        </Grid>
      </Box>
    </ChakraProvider>
  </SelectedPointProvider>
);
