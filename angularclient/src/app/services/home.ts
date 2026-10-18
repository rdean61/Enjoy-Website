import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
    
    providedIn: 'root'

})

export class HomeService {

    private http = inject(HttpClient);

    private apiServerPath = `${environment.apiUrl}/reviews`;

    //constructor(private http: HttpClient) {}

    public getReview(): Observable<any[]> {
        return this.http.get<any[]>(this.apiServerPath);
    }
}
