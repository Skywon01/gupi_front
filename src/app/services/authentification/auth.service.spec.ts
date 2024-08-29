import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { UserModel } from '../../model/user.model';
import {apiRoot, httpoptions} from "../api.service";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  it('devrait récupérer le profil utilisateur et mettre à jour la session', () => {
    const mockUser: UserModel = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: 'USER',
        firstName: '',

      } as UserModel;
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify({ id: 1 }));
    spyOn(sessionStorage, 'setItem');

    service.refreshUserProfile().subscribe(user => {
        expect(user).toEqual(mockUser);
      expect(sessionStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
      expect(sessionStorage.setItem).toHaveBeenCalledWith('roles', JSON.stringify(mockUser.role));
    });

    const req = httpMock.expectOne(`${service}/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('devrait vérifier si l\'utilisateur est authentifié', () => {
    spyOn(service, 'getUser').and.returnValue({ id: 1 });
    expect(service.isAuthenticated()).toBeTrue();

    service.getUser = jasmine.createSpy().and.returnValue(null);
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('devrait récupérer les rôles de l\'utilisateur', () => {
    const mockRoles = [{ id: 1, name: 'USER', authority: 'USER' }];
    spyOn(sessionStorage, 'getItem').and.returnValue(JSON.stringify(mockRoles));
    expect(service.getRoles()).toEqual(mockRoles);
  });

  it('devrait retourner null si aucun rôle n\'est trouvé', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);
    expect(service.getRoles()).toEqual([]);
  });
});
