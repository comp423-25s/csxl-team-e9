import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-delete-dialog',
  template: `
    <div class="dialog-container mat-elevation-z4">
      <div mat-dialog-title class="dialog-title">
        <mat-icon class="warning-icon" color="warn">warning</mat-icon>
        <span>{{ data.title || 'Confirm Deletion' }}</span>
      </div>

      <mat-divider></mat-divider>

      <div mat-dialog-content class="dialog-content">
        <p>{{ data.message }}</p>
      </div>

      <mat-divider></mat-divider>

      <div mat-dialog-actions class="dialog-actions">
        <button mat-stroked-button (click)="onCancel()">Cancel</button>
        <button mat-flat-button color="warn" (click)="onConfirm()">
          <mat-icon>delete</mat-icon>
          Delete
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        padding: 0;
        border-radius: 12px;
        min-width: 350px;
        background: var(--mdc-dialog-container-color);
      }

      .dialog-title {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 20px 24px 16px;
        font: var(--mat-headline-small-font);
        color: var(--mdc-dialog-supporting-text-color);
      }

      .warning-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
      }

      .dialog-content {
        padding: 20px 24px;
        font: var(--mat-body-medium-font);
        color: var(--mdc-dialog-supporting-text-color);
      }

      .dialog-actions {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 16px 24px;
      }

      mat-divider {
        margin: 0 !important;
        border-top-color: var(--mdc-dialog-divider-color);
      }

      button {
        padding: 0 16px;
        font: var(--mat-label-large-font);
      }

      button mat-icon {
        margin-right: 8px;
      }
    `
  ],
  standalone: true,
  imports: [MatIconModule, MatDividerModule, MatButtonModule]
})
export class ConfirmDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
    }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
