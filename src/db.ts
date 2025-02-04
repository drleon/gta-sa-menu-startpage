import Dexie, { EntityTable } from "dexie";

const initWebsites = [
  { id: 1, name: "Extensi home page", link: "https://extensi.io" },
  { id: 2, name: "Extensi on Atlassian's Marketplace", link: "https://marketplace.atlassian.com/vendors/1213262/extensi" },
  { id: 3, name: "Agile tools and filters for Jira", link: "https://marketplace.atlassian.com/apps/1215334/agile-tools-filters-for-jira-software" },
];

interface Website {
  id: number;
  name: string;
  link: string;
}

const db = new Dexie("WebsitesDatabase") as Dexie & {
  websites: EntityTable<Website, "id">;
};

db.version(1).stores({ websites: "++id, name, link" });

export type { Website };
export { db };

export async function initDb() {
  try {
    await db.open();
    const count = await db.websites.count();
    if (count > 0) return;
    for (let website of initWebsites) {
      await db.websites.add(website);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getDbArray() {
  try {
    await db.open();
    const dbArray = await db.websites.toArray();
    return dbArray;
  } catch (error) {
    console.error(error);
  }
}
