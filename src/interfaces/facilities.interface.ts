export interface Facility {
  x_2264: string;
  y_2264: string;
}

export interface FacilitiesData {
  busstops_pt?: Facility[];
  cats_light_rail_stations?: Facility[];
  charlotte_fire_department_stations?: Facility[];
  hospitals?: Facility[];
  libraries?: Facility[];
  schools?: Facility[];
}
