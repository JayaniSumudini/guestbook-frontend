import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent implements OnInit {
  public commentForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { content: string },
    public dialogRef: MatDialogRef<EditDialogComponent>
  ) {
    this.commentForm = new FormGroup({
      comment: new FormControl(data.content, [Validators.required, Validators.minLength(5)]),
    });
    dialogRef.beforeClosed().subscribe((response) => {
      const newComment = this.commentForm.get('comment')!.value;
      if (response && newComment !== data.content) {
        dialogRef.close(newComment);
      } else {
        dialogRef.close(false);
      }
    });
  }

  ngOnInit(): void {}
}
