import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableNotification } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({

    providedIn: 'root'

})

export class ReviewService {

    private http = inject(HttpClient);

    private apiServerPath = `${environment.apiUrl}/reviews`;

    public getReview(): Observable<any[]> {
        return this.http.get<any[]>(this.apiServerPath);
    }

    public deleteReview(id : any): Observable<any> {
        return this.http.delete(`${this.apiServerPath}/deleteReview/${id}`, { responseType: 'text'});

    }

    public updateReview(id: any, data: any): Observable<any> {
        return this.http.put(`${this.apiServerPath}/updateReview/${id}`, data);
    }

    public createReview(data: any): Observable<any> {
        return this.http.post(`${this.apiServerPath}/createReview`, data);
    }

}
