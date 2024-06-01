export const prepareDate = (date) => {
  // if (isISO8601Date(date)) return;

  const year = date?.$y;
  const month = date?.$M + 1; // Note: Months are zero-based in JavaScript Dates
  const day = date?.$D;
  const hours = date?.$H;
  const minutes = date?.$m;
  const seconds = date?.$s;
  const milliseconds = date?.$ms;

  const isoString = `${year}-${String(month).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}T${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(
    milliseconds
  ).padStart(3, "0")}Z`;

  return isoString;
};
function isISO8601Date(str) {
  const iso8601Regex =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/;
  return iso8601Regex.test(str);
}
