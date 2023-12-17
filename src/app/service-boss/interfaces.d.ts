import {UserDTO} from "../shared/user.service";

export interface UserFullDTO extends Omit<UserDTO, 'rol'> {
  password: string
  rol: {
    role: string
    id: number
  }
}

export interface TicketDTO {
  id:             number | null;
  tittle:          string;
  description:    string | null;
  observation:    string | null;
  startDate:      Date | string;
  endDate:        Date | string;
  employeeId:     number | null;
  assignmentDate: Date | null;
  statusId:       number | null;
}

export interface UserServiceEmployeeDTO {
  id: number;
  firstName: string;
  lastName: string;
}
