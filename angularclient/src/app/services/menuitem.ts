import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({

    providedIn: 'root'

})

export class MenuitemService {

    private http = inject(HttpClient);

    private apiServerPath = `${environment.apiUrl}/menu-items`;

    public getMenuItems(): Observable<any[]> {
        return this.http.get<any[]>(this.apiServerPath);
    }

    public deleteMenuItem(id: any): Observable<any> {
        return this.http.delete(`${this.apiServerPath}/deleteMenuItem/${id}`, { responseType: 'text'});
    }

    public updateMenuItem(id: any, data: any): Observable<any> {
        return this.http.put(`${this.apiServerPath}/updateMenuItem/${id}`, data);
    }

    public createMenuItem(data: any): Observable<any> {
        return this.http.post(`${this.apiServerPath}/createMenuItem`, data);
    }
}
