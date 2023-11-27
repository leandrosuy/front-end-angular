import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { PostCreateComponent } from './post-create.component';
import { PostService } from '../post.service';
import { User } from '../../user/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('PostCreateComponent', () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let router: jasmine.SpyObj<Router>;

  const mockUsers: User[] = [
    { id: 1, name: 'User1', gender: 'Male', email: 'user1@example.com', status: 'active' },
    { id: 2, name: 'User2', gender: 'Female', email: 'user2@example.com', status: 'active' },
  ];

  beforeEach(() => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getUsers', 'create', 'showMessage']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PostCreateComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule
      ],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve carregar os usuários no ngOnInit.', fakeAsync(() => {
    postService.getUsers.and.returnValue(of(mockUsers));

    fixture.detectChanges();
    tick();

    expect(component.users).toEqual(mockUsers);
    expect(component.filteredUsers).toBeTruthy();
  }));

  it('Deve criar a postagem e navegar ao chamar createPost', fakeAsync(() => {
    postService.getUsers.and.returnValue(of(mockUsers));
    postService.create.and.returnValue(of());

    fixture.detectChanges();
    tick();

    component.createPost();

    expect(postService.create).toHaveBeenCalledWith(component.post);
  }));

  it('Deve lidar com erro ao chamar createPost', fakeAsync(() => {
    postService.getUsers.and.returnValue(of(mockUsers));
    postService.create.and.returnValue(throwError('Erro ao criar post'));

    fixture.detectChanges();
    tick();

    component.createPost();

    expect(postService.create).toHaveBeenCalledWith(component.post);
    expect(postService.showMessage).toHaveBeenCalledWith('Erro ao criar post');
  }));

  it('Deve cancelar e navegar ao clicar em cancelar', () => {
    component.cancel();

    expect(router.navigate).toHaveBeenCalledWith(['/posts']);
  });
});
