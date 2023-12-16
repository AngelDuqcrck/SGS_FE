import {UserDTO} from "../shared/user.service";

export interface UserFullDTO extends Omit<UserDTO, 'rol'> {
  password: string
  rol: {
    role: string
    id: number
  }
}

export interface TicketDTO {
  id:             number;
  title:         string;
  description:    string;
  observation:    null;
  startDate:      Date;
  endDate:        Date;
  employeeId:     null;
  assignmentDate: Date;
  statusId:       null;
}