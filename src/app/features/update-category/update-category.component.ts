import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit, OnDestroy  {


  category?: Category;
  id: string | null = null;
  paramsSubscription?:Subscription;
  editCategorySubscription?: Subscription;


  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          // get the data from the API for this category Id
          this.categoryService.getCategoryById(this.id)
          .subscribe({
            next: (response) => {
              this.category = response;
            }
          });

        }
      }
    });
  }

  onFormSubmit() : void{
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    };

    if(this.id)
    {
      this.editCategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest)
       .subscribe({
        next: (respone) => {
          console.log(respone);
          this.router.navigateByUrl('/admin/categories');
        }
       });
    }
  }

  onDelete() : void{
    if(this.id)
    {
      this.categoryService.deleteCategory(this.id)
      .subscribe({
        next: (response) =>
        {
          this.router.navigateByUrl('/admin/categories');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}