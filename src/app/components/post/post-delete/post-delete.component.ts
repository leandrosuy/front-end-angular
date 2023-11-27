import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css'],
})
export class PostDeleteComponent implements OnInit {
  post: Post;
  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.readById(id).subscribe((post) => {
      this.post = post;
    });
  }

  deletePost(): void {
    this.postService.delete(this.post.id).subscribe(() => {
      this.postService.showMessage('Postagem excluída com sucesso!');
      this.router.navigate(['/posts']);
    });
  }

  cancel(): void {
    this.router.navigate(['/posts']);
  }
}
