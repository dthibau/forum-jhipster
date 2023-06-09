import dayjs from 'dayjs/esm';

import { IMessage, NewMessage } from './message.model';

export const sampleWithRequiredData: IMessage = {
  id: 29027,
  subject: 'turn-key SQL Midi-Pyrénées',
};

export const sampleWithPartialData: IMessage = {
  id: 76000,
  subject: 'invoice',
  postDate: dayjs('2023-05-23'),
};

export const sampleWithFullData: IMessage = {
  id: 56535,
  subject: 'b action-items',
  content: 'projection',
  postDate: dayjs('2023-05-23'),
};

export const sampleWithNewData: NewMessage = {
  subject: 'invoice aggregate Gambie',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
