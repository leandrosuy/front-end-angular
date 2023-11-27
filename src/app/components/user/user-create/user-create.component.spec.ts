import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserCreateComponent } from './user-create.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { of, throwError } from 'rxjs';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const userServiceMock = jasmine.createSpyObj('UserService', [
      'create',
      'showMessage',
    ]);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [UserCreateComponent],
      imports: [
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatCheckboxModule,
        FormsModule,
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('Deve criar o aplicativo', () => {
    expect(component).toBeTruthy();
  });

  it('Deve chamar createUser e navegar ao clicar no botão salvar', fakeAsync(() => {
    userServiceSpy.create.and.returnValue(of(null));

    component.user = {
      name: 'John',
      gender: 'male',
      email: 'john@example.com',
      status: 'active',
    };

    component.createUser();
    tick();

    expect(userServiceSpy.create).toHaveBeenCalledWith(component.user);
    expect(userServiceSpy.showMessage).toHaveBeenCalledWith('Usuário criado!');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
  }));

  it('Deve lidar com erros ao criar o usuário e exibir mensagem de erro', fakeAsync(() => {
    const errorMessage = 'Erro ao criar usuário';
    spyOn(console, 'error');

    userServiceSpy.create.and.returnValue(throwError(errorMessage));

    component.user = {
      name: 'John',
      gender: 'male',
      email: 'john@example.com',
      status: 'active',
    };
    component.createUser();
    tick();

    expect(userServiceSpy.create).toHaveBeenCalledWith(component.user);
    expect(userServiceSpy.showMessage).toHaveBeenCalledWith(
      'Erro ao criar usuário. Verifique o console para mais detalhes.'
    );
    expect(console.error).toHaveBeenCalledWith(
      'Erro ao criar usuário:',
      errorMessage
    );
  }));

  it('Deve navegar ao clicar no botão cancelar', () => {
    component.cancel();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/users']);
  });
});
