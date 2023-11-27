import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatToolbarModule, RouterTestingModule],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('Deve criar o aplicativo.', () => {
    expect(component).toBeTruthy();
  });

  it('Deve ter um link para a página inicial com o logotipo', () => {
    const compiled = fixture.nativeElement;
    const linkElement = compiled.querySelector('a[routerLink="/"]');

    expect(linkElement).toBeTruthy();

    const imgElement = linkElement.querySelector('img.logo');
    expect(imgElement).toBeTruthy();
    expect(imgElement.getAttribute('src')).toEqual(
      '../../../../assets/logo.png'
    );
    expect(imgElement.getAttribute('alt')).toEqual('Logo');
  });

  it('Deve ter um link para a página inicial com o título AGBLOG', () => {
    const compiled = fixture.nativeElement;
    const linkElement = compiled.querySelector('span.title-group a');

    expect(linkElement).toBeTruthy();

    const iconElement = linkElement.querySelector('i.material-icons');
    expect(iconElement).toBeTruthy();
    expect(iconElement.textContent.trim()).toEqual('home');

    const textContent = linkElement.textContent.trim();
    const expectedText = 'AGBLOG - Gerenciamento de Blog';
    expect(textContent.includes(expectedText)).toBeTruthy();
  });

  it('Deve ter um ícone material para a página inicial', () => {
    const compiled = fixture.nativeElement;
    const iconElement = compiled.querySelector('i.material-icons');

    expect(iconElement).toBeTruthy();
    expect(iconElement.textContent.trim()).toEqual('home');
  });
});
