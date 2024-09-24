import { openDB } from 'idb';

const initdb = async () =>
  openDB('bytewriter', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('bytewriter')) {
        console.log('DB already exists');
        return;
      }
      db.createObjectStore('bytewriter', { keyPath: 'id', autoIncrement: true });
      console.log('DB created');
    },
  });

export const putDb = async (content) => {
  const db = await openDB('bytewriter', 1);
  const tx = db.transaction('bytewriter', 'readwrite');
  const store = tx.objectStore('bytewriter');
  const result = await store.put({ id: 1, value: content });
  console.log('Saved to DB', result);
};

export const getDb = async () => {
  const db = await openDB('bytewriter', 1);
  const tx = db.transaction('bytewriter', 'readonly');
  const store = tx.objectStore('bytewriter');
  const result = await store.get(1);
  return result?.value;
};

initdb();