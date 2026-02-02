import type { Type } from '@angular/core';
import {
  Directive,
  inject,
  input,
  output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskActionRequest, TaskDTO } from './task-types';

@Directive()
export abstract class TaskForm {
  /**
   * Task data input (required)
   * Contains task metadata and variables from backend
   */
  readonly taskData = input.required<TaskDTO>();

  /**
   * Action requested output - unified API for all task actions
   * Components emit TaskActionRequest when portal button clicked
   */
  readonly btxAction = output<TaskActionRequest>();

    /**
   * FormBuilder instance injected for creating reactive forms.
   * Used by subclasses to construct form groups and controls.
   */
  protected readonly fb = inject(FormBuilder);

  /**
   * FormGroup for editable fields
   * Override buildForm() in subclasses to populate
   */
  protected readonly form: FormGroup;

  constructor() {
    this.form = this.buildForm();
  }

  /**
   * Build reactive form for editable fields.
   * Override this method in subclasses that have editable inputs to create form controls.
   *
   * @returns FormGroup with form controls
   */
  protected buildForm(): FormGroup {
    return new FormGroup({});
  }

  /**
   * Disable form inputs when task is completed.
   * Called automatically by base class when isCompleted() is true.
   *
   * Override in subclasses if additional controls need to be disabled.
   */
  protected disableForm(): void {
    this.form.disable({ emitEvent: false });
  }

  /**
   * Enable form inputs when task is not completed.
   * Called automatically by base class when isCompleted() is false.
   *
   * Override in subclasses if additional controls need to be enabled.
   */
  protected enableForm(): void {
    this.form.enable({ emitEvent: false });
  }

  /**
   * Extract form data for BTX payload
   * Called by TaskFormService before executing actions
   *
   * @returns Form values as Record<string, unknown>, or empty object if no form
   */
  public getFormData(): Record<string, unknown> {
    return this.form?.getRawValue() ?? {};
  }
}

export type TaskForms = Record<string, Type<TaskForm>>;
