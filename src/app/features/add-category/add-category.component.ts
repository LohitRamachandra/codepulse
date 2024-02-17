import { Component } from '@angular/core';
import { AddcategoryRequest } from '../models/add-category-request.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  model: AddcategoryRequest;

  constructor(){
    this.model = {
      name: '',
      urlHandle: ''
    }
  }
  onFormSubmit(){

  }

}
