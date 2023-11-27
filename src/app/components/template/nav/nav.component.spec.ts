import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [
        MatSidenavModule,
        MatIconModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
    });

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
  });

  it('Deve criar o aplicativo', () => {
    expect(component).toBeTruthy();
  });

  it('Deve ter uma navegação lateral com links para usuário e postagens', () => {
    const compiled = fixture.nativeElement;
    const sidenavContainer = compiled.querySelector('mat-sidenav-container');
    const sidenav = sidenavContainer.querySelector('mat-sidenav');
    const navList = sidenav.querySelector('mat-nav-list');
    const userLink = navList.querySelector('a[routerLink="/users"]');
    const postsLink = navList.querySelector('a[routerLink="/posts"]');

    expect(sidenavContainer).toBeTruthy();
    expect(sidenav).toBeTruthy();
    expect(navList).toBeTruthy();

    expect(userLink).toBeTruthy();
    expect(userLink.textContent.trim()).toContain('Usuários');
    expect(postsLink).toBeTruthy();
    expect(postsLink.textContent.trim()).toContain('Postagens');
  });

  it('Deve ter uma área de conteúdo principal com um router-outlet', () => {
    const compiled = fixture.nativeElement;
    const sidenavContent = compiled.querySelector('mat-sidenav-content');
    const routerOutlet = sidenavContent.querySelector('router-outlet');

    expect(sidenavContent).toBeTruthy();
    expect(routerOutlet).toBeTruthy();
  });
});
