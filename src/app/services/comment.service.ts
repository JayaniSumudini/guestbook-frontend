import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { getAllCommentsResponse, saveCommentResponse } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient, private router: Router) {}

  public saveComment(comment: string): Observable<saveCommentResponse> {
    return this.http.post<saveCommentResponse>(environment.apiUrl + '/comments', {
      content: comment,
    });
  }

  public getAllComments(): Observable<getAllCommentsResponse> {
    return this.http.get<getAllCommentsResponse>(environment.apiUrl + '/comments');
  }
}
