document.addEventListener("DOMContentLoaded", function() {
    function fetchData() {
        return fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error('Error fetching data:', error));
    }

    function filterRecommendations(keyword) {
        console.log('Keyword:', keyword);
        fetchData().then(data => {
            let filteredRecommendations = [];
            if (keyword === 'beach') {
                console.log('Filtering beaches...');
                filteredRecommendations = data.beaches.slice(0, 2);
            } else if (keyword === 'temple') {
                console.log('Filtering temples...'); 
                filteredRecommendations = data.temples.slice(0, 2);
            } else if (keyword === 'country') {
                console.log('Filtering countries...');
                filteredRecommendations = data.countries.slice(0, 2);
            }
            console.log('Filtered recommendations:', filteredRecommendations);
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

            const time = document.createElement('p');
            const options = { timeZone: recommendation.timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
            time.textContent = "Current time: " + new Date().toLocaleTimeString('en-US', options);

            div.appendChild(img);
            div.appendChild(name);
            div.appendChild(description);
            div.appendChild(time);
            resultsContainer.appendChild(div);
        });
    }

   
    document.getElementById('searchButton').addEventListener('click', function() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        filterRecommendations(searchInput);
        document.querySelector('.recommendations-container').style.display = 'block';
    });

   
    document.getElementById('resetButton').addEventListener('click', function() {
        clearResults();
    });

    function clearResults() {
        const searchInput = document.getElementById('searchInput');
        searchInput.value = '';
        document.querySelector('.recommendations-container').style.display = 'none'; 
        console.log('Results cleared.');
    }
});
