import { Component, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  template: `
    <div class="spinner" *ngIf="!ready">
      <p class="text-muted">{{ message }}</p>
    </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  @Input() ready: boolean = false;
  @Input() message: string;


}
