import { TaskForm } from '@ui/sdk';
import { ComponentMap } from '../task-creator.service';

export const localTasks: ComponentMap<TaskForm> = {
  local: () => import('./local-task').then((m) => m.LocalTask),
};
