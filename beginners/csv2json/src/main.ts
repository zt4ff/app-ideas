async function copyToClickBoard(str: string) {
  await navigator.clipboard.writeText(str);

  alert("Copied");
}

function convertCSVToJSON(csv: string) {
  const lines = csv.split("\n");

  const result = [];

  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    const obj: { [key: string]: string } = {};
    const currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  return JSON.stringify(result, null, 2);
}

function main() {
  // variables
  const csvTextArea = <HTMLTextAreaElement>document.getElementById("csv");
  const jsonTextArea = <HTMLTextAreaElement>document.getElementById("json");

  const convertToJsonBtn = <HTMLButtonElement>(
    document.getElementById("convert2json")
  );
  const copyJSON = <HTMLButtonElement>document.getElementById("copyjson");

  // conversion
  convertToJsonBtn.addEventListener("click", (e) => {
    if (csvTextArea.value === "")
      return alert("CSV textarea should not be empty");

    jsonTextArea.value = convertCSVToJSON(csvTextArea.value);
  });

  // copying the json file
  copyJSON.addEventListener("click", async (e) => {
    if (jsonTextArea.value === "") return alert("cannot copy empty JSON");

    await copyToClickBoard(jsonTextArea.value);
  });
}

main();
