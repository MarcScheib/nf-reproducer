import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TaskDTO } from '@ui/sdk';
import { AppRemoteTask } from '../tasks/app-remote-task';

@Component({
  imports: [AppRemoteTask],
  selector: 'app-root',
  template: ` <app-remote-task [taskData]="taskData" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected taskData: TaskDTO = {
    id: '42',
    name: 'Remote Task Example',
  };
}
