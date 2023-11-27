import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PostService } from './post.service';
import { Post } from './post.model';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [PostService],
    });

    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar uma lista de postagens', () => {
    const dummyPosts: Post[] = [
      { id: 1, user_id: 2, name: 'User1', title: 'Post1', body: 'Body1' },
      { id: 2, user_id: 2, name: 'User2', title: 'Post2', body: 'Body2' },
    ];

    service.read().subscribe((posts) => {
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(`${service.baseUrlPosts}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('Deve criar uma nova postagem', () => {
    const dummyPost: Post = {
      user_id: 1,
      id: 1,
      name: 'User1',
      title: 'Post1',
      body: 'Body1',
    };

    service.create(dummyPost).subscribe((post) => {
      expect(post).toEqual(dummyPost);
    });

    const req = httpMock.expectOne(`${service.baseUrlPosts}`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyPost);
  });

  it('Deve retornar uma postagem específica por ID', () => {
    const postId = '1';
    const dummyPost: Post = {
      user_id: 1,
      id: 1,
      name: 'User1',
      title: 'Post1',
      body: 'Body1',
    };

    service.readById(postId).subscribe((post) => {
      expect(post).toEqual(dummyPost);
    });

    const req = httpMock.expectOne(`${service.baseUrlPosts}/${postId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPost);
  });

  it('Deve atualizar uma postagem existente', () => {
    const postId = '1';
    const updatedPost: Post = {
      user_id: 1,
      id: 1,
      name: 'UpdatedUser',
      title: 'UpdatedPost',
      body: 'UpdatedBody',
    };

    service.update(updatedPost).subscribe((post) => {
      expect(post).toEqual(updatedPost);
    });

    const req = httpMock.expectOne(`${service.baseUrlPosts}/${postId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedPost);
  });

  it('Deve excluir uma postagem existente', () => {
    const postId = 1;

    service.delete(postId).subscribe((post) => {
      expect(post).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.baseUrlPosts}/${postId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
