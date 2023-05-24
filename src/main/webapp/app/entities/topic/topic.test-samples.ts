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
  description: 'invoice',
};

export const sampleWithNewData: NewTopic = {
  titre: 'de bX',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
