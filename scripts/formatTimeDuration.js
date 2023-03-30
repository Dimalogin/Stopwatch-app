export function formatTimeDuration(time) {
  const [totalSec, ms] = divide(time, 1000);
  const [totalMin, s] = divide(totalSec, 60);
  const [totalHour, m] = divide(totalMin, 60);

  return `${String(totalHour).padStart(2, "0")}:${String(m).padStart(
    2,
    "0"
  )}:${String(s).padStart(2, "0")}:${String(ms).padStart(3, "0")}`;
}

function divide(a, b) {
  const rest = a % b;
  const result = (a - rest) / b;

  return [result, rest];
}
