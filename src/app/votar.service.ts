import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class VotarService {

  api = `http://${environment.ip}:${environment.port}/pontos`;

  constructor(private http: HttpClient) { }

  votar(data: any) {
    if (!data.id) {
      console.log('post', this.api, data );

      return this.http.post(this.api, data);
    } else {
      console.log('put', this.api, data );
      return this.http.put(`${this.api}/${data.id}`, data);
    }
  }

  findAll(): Observable<any> {
    return this.http.get(this.api);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }


}
