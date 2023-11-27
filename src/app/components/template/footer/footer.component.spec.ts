import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [MatToolbarModule],
    });

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('Deve criar o aplicativo', () => {
    expect(component).toBeTruthy();
  });

  it('Deve renderizar corretamente as informações do desenvolvedor', () => {
    const compiled = fixture.nativeElement;
    const spanElement = compiled.querySelector('span');

    expect(spanElement.textContent).toContain('Desenvolvido com');
    expect(spanElement.textContent).toContain('por Leandro Dantas');
  });

  it('Deve ter o ícone material correto.', () => {
    const compiled = fixture.nativeElement;
    const iconElement = compiled.querySelector('i');

    expect(iconElement).toBeTruthy();
    expect(iconElement.classList.contains('material-icons')).toBeTruthy();
    expect(iconElement.classList.contains('red')).toBeTruthy();
    expect(iconElement.classList.contains('v-middle')).toBeTruthy();
    expect(iconElement.textContent.trim()).toEqual('security');
  });

  it("Deve ter uma tag strong para o nome do desenvolvedor", () => {
    const compiled = fixture.nativeElement;
    const strongElement = compiled.querySelector('strong');

    expect(strongElement).toBeTruthy();
    expect(strongElement.textContent.trim()).toEqual('Leandro Dantas');
  });

  it('Deve ter uma tag span com a classe red para o sobrenome', () => {
    const compiled = fixture.nativeElement;
    const redSpanElement = compiled.querySelector('span.red');

    expect(redSpanElement).toBeTruthy();
    expect(redSpanElement.textContent.trim()).toEqual('Dantas');
  });
});
