import { Profile } from '../models.module';
import { TimeRangeJSON, TimeRange } from '../time-range';

export interface OperatingHoursJSON extends TimeRangeJSON {
  id: number;
}

export interface OperatingHours extends TimeRange {
  id: number;
}

export const parseTimeRange = (json: TimeRangeJSON): TimeRange => {
  return {
    start: new Date(json.start),
    end: new Date(json.end)
  };
};

export const parseOperatingHoursJSON = (
  json: OperatingHoursJSON
): OperatingHours => {
  return Object.assign({}, json, parseTimeRange(json));
};

export interface Seat {
  id: number;
  title: string;
  shorthand: string;
  reservable: boolean;
  has_monitor: boolean;
  sit_stand: boolean;
  x: number;
  y: number;
}

export interface Room {
  id: string | null;
  nickname: string;
}

export interface ReservationJSON extends TimeRangeJSON {
  id: number;
  users: Profile[];
  seats: Seat[];
  walkin: boolean;
  created_at: string;
  updated_at: string;
  room: Room | null;
  state: string;
}

export interface Reservation extends TimeRange {
  id: number;
  users: Profile[];
  seats: Seat[];
  walkin: boolean;
  created_at: Date;
  updated_at: Date;
  room: Room | null;
  state: string;
}

export const parseReservationJSON = (json: ReservationJSON): Reservation => {
  const timestamps = {
    created_at: new Date(json.created_at),
    updated_at: new Date(json.updated_at)
  };
  return Object.assign({}, json, parseTimeRange(json), timestamps);
};

export interface SeatAvailabilityJSON extends Seat {
  availability: TimeRangeJSON[];
}

export interface SeatAvailability extends Seat {
  availability: TimeRange[];
}

export const parseSeatAvailabilityJSON = (
  json: SeatAvailabilityJSON
): SeatAvailability => {
  let availability = json.availability.map(parseTimeRange);
  return Object.assign({}, json, { availability });
};

export interface CoworkingStatusJSON {
  my_reservations: ReservationJSON[];
  seat_availability: SeatAvailabilityJSON[];
  operating_hours: OperatingHoursJSON[];
}

export interface CoworkingStatus {
  my_reservations: Reservation[];
  seat_availability: SeatAvailability[];
  operating_hours: OperatingHours[];
}

export const EMPTY_COWORKING_STATUS = {
  my_reservations: [],
  seat_availability: [],
  operating_hours: []
};

export const parseCoworkingStatusJSON = (
  json: CoworkingStatusJSON
): CoworkingStatus => {
  return {
    my_reservations: json.my_reservations.map(parseReservationJSON),
    seat_availability: json.seat_availability.map(parseSeatAvailabilityJSON),
    operating_hours: json.operating_hours.map(parseOperatingHoursJSON)
  };
};

export interface ReservationRequest extends TimeRange {
  users: Profile[] | null;
  seats: Seat[] | null;
  room: { id: string };
}
/* Interface for Room Reservation Type */
export interface RoomReservation {
  reservation_id: number | null;
  user_id: number;
  room_name: string;
  start: Date;
  end: Date;
}

/** Interface for the RoomReservation JSON Response model
 *  Note: The API returns object data, such as `Date`s, as strings. So,
 *  this interface models the data directly received from the API. It is
 *  the job of the `parseRoomReservationJson` function to convert it to the
 *  `RoomReservation` type
 */
export interface RoomReservationJson {
  reservation_id: number | null;
  user_id: number;
  room_name: string;
  start: string;
  end: string;
}

/** Function that converts a RoomReservationJSON response model to a
 *  Room Reservation model. This function is needed because the API response
 *  will return certain objects (such as `Date`s) as strings. We need to
 *  convert this to TypeScript objects ourselves.
 */
export const parseEventJson = (
  roomReservationJson: RoomReservationJson
): RoomReservation => {
  return Object.assign({}, roomReservationJson, {
    start: new Date(roomReservationJson.start),
    end: new Date(roomReservationJson.end)
  });
};

/**
 * Represents a cell in a Table Widget
 * @property key - The room of the cell acting as key
 * @property index - The index of the cell in the reservationMap that represents the timeslot's state
 */
export interface TableCell {
  key: string;
  index: number;
}

export interface TableCellProperty {
  backgroundColor: string;
  isDisabled: boolean;
}

export interface TablePropertyMap {
  [key: number]: TableCellProperty;
}

export interface ReservationMapDetails {
  reserved_date_map: Record<string, number[]>;
  capacity_map: Record<string, number>;
  room_type_map: Record<string, string>;
  operating_hours_start: string;
  operating_hours_end: string;
  number_of_time_slots: number;
}

