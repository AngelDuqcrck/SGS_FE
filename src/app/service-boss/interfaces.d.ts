import {UserDTO} from "../shared/user.service";

export interface UserFullDTO extends UserDTO {
  password: string
}
