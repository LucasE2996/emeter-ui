import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable()
export class AuthenticationService
{

    private readonly loginRestEndpint = 'http://localhost:8080/user/detail';

    constructor(
        private http: HttpClient
    )
    { }

    /**
     * Execute the authetication process.
     *
     * @param user The user model
     */
    public login(name: string, password: string): Observable<UserModel>
    {
        const authorization: string = btoa(`${name}:${password}`);
        alert(authorization);
        return this.http.get(this.loginRestEndpint, {
            headers: new HttpHeaders().set('Authorization', `Basic ${authorization}`)
        })
            .map((userLogged: UserModel) =>
            {
                if (userLogged)
                {
                    // Store user details in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(userLogged));
                }

                return userLogged;
            })
            .catch((error: Response) =>
                Observable.throw(error)
            );
    }

    /**
     * Removes the user from local storage to log user out.
     */
    public logout(): void
    {
        localStorage.removeItem('currentUser');
    }

    /**
     * Check if the local storage is set.
     */
    public isAuthenticated(): boolean
    {
        return !!localStorage.getItem('currentUser');
    }
}