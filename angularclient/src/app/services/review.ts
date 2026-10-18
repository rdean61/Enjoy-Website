import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

}
