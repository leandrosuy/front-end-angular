import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserDeleteComponent } from './user-delete.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../user.service';

describe('UserDeleteComponent', () => {
  let component: UserDeleteComponent;
  let fixture: ComponentFixture<UserDeleteComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const userServiceMock = jasmine.createSpyObj('UserService', [
      'readById',
      'delete',
      'showMessage',
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [UserDeleteComponent],
      imports: [
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(UserDeleteComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('Deve criar o aplicativo', () => {
    expect(component).toBeTruthy();
  });

  it('Deve buscar os dados do usuário no ngOnInit', () => {
    const user = {
      id: 1,
      name: 'John',
      gender: 'male',
      email: 'john@example.com',
      status: 'active',
    };
    userServiceSpy.readById.and.returnValue(of(user));

    component.ngOnInit();

    expect(component.user).toEqual(user);
  });

  it('Deve chamar deleteUser e navegar ao clicar no botão de excluir', () => {
    userServiceSpy.delete.and.returnValue(of(null));

    component.user = {
      id: 1,
      name: 'John',
      gender: 'male',
      email: 'john@example.com',
      status: 'active',
    };
    component.deleteUser();

    expect(userServiceSpy.delete).toHaveBeenCalledWith(component.user.id);
    expect(userServiceSpy.showMessage).toHaveBeenCalledWith(
      'Usário excluido com sucesso!'
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('Deve navegar ao clicar no botão cancelar', () => {
    component.cancel();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
  });
});
