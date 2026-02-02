import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  template: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
}
