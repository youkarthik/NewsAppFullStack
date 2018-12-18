import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FavoritesComponent } from './favorites.component';
import { News } from '../models/news';
import { NewsService } from '../services/newsservice';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/observable/of';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let newsService: NewsService;

  beforeEach(async(() => {
    // let newsService = jasmine.createSpyObj('newsService', ['getFavoriteNews']);
    //     ((newsService.getFavoriteNews) as jasmine.Spy).and.returnValue(observableOf(new News()[0]));

    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule, HttpClientModule],
      declarations: [ FavoritesComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        // { provide: NewsService, useValue: newsService },
        NewsService,
        MatSnackBar
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    newsService = TestBed.get(NewsService);
    spyOn(newsService, 'getFavoriteNews').and.returnValue(Observable.of(new Array<News>()));


  });

  it('should create favorties component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFavoriteNews service while ngOnInit', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(newsService.getFavoriteNews).toHaveBeenCalled();
  });
});
