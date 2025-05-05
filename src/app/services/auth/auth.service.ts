import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly BASE_URL = 'https://68109d6d27f2fdac2412125c.mockapi.io/'
  isAuth = false

  RegisterUser(userEmail: string): Promise<any> {
    const url = new URL(this.BASE_URL+ 'users')
    url.searchParams.append('email', userEmail)

    return fetch(url)
    .then(res => {
      console.log(res)
      return res.json()
    })
  }
}
