import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  public text!: string;
  public subtext!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { text: string; subtext: string },
    public dialogRef: MatDialogRef<DeleteDialogComponent>
  ) {
    this.text = data.text;
    this.subtext = data.subtext ? data.subtext : 'Would you like to delete?';
  }

  ngOnInit(): void {}
}
