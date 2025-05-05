export interface UserFormData {
  email: string
  psw: string
}

export interface User extends UserFormData {
  id?: string
}
