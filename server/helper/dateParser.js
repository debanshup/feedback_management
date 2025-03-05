// Function to parse the selected interval into an actual date range and return it as a filter object
export default function getDateRangeForQuery(intervalType) {
    const currentDate = new Date();
  
    switch (intervalType) {
      case "7days":
        // Last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        return { $gte: sevenDaysAgo, $lte: currentDate } ;
  
      case "4weeks":
        // Last 4 weeks (28 days)
        const fourWeeksAgo = new Date();
        fourWeeksAgo.setDate(currentDate.getDate() - 28); // 4 weeks = 28 days
        return { $gte: fourWeeksAgo, $lte: currentDate } ;
  
      case "12months":
        // Last 12 months
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);
        return  { $gte: twelveMonthsAgo, $lte: currentDate } ;
  
      case "60months":
        // Last 60 months
        const sixtyMonthsAgo = new Date();
        sixtyMonthsAgo.setMonth(currentDate.getMonth() - 60);
        return { $gte: sixtyMonthsAgo, $lte: currentDate } ;
  
      default:
        return {}; // No filter if no valid option is provided
    }
  }
  
  // Example usage in Mongoose query
//   const filter = getDateRangeForQuery("4weeks");
//   const feedbacks = await Feedback.find(filter);
  