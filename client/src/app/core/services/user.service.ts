import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api.response';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(name: string): Observable<User[] | [] | null> {
    let url = '/user/listUsers';
    if (name != '') {
      url = `/user/listUsers?name=${name}`;
    }
    return this.http.get<ApiResponse<User[]>>(`${url}`).pipe(
      map((userResponse: ApiResponse<User[]>) => userResponse.data), // Extract the data from the response
      catchError(() => of(null)) // Catch any errors and return null
    );
  }

  updateUser(user: User) {
    return this.http.put<User>('/user/updateUser', user);
  }

  createUser(userPayload: User) {
    return this.http.post<ApiResponse<User>>('/user/addUser', userPayload);
  }

  deleteUser(user: User) {
    return this.http.delete<ApiResponse<User>>(`/user/deleteUser/${user._id}`);
  }
}
