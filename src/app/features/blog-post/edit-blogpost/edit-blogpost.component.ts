import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { ImagesService } from 'src/app/shared/components/services/images.service';

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
  isImageSelectorVisible: boolean = false;

  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSusbscription?: Subscription;
  deleteBlogPostSusbscription?: Subscription;
  imageSelectSubscription?: Subscription;

  constructor(private route: ActivatedRoute,
              private blogPostService: BlogPostService,
              private categoryService: CategoryService,
              private router: Router,
              private imageService: ImagesService) { }


  ngOnInit(): void {

    this.categories$ = this.categoryService.getAllCategories();

    this.routeSubscription = this.route.paramMap.subscribe({
      next : (params) => {
        this.id = params.get('id');

        // Get BlogPost From API
        if(this.id)
        {
          this.getBlogPostSusbscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (resposne) => {
              this.model = resposne;
              this.selectedCategories = resposne.categories.map(x => x.id);
            }
          });
        }

        this.imageSelectSubscription = this.imageService.onSelectImage()
          .subscribe({
            next: (response) => {
              if (this.model) {
                this.model.featuredImageUrl = response.url;
                this.isImageSelectorVisible = false;
              }
          }
        })
      }
      });
    }

    onFormSubmit(): void {
      if(this.model && this.id)
      {
        var updateBlogPost: UpdateBlogPost = {
          author: this.model.author,
          content: this.model.content,
          shortDescription: this.model.shortDescription,
          featuredImageUrl: this.model.featuredImageUrl,
          isVisible: this.model.isVisible,
          publishedDate: this.model.publishedDate,
          title: this.model.title,
          urlHandle: this.model.urlHandle,
          categories: this.selectedCategories ?? []
        };

        this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
          .subscribe({
            next: (response) => {
              this.router.navigateByUrl('/admin/blogposts');
          }
        })
      }
    }

  onDelete(): void{
    if (this.id)
    {
      this.deleteBlogPostSusbscription = this.blogPostService.deleteBlogPost(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/blogposts');
          }
        });
    }
  }

  openImageSelector(): void{
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void{
    this.isImageSelectorVisible = false;
  }

    ngOnDestroy(): void {
      this.routeSubscription?.unsubscribe();
      this.updateBlogPostSubscription?.unsubscribe();
      this.getBlogPostSusbscription?.unsubscribe();
      this.deleteBlogPostSusbscription?.unsubscribe();
      this.imageSelectSubscription?.unsubscribe();
    }


}
