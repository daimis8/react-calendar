export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

export const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};
