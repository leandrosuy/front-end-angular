import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersCrudComponent } from './users-crud.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('UsersCrudComponent', () => {
  let component: UsersCrudComponent;
  let fixture: ComponentFixture<UsersCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersCrudComponent, UsersCrudComponent],
      imports: [MatButtonModule, RouterTestingModule, MatSnackBarModule],
    });

    fixture = TestBed.createComponent(UsersCrudComponent);
    component = fixture.componentInstance;
  });

  it('Deve criar o aplicativo', () => {
    expect(component).toBeTruthy();
  });

  it('Deve navegar para a criação de usuário quando o botão é clicado', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');

    component.navigateToUserCreate();

    expect(navigateSpy).toHaveBeenCalledWith(['/users/create']);
  });

  it('Deveria ter o botão Novo Usuário', () => {
    const buttonElement: HTMLElement =
      fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain('Novo Usuário');
  });

  it('Deveria conter o componente app-user-read.', () => {
    const appUserReadComponent =
      fixture.nativeElement.querySelector('app-user-read');
    expect(appUserReadComponent).toBeTruthy();
  });
});
