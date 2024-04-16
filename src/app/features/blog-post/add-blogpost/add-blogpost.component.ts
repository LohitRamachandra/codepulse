import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../models/category.model';
import { ImagesService } from 'src/app/shared/components/services/images.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {

  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;
  imageSelectorSusbscription?: Subscription;


  constructor(private bloPostService: BlogPostService,
              private router: Router,
              private categoryService: CategoryService,
              private imageService : ImagesService) {

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
  ngOnDestroy(): void {
    this.imageSelectorSusbscription?.unsubscribe();
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

    this.imageSelectorSusbscription = this.imageService.onSelectImage()
      .subscribe({
        next: (selectedImage) => {
          this.model.featuredImageUrl = selectedImage.url;
          this.closeImageSelector();
      }
    })
  }

  openImageSelector(): void{
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void{
    this.isImageSelectorVisible = false;
  }

}
