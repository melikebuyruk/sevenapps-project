import Dexie, { Table } from "dexie";

export interface Setting {
  key: string;
  value: string;
}

export interface Document {
  id: string;
  content: string;
}

class MarkdownDB extends Dexie {
  settings!: Table<Setting, string>;
  documents!: Table<Document, string>;

  constructor() {
    super("Markdown");
    this.version(1).stores({
      settings: "&key",
      documents: "id",
    });
  }
}
export const db = new MarkdownDB();
