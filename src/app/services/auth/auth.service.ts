import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { UserFormData } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URL = 'https://68109d6d27f2fdac2412125c.mockapi.io/'
  isAuth = false

  get url(): URL {
    return new URL(this.BASE_URL + 'users')
  }

  async RegisterUser(newUserData: UserFormData) {

    try {
      const userExists = await this.isUserRegistered(newUserData.email)
      console.log(userExists, 'does user exists ?')
      if (userExists) {
        throw new Error('user already registered, please log in instead')
      }

      const res = await fetch(this.url.toString(), {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(newUserData)
      })

      if (!res.ok) throw new Error('failed to register user')
      const data = await res.json()
      return data 
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Registration Failed')
    }
  }

  async LogInUser(userData: UserFormData) {

    const url = new URL(this.BASE_URL+ 'users')
    url.searchParams.append('email', userData.email)

    try {

      const res = await fetch(url.toString())

      if (!res.ok) throw new Error('Network error while check user')
      
      const users: User[] = await res.json()
      const user = users[0]

      if (!user) throw new Error('User not found. Please create an account')

      if (user.psw !== userData.psw) throw new Error('Credential were incorrect')

      return user  

    } catch (err) {
      console.log('here')
      throw new Error(err instanceof Error ? err.message : 'Login Failed')
    }
  }

  async isUserRegistered(userEmail: string): Promise<boolean> {
    const url = new URL(this.BASE_URL+ 'users')
    url.searchParams.append('email', userEmail)

    try {
      const res = await fetch(url)
      if (!res.ok) return false

      const users = await res.json()
      return users.length > 0
    } catch (err) {
      console.error('user check failed', err)
      return false
    }
    
  }
}
