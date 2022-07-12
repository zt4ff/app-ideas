import idb from "idb";

interface CustomerData {
  userid: string;
  name: string;
  email: string;
}

class Customer {
  private dbname: string;
  private db!: idb.IDBPDatabase<unknown>;

  constructor(dbname: string) {
    this.dbname = dbname;

    if (!("indexedDB" in window)) {
      alert("sorry your machine cannot run indexedDB");
    }
  }

  close = () => {
    this.db.close();
  };

  loadInitialData = async (customerData: CustomerData[]) => {
    this.db = await idb.openDB(this.dbname, 1, {
      upgrade(database) {
        let objectStore: idb.IDBPObjectStore<
          unknown,
          ArrayLike<string>,
          "customer",
          "versionchange"
        >;

        objectStore = database.createObjectStore("customer", {
          keyPath: "userid",
        });

        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("email", "email", { unique: false });

        customerData.forEach((customer) => {
          objectStore.put(customer);
        });
      },
    });
  };

  initialLoad = (customerData: CustomerData[]) => {};
}

function main() {
  const db = new Customer("play");

  const customerData: CustomerData[] = [
    { userid: "444", name: "Bill", email: "bill@company.com" },
    { userid: "555", name: "Donna", email: "donna@home.org" },
  ];
  db.loadInitialData(customerData);
}

main();
