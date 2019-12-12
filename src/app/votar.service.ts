import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VotarService {

  api = 'https://pontuar-da732.firebaseio.com/pontos/';

  constructor(private http: HttpClient) { }

  votarPost(data: any) {
    console.log('post', this.api, data);
    return this.http.post(`${this.api}.json`, data);
  }

  votarPut(data: any, id: string) {
    console.log('put', `${this.api}${id}/ponto.json`);
    return this.http.put(`${this.api}${id}/ponto.json`, data);
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
        const obj = {
          nome: json[ property ].nome,
          ponto: json[ property ].ponto,
          id: property
        };
        jsonToArray.push(obj);
      }
    }
    return jsonToArray.sort((a, b) => (a.ponto > b.ponto) ? 1 : -1);
  }


}
