export function aggregateFeedbacksByDay(feedbacks) {
  //   Predefine the last 7 days
  const currentDate = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(currentDate);
    day.setDate(day.getDate() - i); // Move back i days
    return day.toISOString().split("T")[0]; // Format as "YYYY-MM-DD"
  }).reverse(); // Ensure ascending order

  // Aggregate counts by date
  const countsByDate = feedbacks.reduce((acc, feedback) => {
    const date = new Date(feedback.createdAt).toISOString().split("T")[0]; // Extract date (YYYY-MM-DD)
    if (last7Days.includes(date)) {
      acc[date] = (acc[date] || 0) + 1; // Increment count for the date
    }
    return acc;
  }, {});

  //  Return the last 7 days with the counts, including 0s for missing days
  return last7Days.map((date) => ({
    time: date,
    count: countsByDate[date] || 0, // Include 0 if no feedback for the date
  }));
}

export function aggregateFeedbacksByWeek(feedbacks) {
  // Helper function to get the start of the week (Sunday)
  const getWeekStartDate = (date) => {
    const d = new Date(date);
    const day = d.getDay(); // 0 for Sunday
    d.setDate(d.getDate() - day); // Adjust to the previous Sunday
    d.setHours(0, 0, 0, 0); // Set time to midnight
    return d;
  };

  // Step 1: Predefine 4 weekly intervals
  const currentDate = new Date();
  const weeks = Array.from({ length: 4 }, (_, i) => {
    const startOfWeek = getWeekStartDate(new Date(currentDate));
    startOfWeek.setDate(startOfWeek.getDate() - i * 7); // Move back i weeks
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return {
      interval: `${startOfWeek.toISOString().split("T")[0]} - ${
        endOfWeek.toISOString().split("T")[0]
      }`,
      start: startOfWeek,
      end: endOfWeek,
      count: 0,
    };
  }).reverse(); // Ensure ascending order

  // Aggregate feedback into predefined intervals
  feedbacks.forEach((feedback) => {
    const feedbackDate = new Date(feedback.createdAt);

    weeks.forEach((week) => {
      if (feedbackDate >= week.start && feedbackDate <= week.end) {
        week.count += 1;
      }
    });
  });

  // Return transformed result
  return weeks.map(({ interval, count }) => ({
    time: interval,
    count,
  }));
}

export function aggregateFeedbacksByMonth(feedbacks) {
  // Ensure all intervals exist for the last 12 months
  const allIntervals = Array.from({ length: 12 }, (_, i) => {
    const now = new Date();
    const intervalStart = new Date(now.getFullYear(), now.getMonth() - i, 1); // Start of each month
    const intervalEnd = new Date(intervalStart);
    intervalEnd.setMonth(intervalEnd.getMonth() + 1); // End of the interval (next month)

    return {
      interval: `${intervalStart.toISOString().split("T")[0]} - ${
        intervalEnd.toISOString().split("T")[0]
      }`,
      start: intervalStart,
      end: intervalEnd,
      count: 0,
    };
  }).reduce((acc, { interval, start, end }) => {
    acc[interval] = { start, end, count: 0 };
    return acc;
  }, {});

  // Aggregate feedback into predefined intervals
  feedbacks.forEach((feedback) => {
    const feedbackDate = new Date(feedback.createdAt);
    for (const interval of Object.values(allIntervals)) {
      if (feedbackDate >= interval.start && feedbackDate < interval.end) {
        interval.count += 1;
        break;
      }
    }
  });

  // Transform into the desired format and sort intervals by date
  return Object.entries(allIntervals)
    .sort(
      ([a], [b]) => new Date(a.split(" - ")[0]) - new Date(b.split(" - ")[0])
    )
    .map(([time, { count }]) => ({
      time,
      count,
    }));
}

export function aggregateFeedbacksByYear(feedbacks) {
  // Helper function to get the start of a year
  const getYearStartDate = (date) => {
    const d = new Date(date);
    d.setMonth(0); // Set month to January
    d.setDate(1); // Set day to 1st
    d.setHours(0, 0, 0, 0); // Set time to midnight
    return d;
  };

  // Aggregate counts by year intervals
  const countsByInterval = Array.from({ length: 5 }, (_, i) => {
    const startYear = new Date().getFullYear() - i;
    const intervalStart = getYearStartDate(new Date(`${startYear}-01-01`));
    const intervalEnd = new Date(intervalStart);
    intervalEnd.setFullYear(intervalEnd.getFullYear() + 1);

    return {
      interval: `${intervalStart.toISOString().split("T")[0]} - ${
        intervalEnd.toISOString().split("T")[0]
      }`,
      start: intervalStart,
      end: intervalEnd,
      count: 0, // Initialize count to 0
    };
  }).reduce((acc, interval) => {
    acc[interval.interval] = {
      start: interval.start,
      end: interval.end,
      count: 0,
    };
    return acc;
  }, {});

  // Aggregate feedback into predefined intervals
  feedbacks.forEach((feedback) => {
    const feedbackDate = new Date(feedback.createdAt);

    for (const interval of Object.values(countsByInterval)) {
      if (feedbackDate >= interval.start && feedbackDate < interval.end) {
        interval.count += 1; // Increment the count
        break;
      }
    }
  });

  // Transform into the desired format and sort by date
  return Object.entries(countsByInterval)
    .sort(
      ([a], [b]) => new Date(a.split(" - ")[0]) - new Date(b.split(" - ")[0])
    ) // Sort by start date of interval
    .map(([time, { count }]) => ({
      time,
      count,
    }));
}
