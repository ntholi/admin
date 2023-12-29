export interface Resource {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ResourceCreate<OmitType> = Omit<OmitType, 'id' | 'updatedAt'>;
