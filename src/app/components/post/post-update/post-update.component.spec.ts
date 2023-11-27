import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PostUpdateComponent } from './post-update.component';
import { PostService } from '../post.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../user/user.model';
import { Post } from '../post.model';

describe('PostUpdateComponent', () => {
  let component: PostUpdateComponent;
  let fixture: ComponentFixture<PostUpdateComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let router: jasmine.SpyObj<Router>;

  const mockPost: Post = {
    user_id: 4,
    name: 'Maitê Dantas',
    title: 'Guia gratuito para aprender programação e tecnologia – Roadmap.sh',
    body: 'As pessoas aprendem de forma de diferente, mas uma coisa que todo estudante precisa saber, é o que exatamente estudar. Os que sabem por onde começar, com frequência não sabem o que estudar na sequência, isso é um problema, especialmente no meio tech, onde existem vários caminhos e bifurcações. Existem caminhos pagos, gratuitos, focados em autodidatismo ou com tutoria, cada um para cada qual. Hoje, apresentamos o Roadmap.sh, uma página no GitHub construída pela comunidade, um guia gratuito para aprender programação e diversas áreas da tecnologia.',
    id: 2,
  };
  const mockUsers: User[] = [
    {
      name: 'Bianca de cassia',
      gender: 'male',
      email: 'bia@gmail.com',
      status: 'active',
      id: 5,
    },
  ];

  beforeEach(() => {
    const postServiceSpy = jasmine.createSpyObj('PostService', [
      'getUsers',
      'readById',
      'update',
      'showMessage',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PostUpdateComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: (param: string) => '1' } } },
        },
      ],
    });

    fixture = TestBed.createComponent(PostUpdateComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve inicializar o componente', fakeAsync(() => {
    postService.getUsers.and.returnValue(of<User[]>(mockUsers));
    postService.readById.and.returnValue(of(mockPost));

    fixture.detectChanges();
    tick();

    expect(component.post).toEqual(mockPost);
    expect(component.users).toEqual(mockUsers);
  }));

  it('Deve lidar com erro de atualização', fakeAsync(() => {
    postService.getUsers.and.returnValue(of(mockUsers));
    postService.readById.and.returnValue(of(mockPost));

    fixture.detectChanges();
    tick();

    component.updatePost();

    expect(postService.showMessage).toHaveBeenCalledWith(
      'Erro ao atualizar a postagem!'
    );
  }));

  it('Deve cancelar e navegar para /posts', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/posts']);
  });
});
