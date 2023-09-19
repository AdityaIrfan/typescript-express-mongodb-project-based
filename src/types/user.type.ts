export enum USER_ROLE {
  CLIENT = 'client',
  ADMIN = 'admin'
}

export interface IUserType {
  Id: string
  Email: string
  Name: string
  Password?: string
  Role: USER_ROLE
}

export const UserResponse = async (user: any): Promise<IUserType> => {
  return {
    Id: user._id,
    Email: user.email,
    Name: user.name,
    Role: user.role
  }
}

export const ToWriteUser = (user: IUserType): any => {
  return {
    id: user.Id,
    email: user.Email,
    name: user.Name,
    password: user.Password,
    role: user.Role
  }
}

export const TransformUserModelToIUserType = (user: any): IUserType => {
  return {
    Id: user._id,
    Email: user.email,
    Name: user.name,
    Role: user.role
  }
}
