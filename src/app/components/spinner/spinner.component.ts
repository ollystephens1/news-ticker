import { Component, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  template: `
    <div *ngIf="!ready"  class="progress">
        <div class="indeterminate"></div>
    </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  @Input() ready: boolean = false;
}
