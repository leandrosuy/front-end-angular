import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../user.service';
import { UserUpdateComponent } from '../user-update/user-update.component';

describe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const userServiceMock = jasmine.createSpyObj('UserService', [
      'readById',
      'update',
      'showMessage',
    ]);

    TestBed.configureTestingModule({
      declarations: [UserUpdateComponent],
      imports: [
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatCheckboxModule,
        FormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('Deve criar o aplicativo', () => {
    expect(component).toBeTruthy();
  });

  it('Deve buscar dados do usuário no ngOnInit', () => {
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

  it('Deve chamar updateUser e navegar ao clicar no botão salvar.', () => {
    userServiceSpy.update.and.returnValue(of(null));
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');

    component.user = {
      id: 1,
      name: 'John',
      gender: 'male',
      email: 'john@example.com',
      status: 'active',
    };
    component.updateUser();

    expect(userServiceSpy.update).toHaveBeenCalledWith(component.user);
    expect(userServiceSpy.showMessage).toHaveBeenCalledWith(
      'Usuário atualizado com sucesso!'
    );
    expect(routerSpy).toHaveBeenCalledWith(['/users']);
  });

  it('Deve navegar ao clicar no botão cancelar', () => {
    const routerSpy = spyOn(TestBed.inject(Router), 'navigate');

    component.cancel();

    expect(routerSpy).toHaveBeenCalledWith(['/users']);
  });
});
