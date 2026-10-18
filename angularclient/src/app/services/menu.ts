import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({

    providedIn: 'root'

})

export class MenuService {

    private http = inject(HttpClient);

    private apiServerPath = `${environment.apiUrl}/menu-items`;

    public getMenuItems(): Observable<any[]> {
        return this.http.get<any[]>(this.apiServerPath);
    }
}
