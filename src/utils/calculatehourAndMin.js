export function calculateWorkingHours() {
  const now = new Date();
  const startHour = 8; // Start at 8 AM
  const endHour = 21; // End at 5 PM
  const lunchStart = 13; // Lunch starts at 1 PM
  const lunchEnd = 14; // Lunch ends at 2 PM

  const currentHour = now.getHours();
  const min = now.getMinutes();

  let workingHours = currentHour - startHour;

  if (currentHour >= lunchEnd) {
    // During lunch break, subtract one hour
    workingHours--;
  }
  let totalMins = workingHours * 60;
  if (currentHour >= lunchStart && currentHour <= lunchEnd) {
    totalMins = workingHours * 60 + min;
  }
  return {
    runningHour: workingHours + 1,
    currentHour: workingHours,
    totalMin: totalMins,
    perHourlyProduction: totalMins / 60,
  };
}
