import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

export enum DialogOptions {
  OK = 'OK',
  NO = 'NO',
}
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) {}

  ngOnInit(): void {}
}
