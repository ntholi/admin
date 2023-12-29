import { Resource, ResourceCreate } from './Resource';
import { Repository } from './Repository';

export interface User extends Resource {
  [key: string]: unknown;
}

export class FakeRepository implements Repository<User> {
  private data: User[] = [];

  listen(callback: (resources: User[]) => void): () => void {
    callback(this.data);
    console.log('Listening to data changes');
    return () => {};
  }

  async getAll(limit = 10): Promise<User[]> {
    console.log(`Getting all users with limit: ${limit}`);
    return this.data.slice(0, limit);
  }

  async get(id: string): Promise<User | undefined> {
    console.log(`Getting user with id: ${id}`);
    return this.data.find((user) => user.id === id);
  }

  async create(resource: ResourceCreate<User>): Promise<User> {
    const newUser = { ...resource, id: Date.now().toString() };
    this.data.push(newUser);
    console.log(`Created new user with id: ${newUser.id}`);
    return newUser;
  }

  async update(id: string, resource: Omit<User, 'id'>): Promise<User> {
    const user = this.data.find((user) => user.id === id);
    if (!user) throw new Error('User not found');
    Object.assign(user, resource);
    console.log(`Updated user with id: ${id}`);
    return user;
  }

  async delete(id: string): Promise<void> {
    this.data = this.data.filter((user) => user.id !== id);
    console.log(`Deleted user with id: ${id}`);
  }

  async getAllBy(field: string, value: string, limit = 8): Promise<User[]> {
    console.log(`Getting all users by field: ${field} with value: ${value}`);
    return this.data.filter((user) => user[field] === value).slice(0, limit);
  }

  getResource<R extends Resource>(
    resourceName: string,
    id: string
  ): Promise<R> {
    console.log(`Getting resource ${resourceName} with id: ${id}`);
    return Promise.resolve({ id } as R);
  }

  async getResourceList<R extends Resource>(
    resourceName: string
  ): Promise<R[]> {
    console.log(`Getting all resources ${resourceName}`);
    return Promise.resolve([] as R[]);
  }
}
