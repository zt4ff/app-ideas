interface CustomerData {
  userid: string;
  name: string;
  email: string;
}

class Customer {
  dbName: string;

  constructor(dbName: string) {
    this.dbName = dbName;

    // if browser does not support indexdb
    if (!window.indexedDB) {
      alert(
        "Your browser doesn't support a stable version of IndexedDB.\nSuch and such feature will not be available."
      );
    }
  }

  // remove all rows from the database
  removeAllRows = () => {
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      const target = event.target as IDBOpenDBRequest;

      console.log(
        `removeAllRows - Database error: ${target.error?.code} - ${target.error?.message}`
      );
    };

    request.onsuccess = (event) => {
      console.log("Deleting all customer...");

      const target = event.target as IDBOpenDBRequest;
      const db = target.result;
      const txn = db.transaction("customer", "readwrite");

      txn.onerror = (event) => {
        console.log(
          `removeAllRows - Txn error: ${target.error?.code} - ${target.error?.message}`
        );
        txn.oncomplete = (event) => {
          console.log("All rows removed");
        };

        const objectStore = txn.objectStore("customers");
        const getAllKeysRequest = objectStore.getAllKeys();
        getAllKeysRequest.onsuccess = (event) => {
          getAllKeysRequest.result.forEach((key) => {
            objectStore.delete(key);
          });
        };
      };
    };
  };

  /**
   * Populate the Customer database with an initial set of customer data
   */
  initialLoad = (customerData: CustomerData[]) => {
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      const target = event.target as IDBOpenDBRequest;

      console.log(
        `initial load - Txn error: ${target.error?.code} - ${target.error?.message}`
      );
    };

    request.onupgradeneeded = (event) => {
      console.log("Populating customers ...");
      const target = event.target as IDBOpenDBRequest;
      const db = target.result;

      const objectStore = db.createObjectStore("customer", {
        keyPath: "userid",
      });

      objectStore.createIndex("name", "name", { unique: false });
      objectStore.createIndex("email", "email", { unique: false });

      // populate the database with the initial set of rows
      customerData.forEach((customer) => {
        objectStore.put(customer);
      });
      db.close();
    };
  };
}

// clear all customer data from the database
const clearDB = (databaseName: string) => {
  let customer = new Customer(databaseName);
  customer.removeAllRows();
};

// Add customer to the database
const loadDB = (databaseName: string) => {
  console.log("Load the Customers database");

  // Customers to add to initially populate the database with
  const customerData: CustomerData[] = [
    { userid: "444", name: "Bill", email: "bill@company.com" },
    { userid: "555", name: "Donna", email: "donna@home.org" },
  ];
  let customer = new Customer(databaseName);
  customer.initialLoad(customerData);
};

// THE MAIN APPLICATION
function main() {
  const DBNAME = "customer_db";

  loadDB(DBNAME);
}
main();
