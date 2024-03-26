import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy{

  id: string | null = null;
  model?: BlogPost;
  categories$? : Observable<Category[]>;
  selectedCategories?: string[];

  routeSubscription?: Subscription;
  constructor(private route: ActivatedRoute,
              private blogPostService: BlogPostService,
              private categoryService: CategoryService,
              private router: Router){}


  ngOnInit(): void {

    this.categories$ = this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next : (params) => {
        this.id = params.get('id');

        // Get BlogPost From API
        if(this.id)
        {
          this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (resposne) => {
              this.model = resposne;
              this.selectedCategories = resposne.categories.map(x => x.id);
            }
          });
        }
      }
      });
    }

    onFormSubmit(): void {
      if(this.model && this.id)
      {
        console.log(this.model)
      }
    }

    ngOnDestroy(): void {
      this.routeSubscription?.unsubscribe();
    }


}
