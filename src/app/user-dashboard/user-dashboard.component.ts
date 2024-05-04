import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../models/comment';
import { getAllCommentsResponse, saveCommentResponse } from '../models/response';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  public commentForm!: FormGroup;
  public allComments: Comment[] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
    this.commentService.getAllComments().subscribe((response: getAllCommentsResponse) => {
      this.allComments = response.comments;
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
}
