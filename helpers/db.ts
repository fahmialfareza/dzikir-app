import * as SQLite from 'expo-sqlite';
import { SQLResultSet } from 'expo-sqlite';

import TasbeehTarget from '../models/tasbeehTarget';

const db = SQLite.openDatabase('dzikir-app.db');

export const init = async () => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tasbeeh_target (id INTEGER PRIMARY KEY NOT NULL, title VARCHAR NOT NULL, target INTEGER NOT NULL, arabic VARCHAR NULL, background VARCHAR NULL, color VARCHAR NULL, counter INTEGER DEFAULT 0);',
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

export const insertTasbeehTarget = (
  title: string,
  target: number,
  arabic: string,
  background: string,
  color: string
): Promise<SQLResultSet> => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO tasbeeh_target (title, target, arabic, background, color) VALUES (?, ?, ?, ?, ?);`,
        [title, target, arabic, background, color],
        (_, result) => {
          resolve(result);
        },
        (_, error): boolean => {
          console.warn(error);
          return false;
        }
      );
    });
  });
};

export const fetchTasbeehTargets = (): Promise<TasbeehTarget[]> => {
  return new Promise<TasbeehTarget[]>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tasbeeh_target;`,
        [],
        (_, result) => {
          resolve(Array.from(result.rows._array as any) as TasbeehTarget[]);
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

export const fetchDetailsTasbeehTarget = (
  id: number
): Promise<TasbeehTarget> => {
  return new Promise<TasbeehTarget>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM tasbeeh_target WHERE id=?;`,
        [id],
        (_, result) => {
          resolve(Array.from(result.rows._array as any)[0] as TasbeehTarget);
        },
        (_, error): boolean => {
          console.warn(error);
          return false;
        }
      );
    });
  });
};

export const updateTasbeehTarget = (
  id: number,
  title: string,
  target: number,
  arabic: string,
  background: string,
  color: string,
  counter: number
): Promise<TasbeehTarget> => {
  return new Promise<TasbeehTarget>((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE tasbeeh_target SET title=?, target=?, arabic=?, background=?, color=?, counter=? WHERE id=?;`,
        [title, target, arabic, background, color, counter, id],
        (_, result) => {
          resolve(Array.from(result.rows._array as any)[0] as TasbeehTarget);
        },
        (_, error): boolean => {
          console.warn(error);
          return false;
        }
      );
    });
  });
};

export const deleteTasbeehTarget = (id: number): Promise<SQLResultSet> => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM tasbeeh_target WHERE id=?;`,
        [id],
        (_, result) => {
          resolve(result);
        },
        (_, error): boolean => {
          console.warn(error);
          return false;
        }
      );
    });
  });
};
