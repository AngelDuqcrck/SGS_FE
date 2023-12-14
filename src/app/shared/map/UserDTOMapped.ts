import { UserFullDTO } from "src/app/service-boss/interfaces";
import {UserDTO} from "../user.service";

export const mappedResponse = (res: any): UserDTO => {
  const {
    id,
    firstName,
    lastName,
    email,
    rol,
    dependence,
    dependenceId
  } = res

  return {
    id,
    firstName,
    lastName,
    email,
    rol,
    dependence : {
      name: dependence,
      id: dependenceId
    }
  }
}

export const mappedFullResponse = (res: any): UserFullDTO => {
  const {
    id,
    firstName,
    lastName,
    email,
    rol,
    rolId,
    dependence,
    dependenceId,
    password
  } = res

  return {
    id,
    firstName,
    lastName,
    email,
    rol: {
      role: rol,
      id: rolId
    },
    password,
    dependence : {
      name: dependence,
      id: dependenceId
    }
  }
}
