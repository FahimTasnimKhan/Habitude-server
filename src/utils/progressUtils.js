// utils/progressUtils.js
export const calculateStreak = (progresses) => {
  if (!Array.isArray(progresses) || progresses.length === 0) return 0;

  // Extract and sort unique dates ascending
  const uniqueDates = [
    ...new Set(progresses.map((p) => new Date(p.date).setHours(0, 0, 0, 0))),
  ].sort((a, b) => a - b);

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = new Date(uniqueDates[i - 1]);
    const currDate = new Date(uniqueDates[i]);

    // Check if current date is exactly 1 day after previous
    const diffInDays = (currDate - prevDate) / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      currentStreak++;
    } else {
      currentStreak = 1;
    }

    maxStreak = Math.max(maxStreak, currentStreak);
  }

  return maxStreak;
};

export const getDaysCompletedThisMonth = (progresses) => {
  if (!Array.isArray(progresses) || progresses.length === 0) return 0;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const uniqueDays = new Set();

  progresses.forEach((p) => {
    const d = new Date(p.date);
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      // Use date string to ensure uniqueness per day
      uniqueDays.add(d.toDateString());
    }
  });

  return uniqueDays.size;
};
