import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable( {
    providedIn: 'root'
})

export class AuthService {

    private apiServerPath = `${environment.apiUrl}/login`;

    constructor(private http: HttpClient) {}

    login(credentials: { username: string; password: string }): Observable<any> {
        return this.http.post<any>(this.apiServerPath, credentials);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('authToken');
    }

    isAdmin(): boolean {
        return localStorage.getItem('userRole') === 'admin';
    }
}
