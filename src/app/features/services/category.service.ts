import { Injectable } from '@angular/core';
import { AddcategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(model: AddcategoryRequest): Observable<any> {
    return this.http.post<any>('https://localhost:7226/api/Categories', model);
  }


  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('https://localhost:7296/api/Categories');
  }
  // getAllCategories(): Observable<Category[]> {
  //   return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories/`);
  // }


}
