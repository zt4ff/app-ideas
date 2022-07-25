"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Customer {
    constructor(dbName, logContainer) {
        this.removeAllRows = () => {
            return new Promise((resolve) => {
                const request = indexedDB.open(this.dbName, 1);
                request.onerror = (event) => {
                    var _a, _b;
                    const target = event.target;
                    this.logger(`removeAllRows - Database error: ${(_a = target.error) === null || _a === void 0 ? void 0 : _a.code} - ${(_b = target.error) === null || _b === void 0 ? void 0 : _b.message}`, "error");
                };
                request.onsuccess = () => {
                    console.log("OP MESA");
                };
                request.onsuccess = (event) => {
                    this.logger("Deleting all customer...", "normal");
                    const target = event.target;
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
                        var _a, _b;
                        this.logger(`removeAllRows - Txn error: ${(_a = target.error) === null || _a === void 0 ? void 0 : _a.code} - ${(_b = target.error) === null || _b === void 0 ? void 0 : _b.message}`, "error");
                    };
                    txn.oncomplete = () => {
                        this.logger("all rows removed", "success");
                        resolve;
                    };
                };
            });
        };
        this.initialLoad = (customerData) => {
            const request = indexedDB.open(this.dbName, 1);
            request.onerror = (event) => {
                var _a, _b;
                const target = event.target;
                this.logger(`initial load - Txn error: ${(_a = target.error) === null || _a === void 0 ? void 0 : _a.code} - ${(_b = target.error) === null || _b === void 0 ? void 0 : _b.message}`, "error");
            };
            request.onupgradeneeded = (event) => {
                this.logger("Populating customers ...", "normal");
                const target = event.target;
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
        this.queryDB = () => {
            return new Promise((resolve) => {
                const request = indexedDB.open(this.dbName, 1);
                request.onerror = (event) => {
                    var _a, _b;
                    const target = event.target;
                    this.logger(`initial load - Txn error: ${(_a = target.error) === null || _a === void 0 ? void 0 : _a.code} - ${(_b = target.error) === null || _b === void 0 ? void 0 : _b.message}`, "error");
                };
                request.onsuccess = (event) => {
                    this.logger("querying database...", "normal");
                    const target = event.target;
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
        this.dbName = dbName;
        this.logContainer = logContainer;
        if (!window.indexedDB) {
            this.logger("your browser does not support indexedDB", "error");
            alert("Your browser doesn't support a stable version of IndexedDB.\nSuch and such feature will not be available.");
        }
    }
    logger(message, type) {
        const notification = document.createElement("p");
        notification.textContent = `* - ${message}`;
        const color = type == "error" ? "#f00" : type == "success" ? "#0f0" : "#000";
        notification.style.color = color;
        this.logContainer.appendChild(notification);
    }
}
const clearDB = (databaseName, logContainer) => __awaiter(void 0, void 0, void 0, function* () {
    let customer = new Customer(databaseName, logContainer);
    yield customer.removeAllRows();
});
const loadDB = (databaseName, logContainer) => {
    const customerData = [
        { userid: "444", name: "Bill", email: "bill@company.com" },
        { userid: "555", name: "Donna", email: "donna@home.org" },
    ];
    let customer = new Customer(databaseName, logContainer);
    customer.initialLoad(customerData);
};
const queryDB = (databaseName, logContainer) => __awaiter(void 0, void 0, void 0, function* () {
    let customer = new Customer(databaseName, logContainer);
    return yield customer.queryDB();
});
const displayResult = (data, resultPanel) => {
    if (data === null || data.length === 0) {
        return (resultPanel.textContent = "___NO RESULT___");
    }
    resultPanel.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
};
function main() {
    const loadDbButton = document.querySelector("#load");
    const queryDbButton = document.querySelector("#query");
    const clearDbButton = document.querySelector("#clear");
    const logPanel = document.querySelector(".logs");
    const resultPanel = document.querySelector(".main");
    const DBNAME = "customer_db";
    loadDbButton.addEventListener("click", () => {
        loadDB(DBNAME, logPanel);
    });
    queryDbButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        const result = yield queryDB(DBNAME, logPanel);
        displayResult(result, resultPanel);
    }));
    clearDbButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        yield clearDB(DBNAME, logPanel);
        displayResult(null, resultPanel);
    }));
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield main();
}))();
