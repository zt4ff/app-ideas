const previewer = document.getElementById("previewer") as HTMLDivElement;
const controllers = document.querySelectorAll("input");
const copyCSSButton = document.querySelector("#copy-btn") as HTMLButtonElement;

const convertToCamelCase = (str: string): string => {
  let strArr = str
    .split("-")
    .map((arr) => arr[0].toUpperCase() + arr.slice(1))
    .join("");
  return strArr[0].toLowerCase() + strArr.slice(1);
};

controllers.forEach((controller) => {
  controller.addEventListener("change", (e) => {
    const camelCaseStyle = convertToCamelCase(
      (e.target as HTMLInputElement).name
    );

    previewer.style[camelCaseStyle as "borderRadius"] =
      `${(e.target as HTMLInputElement).value}` + "%";
    console.log(convertToCamelCase((e.target as HTMLInputElement).name));
  });
});

// copy generate css to clipboard
copyCSSButton.addEventListener("click", async (e) => {
  let copy: string = "";
  controllers.forEach((controller) => {
    copy += `${controller.name}: ${controller.value}%;\n`;
  });

  await navigator.clipboard.writeText(copy);
  alert("copied");
});
