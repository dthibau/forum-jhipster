import { ITopic, NewTopic } from './topic.model';

export const sampleWithRequiredData: ITopic = {
  id: 51387,
  titre: 'Beauty bluetooth Intelligent',
};

export const sampleWithPartialData: ITopic = {
  id: 61514,
  titre: 'Account Bacon Ball',
};

export const sampleWithFullData: ITopic = {
  id: 86027,
  titre: 'cXXXX',
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewTopic = {
  titre: 'invoice',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
