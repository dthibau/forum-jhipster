import dayjs from 'dayjs/esm';
import { IUser } from 'app/entities/user/user.model';
import { ITopic } from 'app/entities/topic/topic.model';

export interface IMessage {
  id: number;
  subject?: string | null;
  content?: string | null;
  postDate?: dayjs.Dayjs | null;
  author?: Pick<IUser, 'id' | 'login'> | null;
  topic?: Pick<ITopic, 'id' | 'titre'> | null;
  message?: Pick<IMessage, 'id'> | null;
}

export type NewMessage = Omit<IMessage, 'id'> & { id: null };
