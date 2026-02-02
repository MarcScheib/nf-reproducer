export interface TaskDTO {
  id: string;
  created: string;
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
