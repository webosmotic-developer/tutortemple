import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReadJsonService {

  constructor(private http: HttpClient) {

  }

  getData(path: string) {
    return new Promise((resolve, reject) => {
      this.http
        .get(path)
        .subscribe((response: any) => {
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
}
