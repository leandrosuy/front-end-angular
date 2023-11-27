import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [MatCardModule],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('Deve criar o aplicativo', () => {
    expect(component).toBeTruthy();
  });

  it('Deveria ter uma mensagem de boas-vindas', () => {
    const titleElement: HTMLElement =
      fixture.nativeElement.querySelector('.title');
    expect(titleElement.textContent).toContain('Bem Vindo!');
  });

  it('Deveria ter um subtítulo com o texto correto', () => {
    const subtitleElement: HTMLElement =
      fixture.nativeElement.querySelector('.subtitle');
    expect(subtitleElement.textContent).toContain(
      'Sistema para gerenciamento de Usuários de Postagens'
    );
  });
});
