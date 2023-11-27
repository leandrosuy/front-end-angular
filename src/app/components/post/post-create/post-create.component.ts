import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from '../../user/user.model';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  post: Post = {
    user_id: null,
    name: '',
    title: '',
    body: '',
  };

  userControl = new FormControl();
  filteredUsers: Observable<User[]>;
  users: User[];

  constructor(private postUserService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.postUserService.getUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = this.userControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    });
  }

  onChangeUserId(user) {
    this.post.user_id = user.id;
  }

  createPost(): void {
    this.postUserService.create(this.post).subscribe(
      () => {
        this.postUserService.showMessage('Postagem criada com sucesso!');
        this.router.navigate(['/posts']);
      },
      (error) => {
        this.postUserService.showMessage(error);
      }
    );
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.users.filter((user) =>
      user.name.toLowerCase().includes(filterValue)
    );
  }

  cancel(): void {
    this.router.navigate(['/posts']);
  }
}
