import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class UserService {
    static user: User = {
        id: 0,
        firstname: '',
        lastname: '',
        password: '',
        email: '',
        address: '',
        creditCard: '',
    };

    constructor(private http: HttpClient) {}
    static getRandom(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        const random: number = Math.floor(
            Math.random() * (max - min + 1) + min
        );
        return random; // The maximum is inclusive and the minimum is inclusive
    }
    /*-------------------*/

    /* 4 */

    setUser(user: User): Observable<{ token: string; updatedUser: User[] }> {
        return this.http.put<{ token: string; updatedUser: User[] }>(
            `http://localhost:3000/users/update-user/${user.id}`,
            user
        );
    }

    /* 5 */
    craateDummyUser(): Observable<{ token: string; user: User }> {
        const random = UserService.getRandom(1, 1000);

        const user = {
            ...UserService.user,
            email: `random@email${random}.com`,
        };

        return this.http.post<{ token: string; user: User }>(
            'http://localhost:3000/users/new',
            user
        );
    }

    reset() {
        this.craateDummyUser().subscribe((newUser) => {
            localStorage.setItem('user', JSON.stringify(newUser.user));
        });
    }
}
