import { v4 as uuid } from 'uuid';

const storage = sessionStorage;

const createTabGUIDToStorage = () => {
  const tabGUID = storage.getItem('sid') || uuid();
  storage.setItem('sid', tabGUID);
};

const getTabGUID = () => {
  return storage.getItem('sid');
};

export { createTabGUIDToStorage, getTabGUID };
