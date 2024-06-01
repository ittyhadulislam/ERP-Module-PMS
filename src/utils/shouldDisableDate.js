export const shouldDisableDate = (date, prev, future) => {
  const today = new Date();
  // Calculate the date prevDate days ago
  const prevDate = new Date();
  prevDate.setDate(today.getDate() - (prev + 1));

  // Calculate the date futureDate days from now
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + future);

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - prevDate);

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + futureDate);
  const dateFormate = new Date(date);
  return !(dateFormate >= prevDate && dateFormate <= futureDate);
};
