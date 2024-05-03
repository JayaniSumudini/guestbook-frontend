import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public commentForm!: FormGroup;
  public allComments: any = [];

  displayedColumns = ['content', 'userType', 'createdAt'];
  dataSource = this.allComments;

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required]),
    });
    this.commentService.getAllComments().subscribe((comments) => {
      this.allComments = comments;
    });
  }

  public onSubmit() {
    console.log(this.commentForm.get('comment')!.value);
    this.commentService.saveComment(this.commentForm.get('comment')!.value).subscribe({
      next: (res) => {
        this.commentService.getAllComments().subscribe((comments) => {
          this.allComments = comments;
        });
        console.log(this.allComments);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
