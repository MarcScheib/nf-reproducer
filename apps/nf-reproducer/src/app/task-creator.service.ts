import { loadRemoteModule } from '@angular-architects/native-federation';
import {
  Binding,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
  signal,
  Type,
} from '@angular/core';

export interface ComponentCreatorOptions<T> {
  injector: Injector;
  missingComponent: Promise<Type<T>>;
  components: Record<string, () => Promise<Type<T>>>;
  bindings?: Binding[];
}

export type ComponentMap<T> = Record<string, () => Promise<Type<T>>>;

@Injectable({ providedIn: 'root' })
export class TaskCreatorService<T> {
  private readonly environmentInjector = inject(EnvironmentInjector);

  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  async create(
    componentName: string,
    options: ComponentCreatorOptions<T>,
  ): Promise<ComponentRef<T>> {
    try {
      const componentClass = await this.loadComponentType(
        componentName,
        options,
      );
      return createComponent(componentClass, {
        environmentInjector: this.environmentInjector,
        elementInjector: options.injector,
        bindings: options.bindings,
      });
    } catch (error) {
      this.handleError(error, { componentName });
      throw error;
    }
  }

  async loadComponentType(
    componentName: string,
    options: ComponentCreatorOptions<T>,
  ): Promise<Type<T>> {
    try {
      const remoteComponent = await this.loadRemoteComponent(componentName);
      if (remoteComponent) {
        return remoteComponent;
      }

      const localComponent = await this.loadLocalComponent(
        componentName,
        options,
      );
      if (localComponent) {
        return localComponent;
      }
    } catch (error) {
      this.handleError(error, { componentName });
    }

    // whenever an error occurs, load the missing component
    return await options.missingComponent;
  }

  private async loadRemoteComponent(
    componentName: string,
  ): Promise<Type<T> | null> {
    try {
      const module = await loadRemoteModule<typeof import('@ui/sdk')>(
        'nf-reproducer-remote',
        './tasks',
      );

      const tasks = module.TaskForms as Record<string, Type<T>>;
      if (tasks?.[componentName]) {
        return tasks[componentName] as Type<T>;
      }
    } catch (error) {
      console.error('Could not load remote component.', error);
    }
    return null;
  }

  private async loadLocalComponent(
    componentName: string,
    options: ComponentCreatorOptions<T>,
  ): Promise<Type<T> | null> {
    const importFn = options.components[componentName];
    if (!importFn) {
      return null;
    }

    try {
      return await importFn();
    } catch (error) {
      console.error(
        `Failed to local component '${String(componentName)}'.`,
        error,
      );
    }
    return null;
  }

  private handleError(
    error: unknown,
    context: {
      componentName?: string;
    },
  ): void {
    const message =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred while loading the component';
    console.error('[TaskCreatorService] Failed to load component', {
      ...context,
      error: message,
    });
  }
}
