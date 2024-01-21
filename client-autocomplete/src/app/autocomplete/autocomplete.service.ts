import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable(

)
export class AutocompleteService {

  constructor(private http: HttpClient) {}

  search(query: string, apiEndpoint: string, limit: number = 10, page: number = 1): Observable<string[]> {
    const url = `${apiEndpoint}?query=${query}&limit=${limit}&page=${page}`;
    return this.http.get<string[]>(url);
  }
}
