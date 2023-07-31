// chart.js

// Function to load Google Chart API and draw the chart
function loadAndDrawChart(watchedTimes) {
    // Load Google Chart API
    google.charts.load('current', { 'packages': ['corechart'] });
  
    // Set a callback to draw the chart after the API is loaded
    google.charts.setOnLoadCallback(() => {
      drawChart(watchedTimes);
    });
  }
  
// Function to convert time to count of shorts watched per hour
function convertToShortsPerHour(watchedTimes) {
  const countsPerHour = new Array(24).fill(0);

  watchedTimes.forEach((time) => {
    const timeComponents = time.split(':');
    const hour = parseInt(timeComponents[0]); // Extract hour from the time data

    // Increment count for the corresponding hour
    countsPerHour[hour]++;
  });

  return countsPerHour;
}
  
// Function to draw the Google Chart as a bar chart with shorts per hour
function drawChart(watchedTimes) {
  const countsPerHour = convertToShortsPerHour(watchedTimes);

  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Hour');
  data.addColumn('number', 'Short Video Count');

  // Populate the data from countsPerHour array
  for (let hour = 0; hour < 24; hour++) {
    const count = countsPerHour[hour];
    if (count > 0) {
      data.addRow([`${hour}:00`, count]);
    }
  }
  
  const options = {
    title: 'Short Video Count Per Hour',
    legend: { position: 'none' },
    chartArea: { width: '80%', height: '70%' },
    colors: ['#4285F4'],
    backgroundColor: '#00000',
    vAxis: { title: '' }, // Set format to '0' to display only integers
    hAxis: { title: 'Shorts watched', format: '0' },
    bars: 'vertical',
    animation: {
      startup: true,
      duration: 500,
      easing: 'out',
    },
  };

  const chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}