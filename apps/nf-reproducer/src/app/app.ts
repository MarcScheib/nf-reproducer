import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  inputBinding,
  outputBinding,
  resource,
  signal,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { TaskActionRequest, TaskDTO, TaskForm } from '@ui/sdk';
import { TaskCreatorService } from './task-creator.service';
import { localTasks } from './tasks';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    <div>Select task:</div>
    <ul>
      <li><button (click)="taskType.set('local')">Local Task</button></li>
      <li><button (click)="taskType.set('remote')">Remote Task</button></li>
    </ul>

    <ng-container #container />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly service =
    inject<TaskCreatorService<TaskForm>>(TaskCreatorService);
  private readonly injector = inject(Injector);

  private readonly container = viewChild.required('container', {
    read: ViewContainerRef,
  });

  protected readonly taskType = signal<string>('unknown-type');
  private readonly task = signal<TaskDTO>({
    id: '1',
    name: 'Some Task',
  });

  private readonly componentRef = resource({
    params: () => ({ taskType: this.taskType() }),
    loader: ({ params }) =>
      this.service.create(params.taskType, {
        injector: this.injector,
        missingComponent: import('./tasks/missing-task').then(
          (m) => m.MissingTask,
        ),
        components: localTasks,
        bindings: [
          inputBinding('taskData', this.task),
          outputBinding('action', (action: TaskActionRequest) =>
            console.log(action),
          ),
        ],
      }),
  });

  constructor() {
    afterRenderEffect(() => {
      const vcr = this.container();
       if (this.componentRef.error()) {
        console.error('Error loading component:', this.componentRef.error());
        return;
      } else if (!this.componentRef.hasValue()) {
        console.log('No value');
        return;
      } 

      console.log('Inserting component');

      vcr.clear();
      vcr.insert(this.componentRef.value().hostView);
    });
  }
}
