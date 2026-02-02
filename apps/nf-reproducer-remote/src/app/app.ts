import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  template: `simply works`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
