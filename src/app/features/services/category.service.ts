import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl: string  = "https://localhost:7296/api/";
  //private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    //this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  addCategory(model: AddCategoryRequest): Observable<any> {
    return this.http.post<any>('https://localhost:7296/api/Categories', model);
  }


  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('https://localhost:7296/api/Categories');
  }
  // getAllCategories(): Observable<Category[]> {
  //   return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/Categories/`);
  // }

  // getCategortyById(id:string): Observable<Category>{
  //   // return this.http.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
  //   return this.http.get<Category>('https://localhost:7296/api/Categories/'+{id}+'');
  // }

  getCategoryById(id: string): Observable<Category>{
    // return this.http.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
    return this.http.get<Category>(this.apiUrl+'Categories/'+id);
  }

  updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest) : Observable<Category>
  {
    return this.http.put<Category>(this.apiUrl+'Categories/'+id, updateCategoryRequest);
  }

  deleteCategory(id: string) : Observable<Category> {
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/Categories/${id}`);
  }

}
