import { Injectable } from '@angular/core';
import { AddcategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(model: AddcategoryRequest): Observable<any> {
    return this.http.post<any>('https://localhost:7296/api/Categories/', model);
  }


}
