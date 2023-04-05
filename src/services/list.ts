//Create CRUD methods for card table
//TODO: Fix createEntry... it's not working
import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';

const db = new Database(DB_PATH, { verbose: console.log });
import type { ListEntry } from "$lib/types";

export function getEntrysFromList(listId: string): ListEntry[] {
    const sql = `select * from listEntry where list_id = $listId`;
    const stmnt = db.prepare(sql);
    const rows = stmnt.all({ listId });
    return rows as ListEntry[];
}

export function getEntryById(entryId: string): ListEntry {
    const sql = `select * from listEntry where id = $entryId`;
    const stmnt = db.prepare(sql);
    const row = stmnt.get({ entryId });
    return row as ListEntry;
}

export function updateEntry(entry: ListEntry): ListEntry {
    const sql = `update listEntry set text = $text where id = $id`;
    const stmnt = db.prepare(sql);
    stmnt.run(entry);
    return entry;
}
export function createEntry(entry: ListEntry): ListEntry {
    const sql = 'INSERT INTO listEntry (name, listId, created_at, updated_at) VALUES (?, ?, ?, ?)';
    const stmnt = db.prepare(sql);
    const info = stmnt.run(entry.name, entry.listId, entry.created_at, entry.updated_at);
    const lastInsertRowid = info.lastInsertRowid.toString();
    const result = { ...entry, id: lastInsertRowid, listId: lastInsertRowid };
    return result;
  }

