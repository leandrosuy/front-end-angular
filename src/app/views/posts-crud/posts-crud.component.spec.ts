import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostsCrudComponent } from './posts-crud.component';
import { MatButtonModule } from '@angular/material/button';

describe('PostsCrudComponent', () => {
  let component: PostsCrudComponent;
  let fixture: ComponentFixture<PostsCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostsCrudComponent, PostsCrudComponent],
      imports: [MatButtonModule, RouterTestingModule],
    });

    fixture = TestBed.createComponent(PostsCrudComponent);
    component = fixture.componentInstance;
  });

  it('Deve criar o Crud Component', () => {
    expect(component).toBeTruthy();
  });

  it('Deve navegar para a criação de usuário quando o botão é clicado.', () => {
    const navigateSpy = spyOn(component['router'], 'navigate');

    component.navigateToUserCreate();

    expect(navigateSpy).toHaveBeenCalledWith(['/posts/create']);
  });

  it('Deveria ter o botão Nova Postagem', () => {
    const buttonElement: HTMLElement =
      fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain('Novo Postagem');
  });

  it('Deveria conter o componente app-post-read.', () => {
    const appPostReadComponent =
      fixture.nativeElement.querySelector('app-post-read');
    expect(appPostReadComponent).toBeTruthy();
  });
});
