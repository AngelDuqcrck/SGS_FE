import {UserDTO} from "../shared/user.service";

export interface UserFullDTO extends Omit<UserDTO, 'rol'> {
  password: string
  rol: {
    role: string
    id: number
  }
}
