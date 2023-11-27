import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay'; // Adicione esta importação
import { UserService } from './user.service';
import { User } from './user.model';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, OverlayModule], // Adicione OverlayModule
      providers: [MatSnackBar],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve fazer uma solicitação POST para criar um usuário', () => {
    const user: User = {
      id: 1,
      name: 'John Doe',
      gender: 'Male',
      email: 'john.doe@example.com',
      status: 'Active',
    };

    service.create(user).subscribe((response) => {
      expect(response).toEqual(user);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('POST');
    req.flush(user);
  });

  it('Deve fazer uma solicitação GET para recuperar usuários', () => {
    const users: User[] = [
      {
        id: 1,
        name: 'John Doe2',
        gender: 'Male',
        email: 'john.doe@example.com',
        status: 'Active',
      },
      {
        id: 2,
        name: 'John Doe',
        gender: 'Male',
        email: 'john.doe2@example.com',
        status: 'Active',
      },
    ];

    service.read().subscribe((response) => {
      expect(response).toEqual(users);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('GET');
    req.flush(users);
  });

  it('Deve fazer uma solicitação GET para recuperar um usuário por ID', () => {
    const userId = 1;
    const user: User = {
      id: userId,
      name: 'John Doe',
      gender: 'Male',
      email: 'john.doe@example.com',
      status: 'Active',
    };

    service.readById(userId.toString()).subscribe((response) => {
      expect(response).toEqual(user);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/users/${userId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(user);
  });

  it('Deve fazer uma solicitação PUT para atualizar um usuário', () => {
    const user: User = {
      id: 1,
      name: 'John Doe',
      gender: 'Male',
      email: 'john.doe@example.com',
      status: 'Active',
    };

    service.update(user).subscribe((response) => {
      expect(response).toEqual(user);
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/users/${user.id}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(user);
  });

  it('Deve fazer uma solicitação DELETE para excluir um usuário', () => {
    const userId = 1;

    service.delete(userId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `http://localhost:3000/users/${userId}`
    );
    expect(req.request.method).toBe('DELETE');
  });
});
