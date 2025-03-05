function summarizeFeedback(feedbackArray) {
  if (!Array.isArray(feedbackArray) || feedbackArray.length === 0) {
    return []; 
  }

  // Group by date
  const groupedByDate = feedbackArray.reduce((result, item) => {
    // Validate and parse date
    const date = item.date
      ? new Date(item.date).toISOString().split("T")[0]
      : "Unknown Date";
    if (!result[date]) {
      result[date] = {};
    }

    // Validate service category
    const category = item.serviceCategory || "Unknown Service";
    if (!result[date][category]) {
      result[date][category] = {
        totalFeedback: 0,
        goodExperience: 0,
        averageExperience: 0,
        poorExperience: 0,
      };
    }

    // Increment counts with proper validation
    result[date][category].totalFeedback += 1;
    if (item.experience === "good") result[date][category].goodExperience += 1;
    else if (item.experience === "average")
      result[date][category].averageExperience += 1;
    else if (item.experience === "poor")
      result[date][category].poorExperience += 1;

    return result;
  }, {});

  // Convert the grouped object to the desired JSON format
  const resultArray = Object.entries(groupedByDate).map(
    ([date, categories]) => ({
      date: date,
      feedback: Object.entries(categories).map(([category, counts]) => ({
        serviceCategory: category,
        ...counts,
      })),
    })
  );

  return resultArray;
}

export default summarizeFeedback;
