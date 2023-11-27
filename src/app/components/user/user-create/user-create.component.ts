import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  user: User = {
    name: '',
    gender: '',
    email: '',
    status: '0',
  };

  statusOptions = [
    { value: '1', label: 'Ativo' },
    { value: '0', label: 'Inativo' },
  ];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  createUser(): void {
    this.userService.create(this.user).subscribe(
      () => {
        this.userService.showMessage('Usuário criado!');
        this.router.navigate(['/users']);
      },
      (error) => {
        console.error('Erro ao criar usuário:', error);
        this.userService.showMessage(error.mensage);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
