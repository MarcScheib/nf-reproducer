import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TaskForm } from '@ui/sdk';

@Component({
  selector: 'app-missing-task',
  template: ` <div>Task not found: {{ taskData().name }}</div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissingTask extends TaskForm {}
