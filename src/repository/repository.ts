import { Resource, ResourceCreate } from './Resource';

export interface Repository<T extends Resource> {
  listen: (callback: (resources: T[]) => void) => () => void;
  getAll: (limit?: number) => Promise<T[]>;
  get: (id: string) => Promise<T | undefined>;
  create: (resource: ResourceCreate<T>) => Promise<T>;
  update: (id: string, resource: T) => Promise<T>;
  delete: (id: string) => Promise<void>;
  getAllBy: (field: string, value: string) => Promise<T[]>;
  getResource<R extends Resource>(resourceName: string, id: string): Promise<R>;
  getResourceList<R extends Resource>(resourceName: string): Promise<R[]>;
}
