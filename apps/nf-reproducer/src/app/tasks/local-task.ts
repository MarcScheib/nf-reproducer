import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SDK_VERSION, TaskForm } from '@ui/sdk';

@Component({
  selector: 'app-local-task',
  template: `
    <div>Local Task Component Loaded</div>
    <span>SDK Version: {{ version }}</span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalTask extends TaskForm {
  protected readonly version = inject(SDK_VERSION);
}
