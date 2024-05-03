import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient, private router: Router) {}

  public saveComment(comment: string) {
    return this.http.post(environment.apiUrl + '/comments', {
      content: comment,
    });
  }

  public getAllComments() {
    return this.http.get(environment.apiUrl + '/comments');
  }
}
