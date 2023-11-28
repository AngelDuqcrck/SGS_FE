import {UserDTO} from "../user.service";

export const mappedResponse = (res: any): UserDTO => {
  const {
    id,
    firstName,
    lastName,
    email,
    rol,
    dependence
  } = res

  return {
    id,
    firstName,
    lastName,
    email,
    rol,
    dependence
  }
}
