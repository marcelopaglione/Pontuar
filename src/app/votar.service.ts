import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VotarService {

  api = 'https://pontuar-da732.firebaseio.com/pontos/'; // `http://${environment.ip}:${environment.port}/pontos`;

  constructor(private http: HttpClient) { }

  votar(data: any) {
    if (!data.id) {
      console.log('post', this.api, data );

      return this.http.post(`${this.api}.json`, data);
    } else {
      console.log('put', this.api, data );
      return this.http.put(`${this.api}/${data.id}`, data);
    }
  }

  findAll(): Observable<any> {
    return this.http.get(`${this.api}.json`);
  }

  deleteById(id: string): Observable<any> {
    console.log('delete', `${this.api}${id}`);

    return this.http.delete(`${this.api}${id}.json`);
  }

  jsonToArray(json: any) {
    const jsonToArray = [];
    for (const property in json) {
      if (json.hasOwnProperty(property)) {
        jsonToArray.push({ nome: json[ property ].nome, ponto: json[ property ].ponto });
      }
    }
    return jsonToArray;
  }


}
