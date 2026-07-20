import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TaskForm } from '@ui/sdk';

@Component({
  selector: 'app-missing-task',
  template: ` <div>Task form not found for type <strong>{{ taskData().name }}</strong></div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissingTask extends TaskForm {}
