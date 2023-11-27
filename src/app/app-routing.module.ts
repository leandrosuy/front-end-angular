import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UsersCrudComponent } from './views/users-crud/users-crud.component';
import { PostsCrudComponent } from './views/posts-crud/posts-crud.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { UserDeleteComponent } from './components/user/user-delete/user-delete.component';
import { PostCreateComponent } from './components/post/post-create/post-create.component';
import { PostUpdateComponent } from './components/post/post-update/post-update.component';
import { PostDeleteComponent } from './components/post/post-delete/post-delete.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UsersCrudComponent,
  },
  {
    path: 'users/create',
    component: UserCreateComponent,
  },
  {
    path: 'users/update/:id',
    component: UserUpdateComponent,
  },
  {
    path: 'users/delete/:id',
    component: UserDeleteComponent,
  },
  {
    path: 'posts',
    component: PostsCrudComponent,
  },
  {
    path: 'posts/create',
    component: PostCreateComponent,
  },
  {
    path: 'posts/update/:id',
    component: PostUpdateComponent,
  },
  {
    path: 'posts/delete/:id',
    component: PostDeleteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
