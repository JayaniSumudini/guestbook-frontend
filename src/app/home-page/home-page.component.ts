import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../models/comment';
import { getAllCommentsResponse, saveCommentResponse } from '../models/response';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public commentForm!: FormGroup;
  public allComments: Comment[] = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required]),
    });
    this.commentService.getAllComments().subscribe((response: getAllCommentsResponse) => {
      this.allComments = response.comments;
    });
  }

  public onSubmit() {
    console.log(this.commentForm.get('comment')!.value);
    this.commentService.saveComment(this.commentForm.get('comment')!.value).subscribe({
      next: (response: saveCommentResponse) => {
        this.commentService.getAllComments().subscribe({
          next: (response: getAllCommentsResponse) => {
            this.allComments = response.comments;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
