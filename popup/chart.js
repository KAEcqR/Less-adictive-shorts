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
  
  // Function to convert time to count of shorts watched per minute
  function convertToShortsPerMinute(watchedTimes) {
    const countsPerMinute = new Array(60).fill(0);
  
    watchedTimes.forEach((time) => {
      const timeComponents = time.split(':');
      const minute = parseInt(timeComponents[1]); // Extract minutes from the time data
  
      // Increment count for the corresponding minute
      countsPerMinute[minute]++;
    });
  
    return countsPerMinute;
  }
  
  // Function to draw the Google Chart as a bar chart
  function drawChart(watchedTimes) {
    const countsPerMinute = convertToShortsPerMinute(watchedTimes);
  
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Minute');
    data.addColumn('number', 'Short Video Count');
  
    // Populate the data from countsPerMinute array
    for (let minute = 0; minute < 60; minute++) {
      const count = countsPerMinute[minute];
      if (count > 0) {
        data.addRow([`${minute}`, count]);
      }
    }
  
    const options = {
      title: 'Short Video Count Per Minute',
      legend: { position: 'none' }, // Hide legend for a cleaner look
      chartArea: { width: '80%', height: '70%' },
      colors: ['#4285F4'],
      vAxis: { title: 'Minute' },
      hAxis: { title: 'Shorts watched' },
      bars: 'vertical', // Show bars vertically for a bar chart
      animation: {
        startup: true,
        duration: 1000, // Animation duration in milliseconds
        easing: 'out', // Animation easing function
      },
    };
  
    const chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
  