import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../models/comment';
import { authIdentityResponse, getAllCommentsResponse, saveCommentResponse } from '../models/response';
import { AuthenticationService } from '../services/authentication.service';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  public commentForm!: FormGroup;
  public allComments: Comment[] = [];
  public userId!: string;

  constructor(private commentService: CommentService, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
    this.commentService.getAllComments().subscribe((response: getAllCommentsResponse) => {
      this.allComments = response.comments;
    });
    this.authenticationService.getAuthIdentity().subscribe((response: authIdentityResponse) => {
      console.log(response.user._id);
      this.userId = response.user._id;
    });
  }

  public onSubmit() {
    const newComment = this.commentForm.get('comment')!.value;
    if (newComment) {
      this.commentService.saveComment(newComment).subscribe({
        next: (response: saveCommentResponse) => {
          this.ngOnInit();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  public delete(commentId: string) {
    this.commentService.deleteCommentById(commentId).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // public edit() {}
}
