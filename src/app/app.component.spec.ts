import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { JokesService } from './services/jokes.service';
import { of } from 'rxjs';
import { Joke } from './model/joke.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let jokeServiceSpy: jasmine.SpyObj<JokesService>;

  const mockJoke: Joke = {
    joke: 'Pourquoi les devs n’aiment pas la lumière ?',
    response: 'Parce qu’ils préfèrent les bugs !'
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('JokesService', ['joke$', 'getRandomJoke']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: JokesService, useValue: spy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // ignore Angular Material tags
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    jokeServiceSpy = TestBed.inject(JokesService) as jasmine.SpyObj<JokesService>;
    jokeServiceSpy.joke$.and.returnValue(of(mockJoke));
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should get a joke on init', () => {
    component.ngOnInit();
    expect(jokeServiceSpy.getRandomJoke).toHaveBeenCalled();
  });

  it('should call getRandomJoke when button clicked', () => {
    component.getRandomJoke();
    expect(jokeServiceSpy.getRandomJoke).toHaveBeenCalled();
  });
});




// import { TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import {JokesService} from "./services/jokes.service";
// import {HttpClientTestingModule} from "@angular/common/http/testing";
//
// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [AppComponent],
//       imports: [HttpClientTestingModule],
//       providers: [JokesService]
//     }).compileComponents();
//   });
//
//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });
// });
