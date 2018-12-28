import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable()
export class AuthenticationService
{

    constructor(
        private http: HttpClient
    )
    { }

    /**
     * Execute the authetication process.
     *
     * @param user The user model
     */
    public login(name: string): Observable<UserModel>
    {
        return this.http.get(`/api/user/detail`, {
            params: {
                userName: name
            }
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