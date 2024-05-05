import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Comment } from '../models/comment';
import { authIdentityResponse, getAllCommentsResponse, saveCommentResponse } from '../models/response';
import { AuthenticationService } from '../services/authentication.service';
import { CommentService } from '../services/comment.service';

import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  public commentForm!: FormGroup;
  public allComments: Comment[] = [];
  public userId!: string;

  constructor(
    private commentService: CommentService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog
  ) {}

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
  private deleteComment(commentId: string) {
    this.commentService.deleteCommentById(commentId).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openDeleteDialog(commentId: string): void {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {
        commentId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.deleteComment(commentId);
      }
    });
  }

  private updateComment(commentId: string, comment: string): void {
    this.commentService.updateCommentById(commentId, comment).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openEditDialog(commentId: string, comment: string): void {
    let dialogRef = this.dialog.open(EditDialogComponent, {
      width: '650px',
      // height: '300px',
      data: {
        content: comment,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateComment(commentId, result);
      }
    });
  }
}
