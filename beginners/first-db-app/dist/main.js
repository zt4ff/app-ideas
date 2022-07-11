"use strict";
class Customer {
    constructor(dbName) {
        // remove all rows from the database
        this.removeAllRows = () => {
            const request = indexedDB.open(this.dbName, 1);
            request.onerror = (event) => {
                var _a, _b;
                const target = event.target;
                console.log(`removeAllRows - Database error: ${(_a = target.error) === null || _a === void 0 ? void 0 : _a.code} - ${(_b = target.error) === null || _b === void 0 ? void 0 : _b.message}`);
            };
            request.onsuccess = (event) => {
                console.log("Deleting all customer...");
                const target = event.target;
                const db = target.result;
                const txn = db.transaction("customer", "readwrite");
                txn.onerror = (event) => {
                    var _a, _b;
                    console.log(`removeAllRows - Txn error: ${(_a = target.error) === null || _a === void 0 ? void 0 : _a.code} - ${(_b = target.error) === null || _b === void 0 ? void 0 : _b.message}`);
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
        this.initialLoad = (customerData) => {
            const request = indexedDB.open(this.dbName, 1);
            request.onerror = (event) => {
                var _a, _b;
                const target = event.target;
                console.log(`initial load - Txn error: ${(_a = target.error) === null || _a === void 0 ? void 0 : _a.code} - ${(_b = target.error) === null || _b === void 0 ? void 0 : _b.message}`);
            };
            request.onupgradeneeded = (event) => {
                console.log("Populating customers ...");
                const target = event.target;
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
        this.dbName = dbName;
        // if browser does not support indexdb
        if (!window.indexedDB) {
            alert("Your browser doesn't support a stable version of IndexedDB.\nSuch and such feature will not be available.");
        }
    }
}
// clear all customer data from the database
const clearDB = (databaseName) => {
    let customer = new Customer(databaseName);
    customer.removeAllRows();
};
// Add customer to the database
const loadDB = (databaseName) => {
    console.log("Load the Customers database");
    // Customers to add to initially populate the database with
    const customerData = [
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
