fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the fetched data to the console
    // Further logic to process the fetched data goes here
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
