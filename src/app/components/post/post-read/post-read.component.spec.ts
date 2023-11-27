import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PostReadComponent } from './post-read.component';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

describe('PostReadComponent', () => {
  let component: PostReadComponent;
  let fixture: ComponentFixture<PostReadComponent>;
  let postService: jasmine.SpyObj<PostService>;

  const mockPosts: Post[] = [{
    user_id: 4,
    name: 'Maitê Dantas',
    title: 'Guia gratuito para aprender programação e tecnologia – Roadmap.sh',
    body: 'As pessoas aprendem de forma de diferente, mas uma coisa que todo estudante precisa saber, é o que exatamente estudar. Os que sabem por onde começar, com frequência não sabem o que estudar na sequência, isso é um problema, especialmente no meio tech, onde existem vários caminhos e bifurcações. Existem caminhos pagos, gratuitos, focados em autodidatismo ou com tutoria, cada um para cada qual. Hoje, apresentamos o Roadmap.sh, uma página no GitHub construída pela comunidade, um guia gratuito para aprender programação e diversas áreas da tecnologia.',
    id: 2,
  }];

  beforeEach(() => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['read']);

    TestBed.configureTestingModule({
      declarations: [PostReadComponent],
      imports: [
        MatPaginatorModule,
        MatInputModule,
        MatTableModule,
        MatFormFieldModule,
        MatIconModule,
        BrowserAnimationsModule,
        FormsModule,
      ],
      providers: [{ provide: PostService, useValue: postServiceSpy }],
    });

    fixture = TestBed.createComponent(PostReadComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve carregar as postagens no ngOnInit', fakeAsync(() => {
    postService.read.and.returnValue(of(mockPosts));

    fixture.detectChanges();
    tick();

    expect(component.dataSource.data).toEqual(mockPosts);
  }));

  it('Deve aplicar o filtro corretamente', fakeAsync(() => {
    postService.read.and.returnValue(of(mockPosts));

    fixture.detectChanges();
    tick();

    component.searchValue = 'Guia gratuito para aprender programação e tecnologia – Roadmap.sh';
    component.applyFilter();

    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].title).toBe('Guia gratuito para aprender programação e tecnologia – Roadmap.sh');
  }));

  it('Deve formatar o texto corretamente', () => {
    const longText = 'This is a very long text that needs to be truncated';
    const result = component.formatText(longText);

    expect(result.length).toBeLessThanOrEqual(43);
    expect(result.endsWith('...')).toBe(true);
  });
});
