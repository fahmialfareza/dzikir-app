import { promisify } from 'util';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('dzikir-app.db');

export const init = async () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS dzikir_target (id INTEGER PRIMARY KEY NOT NULL, title VARCHAR NOT NULL, target INTEGER NOT NULL);',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error): boolean => {
          console.warn(error);
          resolve([]);
          return false;
        }
      );
    });
  });
};

export const insertDzikirTarget = (title: string, target: number) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO dzikir_target (title, target) VALUES (?, ?);`,
        [title, target],
        (_, result) => {
          resolve(result);
        },
        (_, error): boolean => {
          console.warn(error);
          resolve([]);
          return false;
        }
      );
    });
  });
};

export const fetchDzikirTargets = () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM dzikir_target;`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error): boolean => {
          console.warn(error);
          resolve([]);
          return false;
        }
      );
    });
  });
};

export const fetchDetailsDzikirTargets = (id: number) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM dzikir_target WHERE id=?;`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error): boolean => {
          console.warn(error);
          resolve([]);
          return false;
        }
      );
    });
  });
};

export const updateDzikirTarget = (
  id: number,
  title: string,
  target: number
) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE dzikir_target SET id=?, title=?, target=?;`,
        [id, title, target],
        (_, result) => {
          resolve(result);
        },
        (_, error): boolean => {
          console.warn(error);
          resolve([]);
          return false;
        }
      );
    });
  });
};

export const deleteDzikirTarget = (id: number) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE dzikir_target WHERE id=?;`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error): boolean => {
          console.warn(error);
          resolve([]);
          return false;
        }
      );
    });
  });
};
