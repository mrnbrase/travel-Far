document.addEventListener("DOMContentLoaded", function() {
    function fetchData() {
        return fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error('Error fetching data:', error));
    }

    function filterRecommendations(keyword) {
        console.log('Keyword:', keyword); // Debugging: Log the keyword to check if it's correct
        fetchData().then(data => {
            let filteredRecommendations = [];
            if (keyword === 'beach') {
                console.log('Filtering beaches...'); // Debugging: Log when filtering beaches
                filteredRecommendations = data.beaches.slice(0, 2);
            } else if (keyword === 'temple') {
                console.log('Filtering temples...'); // Debugging: Log when filtering temples
                filteredRecommendations = data.temples.slice(0, 2);
            } else if (keyword === 'country') {
                console.log('Filtering countries...'); // Debugging: Log when filtering countries
                filteredRecommendations = data.countries.slice(0, 2);
            }
            console.log('Filtered recommendations:', filteredRecommendations); // Debugging: Log filtered recommendations
            displayRecommendations(filteredRecommendations);
        });
    }

    function displayRecommendations(recommendations) {
        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = ''; 

        recommendations.forEach(recommendation => {
            const div = document.createElement('div');
            div.classList.add('recommendation');

            const img = document.createElement('img');
            img.src = recommendation.imageUrl;
            img.alt = recommendation.name;

            const name = document.createElement('h2');
            name.textContent = recommendation.name;

            const description = document.createElement('p');
            description.textContent = recommendation.description;

            div.appendChild(img);
            div.appendChild(name);
            div.appendChild(description);
            resultsContainer.appendChild(div);
        });
    }

    // Add click event listener to the search button
    document.getElementById('searchButton').addEventListener('click', function() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        filterRecommendations(searchInput);
        document.querySelector('.recommendations-container').style.display = 'block';
    });

    // Add click event listener to the reset button
    document.getElementById('resetButton').addEventListener('click', function() {
        clearResults();
    });

    function clearResults() {
        const searchInput = document.getElementById('searchInput');
        searchInput.value = ''; // Clear the search input field
        document.querySelector('.recommendations-container').style.display = 'none'; // Hide the recommendations container
        console.log('Results cleared.');
    }
});
