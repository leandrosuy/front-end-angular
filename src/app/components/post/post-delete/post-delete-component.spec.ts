import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PostDeleteComponent } from './post-delete.component';
import { PostService } from '../post.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Post } from '../post.model';

describe('PostDeleteComponent', () => {
  let component: PostDeleteComponent;
  let fixture: ComponentFixture<PostDeleteComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let router: jasmine.SpyObj<Router>;

  const mockPost: Post = {
    user_id: 4,
    name: 'Maitê Dantas',
    title: 'Guia gratuito para aprender programação e tecnologia – Roadmap.sh',
    body: 'As pessoas aprendem de forma de diferente, mas uma coisa que todo estudante precisa saber, é o que exatamente estudar. Os que sabem por onde começar, com frequência não sabem o que estudar na sequência, isso é um problema, especialmente no meio tech, onde existem vários caminhos e bifurcações. Existem caminhos pagos, gratuitos, focados em autodidatismo ou com tutoria, cada um para cada qual. Hoje, apresentamos o Roadmap.sh, uma página no GitHub construída pela comunidade, um guia gratuito para aprender programação e diversas áreas da tecnologia.',
    id: 2,
  };

  beforeEach(() => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['readById', 'delete', 'showMessage']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PostDeleteComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        FormsModule,
      ],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (param: string) => '1' } } } },
      ],
    });

    fixture = TestBed.createComponent(PostDeleteComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve carregar a postagem no ngOnInit', fakeAsync(() => {
    postService.readById.and.returnValue(of(mockPost));

    fixture.detectChanges();
    tick();

    expect(component.post).toEqual(mockPost);
  }));

  it('Deve excluir a postagem e navegar ao chamar deletePost', fakeAsync(() => {
    postService.readById.and.returnValue(of(mockPost));
    postService.delete.and.returnValue(of());

    fixture.detectChanges();
    tick();

    component.deletePost();

    expect(postService.delete).toHaveBeenCalledWith(mockPost.id);
  }));

  it('Deve navegar ao cancelar', () => {
    component.cancel();

    expect(router.navigate).toHaveBeenCalledWith(['/posts']);
  });
});
