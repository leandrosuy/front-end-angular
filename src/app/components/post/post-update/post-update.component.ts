import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../user/user.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css'],
})
export class PostUpdateComponent implements OnInit {
  post: Post;
  users: User[];

  userControl = new FormControl();
  filteredUsers: Observable<User[]>;
  selectedUser: string;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onChangeUserId(user) {
    this.post.user_id = user.id;
  }

  ngOnInit(): void {
    this.postService.getUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = this.userControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.readById(id).subscribe((post) => {
      this.post = post;
      this.filteredUsers = this.userControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
    });
  }

  updatePost(): void {
    const updateObservable = this.postService.update(this.post);
    if (updateObservable) {
      updateObservable.subscribe(() => {
        this.postService.showMessage('Postagem atualizado com sucesso!');
        this.router.navigate(['/posts']);
      });
    } else {
      this.postService.showMessage('Erro ao atualizar a postagem!');
    }
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
