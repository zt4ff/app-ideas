function convertToCent(num: string) {
  return (Number(num) * 100).toFixed();
}

function main() {
  const dollarInput = <HTMLInputElement>document.getElementById("dollar");
  const centInput = <HTMLInputElement>document.getElementById("cents");

  dollarInput.addEventListener("input", (e) => {
    centInput.value = convertToCent((e.target as HTMLInputElement).value);
  });
}

main();
