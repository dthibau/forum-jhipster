export interface ITopic {
  id: number;
  titre?: string | null;
  description?: string | null;
}

export type NewTopic = Omit<ITopic, 'id'> & { id: null };
