import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';



@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './dialog.component.css',
  template: `
  <h1 [ngClass]="data.type">{{ data.title }}</h1>

  <div class="p-dialog-content" [ngClass]="data.type"> 
    {{ data.message }}
  </div>
  <div class="p-dialog-footer">
    <button pButton label="OK" (click)="close()"></button>
  </div>
  `
})
export class DialogComponent {


  data: any;

 
  constructor(@Inject(DynamicDialogRef) public ref: DynamicDialogRef, 
    @Inject(DynamicDialogConfig) public config: DynamicDialogConfig) {
    this.data = this.config.data;
  }
  close() {
    this.ref.close();
  }

}
