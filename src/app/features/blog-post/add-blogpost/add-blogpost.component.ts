import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit {
  model: AddBlogPost;
  constructor(private bloPostService: BlogPostService,
              private router: Router) {

    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date()
    }
  }

  onFormSubmit(): void{

    this.bloPostService.createBlogPost(this.model)
        .subscribe({
          next: (respone) =>
          {
            this.router.navigateByUrl(`/admin/blogposts`);
          }
        })
  }

  ngOnInit(): void {
  }

}