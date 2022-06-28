interface TimeState {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
}

// function to create the svg animation
function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  var start = polarToCartesian(x, y, radius, endAngle);
  var end = polarToCartesian(x, y, radius, startAngle);

  var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

// From StackOverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
function mapNumber(
  number: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
) {
  return (
    ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
}

// function to generate render the svg
function renderUpdatedTimeState(ts: TimeState, container: HTMLElement) {
  container.innerHTML = `
  <div class="countdown-wrapper">
  <svg>
  <path
  d="${describeArc(100, 100, 98, 0, mapNumber(ts.days, 30, 0, 0, 360))}"
  fill="none"
  stroke="#333"
  stroke-width="4"
  ></path>
  </svg>
  ${ts.days}
  <span>Days</span>
  </div>
  
  <div class="countdown-wrapper">
  <svg>
  <path
  d="${describeArc(100, 100, 98, 0, mapNumber(ts.hours, 24, 0, 0, 360))}"
  fill="none"
  stroke="#333"
  stroke-width="4"
  ></path>
  </svg>
  ${ts.hours}
  <span>Hours</span>
  </div>
  
  <div class="countdown-wrapper">
  <svg>
  <path
  d="${describeArc(100, 100, 98, 0, mapNumber(ts.minutes, 60, 0, 0, 360))}"
  fill="none"
  stroke="#333"
  stroke-width="4"
  ></path>
  </svg>
  ${ts.minutes}
  <span>Minutes</span>
  </div>
  
  <div class="countdown-wrapper">
  <svg>
  <path
  d="${describeArc(100, 100, 98, 0, mapNumber(ts.seconds, 60, 0, 0, 360))}"
  fill="none"
  stroke="#333"
  stroke-width="4"
  ></path>
  </svg>
  ${ts.seconds}
  <span>Seconds</span>
  </div>
  `;
}

function updateTimeState(
  date: number,
  startTimer: NodeJS.Timer,
  container: HTMLElement
) {
  const now = new Date().getTime();
  const distance = date - now;

  let newState: TimeState = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
  // return newState; - display the value
  renderUpdatedTimeState(newState, container);

  if (now >= date) {
    clearInterval(startTimer);
    alert("It's time");
  }
}

function calcTime(dates: string) {
  return new Date(dates).getTime();
}

function padLeadingZero(num: number) {
  let str = num + "";
  if (str.length == 1) {
    return "0" + str;
  }
  return str;
}

// the main function
function main() {
  // variables declaration
  const timeInput = <HTMLInputElement>document.getElementById("time-select");
  const eventNameInput = <HTMLInputElement>(
    document.getElementById("event-name-select")
  );
  const eventName = <HTMLHeadingElement>document.getElementById("event-name");
  const svgContainer = document.createElement("div");
  (<HTMLDivElement>document.getElementById("countdowns")).appendChild(
    svgContainer
  );
  svgContainer.classList.add("countdowns-container");

  let startTimer: NodeJS.Timer;

  // disable selecting the previous date to today
  let today = new Date();
  let minimumDate = `${today.getFullYear()}-${padLeadingZero(
    today.getMonth() + 1
  )}-${padLeadingZero(today.getDate() + 2)}`;
  timeInput?.setAttribute("min", minimumDate);

  timeInput.addEventListener("change", (e) => {
    startTimer = setInterval(() => {
      updateTimeState(
        calcTime((<HTMLInputElement>e.target).value),
        startTimer,
        svgContainer
      );
    }, 1000);
  });

  // the event name settings
  eventNameInput.addEventListener("input", (e) => {
    eventName.textContent = (<HTMLInputElement>e.target).value;
  });
}

// running the whole thing
main();
