import type { Type } from '@angular/core';
import {
  Directive,
  inject,
  input,
  output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface TaskDTO {
  id: string;
  name: string;
  description?: string;
}

/**
 * Form data dictionary for task actions
 */
export interface TaskFormData {
  [key: string]: unknown;
}

/**
 * Event emitted when user requests an action
 */
export interface TaskActionRequest {
  /** The task to execute on */
  task: TaskDTO;
  /** Eagerly provided form data */
  formData?: TaskFormData;
}


@Directive()
export abstract class TaskForm {
  readonly taskData = input.required<TaskDTO>();
  readonly action = output<TaskActionRequest>();

  protected readonly fb = inject(FormBuilder);
  protected readonly form: FormGroup;

  constructor() {
    this.form = this.buildForm();
  }

  protected buildForm(): FormGroup {
    return new FormGroup({});
  }

  public getFormData(): Record<string, unknown> {
    return this.form?.getRawValue() ?? {};
  }
}

export const TaskForms: Record<string, Type<TaskForm>> = {};
