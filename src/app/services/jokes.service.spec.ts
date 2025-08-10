import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JokesService } from './jokes.service';
import { Joke } from '../model/joke.model';

describe('JokesService', () => {
  let service: JokesService;
  let httpMock: HttpTestingController;

  const mockJoke: Joke = {
    joke: 'Pourquoi les devs utilisent des claviers mécaniques ?',
    response: 'Pour taper fort sur les bugs.'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JokesService]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(JokesService);
    // Ignore la requête automatique
    httpMock.expectOne('api/joke').flush(mockJoke); // "consume" l'appel déclenché par le constructeur
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch a random joke and update the subject', (done) => {
    // Appelle manuellement la méthode pour tester
    service.getRandomJoke();

    const req = httpMock.expectOne('api/joke');
    expect(req.request.method).toBe('GET');

    req.flush(mockJoke);

    service.joke$().subscribe(joke => {
      expect(joke).toEqual(mockJoke);
      done(); // ✅ évite les erreurs async
    });
  });
});



// import { TestBed } from '@angular/core/testing';
//
// import { JokesService } from './jokes.service';
// import {HttpClientTestingModule} from "@angular/common/http/testing";
//
// describe('JokesService', () => {
//   let service: JokesService;
//
//   beforeEach(() => {
//       TestBed.configureTestingModule({
//         imports: [HttpClientTestingModule],
//         providers: [JokesService]
//       });
//       service = TestBed.get(JokesService);
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
//
// });
