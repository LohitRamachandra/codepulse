import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit {
  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  constructor(private bloPostService: BlogPostService,
              private router: Router,
              private categoryService: CategoryService) {

    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }

  onFormSubmit(): void{
    console.log(this.model);
    this.bloPostService.createBlogPost(this.model)
        .subscribe({
          next: (respone) =>
          {
            this.router.navigateByUrl(`/admin/blogposts`);
          }
        })
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

}
