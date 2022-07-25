interface CustomerData {
  userid: string;
  name: string;
  email: string;
}

class Customer {
  dbName: string;
  private logContainer: HTMLElement;

  constructor(dbName: string, logContainer: HTMLElement) {
    this.dbName = dbName;
    this.logContainer = logContainer;

    if (!window.indexedDB) {
      this.logger("your browser does not support indexedDB", "error");
      alert(
        "Your browser doesn't support a stable version of IndexedDB.\nSuch and such feature will not be available."
      );
    }
  }

  logger(message: string, type: "error" | "success" | "normal") {
    const notification = document.createElement("p");
    notification.textContent = `* - ${message}`;
    const color =
      type == "error" ? "#f00" : type == "success" ? "#0f0" : "#000";
    notification.style.color = color;

    this.logContainer.appendChild(notification);
  }

  removeAllRows = () => {
    return new Promise((resolve) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = (event) => {
        const target = event.target as IDBOpenDBRequest;

        this.logger(
          `removeAllRows - Database error: ${target.error?.code} - ${target.error?.message}`,
          "error"
        );
      };

      request.onsuccess = () => {
        console.log("OP MESA");
      };
      request.onsuccess = (event) => {
        this.logger("Deleting all customer...", "normal");

        const target = event.target as IDBOpenDBRequest;
        const db = target.result;

        const txn = db.transaction("customer", "readwrite");

        const objectStore = txn.objectStore("customer");

        const getAllKeysRequest = objectStore.getAllKeys();
        getAllKeysRequest.onsuccess = (event) => {
          getAllKeysRequest.result.forEach((key) => {
            objectStore.delete(key);
          });
        };

        txn.onerror = () => {
          this.logger(
            `removeAllRows - Txn error: ${target.error?.code} - ${target.error?.message}`,
            "error"
          );
        };

        txn.oncomplete = () => {
          this.logger("all rows removed", "success");
          resolve;
        };
      };
    });
  };

  initialLoad = (customerData: CustomerData[]) => {
    const request = indexedDB.open(this.dbName, 1);

    request.onerror = (event) => {
      const target = event.target as IDBOpenDBRequest;

      this.logger(
        `initial load - Txn error: ${target.error?.code} - ${target.error?.message}`,
        "error"
      );
    };

    request.onupgradeneeded = (event) => {
      this.logger("Populating customers ...", "normal");
      const target = event.target as IDBOpenDBRequest;
      const db = target.result;

      const objectStore = db.createObjectStore("customer", {
        keyPath: "userid",
      });

      objectStore.createIndex("name", "name", { unique: false });
      objectStore.createIndex("email", "email", { unique: false });

      customerData.forEach((customer) => {
        objectStore.put(customer);
      });

      target.onsuccess = () => {
        this.logger("data loaded successfully", "success");
        db.close();
      };
    };
  };

  queryDB = () => {
    return new Promise((resolve) => {
      const request = indexedDB.open(this.dbName, 1);

      request.onerror = (event) => {
        const target = event.target as IDBOpenDBRequest;

        this.logger(
          `initial load - Txn error: ${target.error?.code} - ${target.error?.message}`,
          "error"
        );
      };

      request.onsuccess = (event) => {
        this.logger("querying database...", "normal");
        const target = event.target as IDBOpenDBRequest;
        const db = target.result;

        const txn = db.transaction("customer", "readonly");
        let customers = txn.objectStore("customer");
        let request = customers.getAll();

        request.onerror = () => this.logger("error querying database", "error");

        request.onsuccess = () => {
          this.logger("database queried successfully", "success");
          resolve(request.result);
        };
      };
    });
  };
}

const clearDB = async (databaseName: string, logContainer: HTMLElement) => {
  let customer = new Customer(databaseName, logContainer);
  await customer.removeAllRows();
};

const loadDB = (databaseName: string, logContainer: HTMLElement) => {
  const customerData: CustomerData[] = [
    { userid: "444", name: "Bill", email: "bill@company.com" },
    { userid: "555", name: "Donna", email: "donna@home.org" },
  ];
  let customer = new Customer(databaseName, logContainer);
  customer.initialLoad(customerData);
};

const queryDB = async (databaseName: string, logContainer: HTMLElement) => {
  let customer = new Customer(databaseName, logContainer);

  return await customer.queryDB();
};

const displayResult = (data: Array<any> | null, resultPanel: HTMLElement) => {
  if (data === null || data.length === 0) {
    return (resultPanel.textContent = "___NO RESULT___");
  }

  resultPanel.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
};

function main() {
  const loadDbButton = document.querySelector("#load") as HTMLButtonElement;
  const queryDbButton = document.querySelector("#query") as HTMLButtonElement;
  const clearDbButton = document.querySelector("#clear") as HTMLButtonElement;
  const logPanel = document.querySelector(".logs") as HTMLDivElement;
  const resultPanel = document.querySelector(".main") as HTMLDivElement;

  const DBNAME = "customer_db";

  loadDbButton.addEventListener("click", () => {
    loadDB(DBNAME, logPanel);
  });

  queryDbButton.addEventListener("click", async () => {
    const result = await queryDB(DBNAME, logPanel);
    displayResult(result as any[], resultPanel);
  });

  clearDbButton.addEventListener("click", async () => {
    await clearDB(DBNAME, logPanel);
    displayResult(null, resultPanel);
  });
}

(async () => {
  await main();
})();
