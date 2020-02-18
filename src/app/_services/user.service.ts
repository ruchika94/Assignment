import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from '../../constants/api';
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    fetchData(): Observable<any> {
        //return this.http.get('https://jsonplaceholder.typicode.com/users');
        return this.http.get(Api.HOSTURL+'/users');
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }
    

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}