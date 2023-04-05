import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';

const db = new Database(process.env.DB_PATH ?? DB_PATH, { verbose: console.log });
console.log(process.env.DB_PATH, db);
import type { Card } from '../models/card';

export function searchCards(searchTerm: string, limit = 50): Card[] {
    const sql = `select * from card where lower(text)
     like lower('%' || $searchTerm || '%') limit $limit`;
    const stmnt = db.prepare(sql);
    const rows = stmnt.all({ searchTerm, limit });
    return rows as Card[];
}

export function getCards(): Card[] {
    const sql = `select * from card`;
    const stmnt = db.prepare(sql);
    const rows = stmnt.all();
    return rows as Card[];
}

export function getCardById(cardId: number): Card {
    const sql = `select * from card where id = $cardId`;
    const stmnt = db.prepare(sql);
    const row = stmnt.get({ cardId });
    return row as Card;
}

export function updateCard(card: Card): Card {
    const sql = `update card set text = $text where id = $id`;
    const stmnt = db.prepare(sql);
    stmnt.run(card);
    return card;
}

export function createCard(card: Card): Card {
    console.log(card);
    const sql = `insert into card (text) values ($text)`;
    const stmnt = db.prepare(sql);
    const info = stmnt.run(card);
    return { ...card, id: info.lastInsertRowid.toString() };
}
