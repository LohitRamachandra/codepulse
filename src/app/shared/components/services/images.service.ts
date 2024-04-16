import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogImage } from '../models/blog-image.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileExtension: '',
    fileName: '',
    title: '',
    url: ''
  });

  constructor(private http: HttpClient) { }



  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(`${environment.apiBaseUrl}/api/images`);
  }

  uploadImage(file: File, fileName: string, title: string): Observable<BlogImage>{
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('fileName', fileName);
    formdata.append('title', title);

    return this.http.post<BlogImage>(`${environment.apiBaseUrl}/api/images`, formdata);
  }

  selectImage(image: BlogImage): void {
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
}