export const availableClasses = [
  { code: 'COMP50', name: 'First-Year Seminar: Everyday Computing' },
  { code: 'COMP60', name: 'First-Year Seminar: Robotics with LEGO®' },
  {
    code: 'COMP65',
    name: 'First-Year Seminar: Folding, from Paper to Proteins'
  },
  { code: 'COMP80', name: 'First-Year Seminar: Enabling Technology' },
  { code: 'COMP85', name: 'First-Year Seminar: The Business of Games' },
  { code: 'COMP89', name: 'First-Year Seminar: Special Topics' },
  { code: 'COMP101', name: 'Fluency in Information Technology' },
  { code: 'COMP110', name: 'Introduction to Programming and Data Science' },
  { code: 'COMP116', name: 'Introduction to Scientific Programming' },
  {
    code: 'COMP126',
    name: 'Practical Web Design and Development for Everyone'
  },
  { code: 'COMP180', name: 'Enabling Technologies' },
  { code: 'COMP185', name: 'Serious Games' },
  { code: 'COMP190', name: 'Topics in Computing' },
  { code: 'COMP210', name: 'Data Structures and Analysis' },
  { code: 'COMP211', name: 'Systems Fundamentals' },
  { code: 'COMP222', name: 'ACM Programming Competition Practice' },
  { code: 'COMP227', name: 'Effective Peer Teaching in Computer Science' },
  { code: 'COMP283', name: 'Discrete Structures' },
  { code: 'COMP290', name: 'Special Topics in Computer Science' },
  { code: 'COMP293', name: 'Internship in Computer Science' },
  { code: 'COMP301', name: 'Foundations of Programming' },
  { code: 'COMP311', name: 'Computer Organization' },
  { code: 'COMP325', name: 'How to Build a Software Startup' },
  { code: 'COMP380', name: 'Technology, Ethics, & Culture' },
  { code: 'COMP388', name: 'Advanced Cyberculture Studies' },
  { code: 'COMP390', name: 'Computer Science Elective Topics' },
  { code: 'COMP393', name: 'Software Engineering Practicum' },
  { code: 'COMP401', name: 'Foundation of Programming' },
  { code: 'COMP410', name: 'Data Structures' },
  { code: 'COMP411', name: 'Computer Organization' },
  { code: 'COMP421', name: 'Files and Databases' },
  { code: 'COMP426', name: 'Modern Web Programming' },
  { code: 'COMP431', name: 'Internet Services and Protocols' },
  { code: 'COMP433', name: 'Mobile Computing Systems' },
  { code: 'COMP435', name: 'Computer Security Concepts' },
  { code: 'COMP447', name: 'Quantum Computing' },
  { code: 'COMP455', name: 'Models of Languages and Computation' },
  { code: 'COMP475', name: '2D Computer Graphics' },
  { code: 'COMP486', name: 'Applications of Natural Language Processing' },
  { code: 'COMP487', name: 'Information Retrieval' },
  { code: 'COMP488', name: 'Data Science in the Business World' },
  { code: 'COMP495', name: 'Mentored Research in Computer Science' },
  { code: 'COMP496', name: 'Independent Study in Computer Science' },
  { code: 'COMP520', name: 'Compilers' },
  { code: 'COMP523', name: 'Software Engineering Laboratory' },
  { code: 'COMP524', name: 'Programming Language Concepts' },
  { code: 'COMP530', name: 'Operating Systems' },
  { code: 'COMP533', name: 'Distributed Systems' },
  { code: 'COMP535', name: 'Introduction to Computer Security' },
  { code: 'COMP537', name: 'Cryptography' },
  { code: 'COMP541', name: 'Digital Logic and Computer Design' },
  { code: 'COMP545', name: 'Programming Intelligent Physical Systems' },
  { code: 'COMP550', name: 'Algorithms and Analysis' },
  { code: 'COMP555', name: 'Bioalgorithms' },
  { code: 'COMP560', name: 'Artificial Intelligence' },
  { code: 'COMP562', name: 'Introduction to Machine Learning' },
  { code: 'COMP572', name: 'Computational Photography' },
  { code: 'COMP575', name: 'Introduction to Computer Graphics' },
  { code: 'COMP576', name: 'Mathematics for Image Computing' },
  { code: 'COMP580', name: 'Enabling Technologies' },
  { code: 'COMP581', name: 'Introduction to Robotics' },
  { code: 'COMP585', name: 'Serious Games' },
  { code: 'COMP586', name: 'Natural Language Processing' },
  { code: 'COMP590', name: 'Topics in Computer Science' }
];
