import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { UserModel } from '../models/user.model';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private storage: Storage) { }

    /**
     * Process login. If the credentials are true save user to local storage.
     * HINT: change post url for the right user auth API
     * 
     * @param username The username from form
     * @param password The password from form
    */
    public login(username: string, password: string) {
        return this.http.get<UserModel>(
            `localhost:8080/user/detail`,
            { headers: new HttpHeaders().append('Authorization', window.btoa(`Basic ${username}:${password}`)) }
            )
                .subscribe((user: UserModel) => {
                    // login successful if there's a user in the response
                    if (user) {
                        // store user details and basic auth credentials in local storage 
                        // to keep user logged in between page refreshes
                        this.storage.set('currentUser', JSON.stringify(user));
                    }

                    return user;
                });
    }

    logout() {
        // remove user from local storage to log user out
        this.storage.remove('currentUser');
    }
}