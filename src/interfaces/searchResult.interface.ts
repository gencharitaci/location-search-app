export interface SearchResult {
  full_address: string;
  lat: string;
  lon: string;
  x: string;
  y: string;
}

export interface ResultItemProps {
  result: SearchResult;
  onClick: () => void;
}

export interface ResultsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  result?: SearchResult;
  nearbyFacilities: { [key: string]: any };
}

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResultClicked: (result: SearchResult) => void;
}
