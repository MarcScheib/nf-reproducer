import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SDK_VERSION, TaskForm } from '@ui/sdk';

@Component({
  selector: 'app-remote-task',
  imports: [JsonPipe],
  template: `
    <h1>Remote Task</h1>

    <div>SDK Version: {{ version }}</div>

    <hr />

    <p>Task ID: {{ taskData().id }}</p>
    <pre>{{ taskData() | json }}</pre>

    <button (click)="onExecute()">Approve</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRemoteTask extends TaskForm {
  protected readonly version = inject(SDK_VERSION);

  onExecute() {
    this.action.emit({
      task: this.taskData(),
      formData: this.getFormData(),
    });
  }
}
