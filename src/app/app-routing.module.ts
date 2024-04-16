import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/add-category/add-category.component';
import { UpdateCategoryComponent } from './features/update-category/update-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';

const routes: Routes =
  [

  {
      path: '',
      component: HomeComponent
  },
  {
    path: 'blog/:url',
    component: BlogDetailsComponent
  },
  {
    path:'admin/categories', component: CategoryListComponent
  },
  {
    path:'admin/categories/addCategory', component: AddCategoryComponent
  },
  {
    path:'admin/categories/:id', component: UpdateCategoryComponent
  },
  {
    path:'admin/blogposts', component: BlogpostListComponent
  },
  {
    path:'admin/blogposts/add', component: AddBlogpostComponent
  },
  {
    path: 'admin/blogposts/:id',
    component: EditBlogpostComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
