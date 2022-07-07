import * as SQLite from 'expo-sqlite';

import DzikirTarget from '../models/dzikirTarget';

const db = SQLite.openDatabase('dzikir-app.db');

export const init = async () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS dzikir_target (id INTEGER PRIMARY KEY NOT NULL, title VARCHAR NOT NULL, target INTEGER NOT NULL, arabic VARCHAR NULL, background VARCHAR NULL, color VARCHAR NULL);',
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

export const insertDzikirTarget = (
  title: string,
  target: number,
  arabic: string,
  background: string,
  color: string
): Promise<DzikirTarget> => {
  return new Promise<DzikirTarget>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO dzikir_target (title, target, arabic, background, color) VALUES (?, ?, ?, ?, ?);`,
        [title, target, arabic, background, color],
        (_, result) => {
          resolve(Array.from(result.rows._array as any)[0] as DzikirTarget);
        },
        (_, error): boolean => {
          console.warn(error);
          return false;
        }
      );
    });
  });
};

export const fetchDzikirTargets = (): Promise<DzikirTarget[]> => {
  return new Promise<DzikirTarget[]>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM dzikir_target;`,
        [],
        (_, result) => {
          resolve(Array.from(result.rows._array as any) as DzikirTarget[]);
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

export const fetchDetailsDzikirTargets = (
  id: number
): Promise<DzikirTarget> => {
  return new Promise<DzikirTarget>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM dzikir_target WHERE id=?;`,
        [id],
        (_, result) => {
          resolve(Array.from(result.rows._array as any)[0] as DzikirTarget);
        },
        (_, error): boolean => {
          console.warn(error);
          return false;
        }
      );
    });
  });
};

export const updateDzikirTarget = (
  id: number,
  title: string,
  target: number,
  arabic: string,
  background: string,
  color: string
): Promise<DzikirTarget> => {
  return new Promise<DzikirTarget>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE dzikir_target SET id=?, title=?, target=?, arabic=?, background=?, color=? RETURNING id, title, target;`,
        [id, title, target, arabic, background, color],
        (_, result) => {
          resolve(Array.from(result.rows._array as any)[0] as DzikirTarget);
        },
        (_, error): boolean => {
          console.warn(error);
          return false;
        }
      );
    });
  });
};

export const deleteDzikirTarget = (id: number): Promise<DzikirTarget> => {
  return new Promise<DzikirTarget>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE dzikir_target WHERE id=? RETURNING id;`,
        [id],
        (_, result) => {
          resolve(Array.from(result.rows._array as any)[0] as DzikirTarget);
        },
        (_, error): boolean => {
          console.warn(error);
          return false;
        }
      );
    });
  });
};
