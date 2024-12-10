const apiKey = '6dXAyWANNiGK55D1m4j2uA==u4vmMDlkhk939IEH';  
// Replace with your actual API key from website www.api-ninjas.com

// Function to show the loader
const showLoader = () => {
    document.getElementById('loader').style.display = 'block';
}

// Function to hide the loader
const hideLoader = () => {
    document.getElementById('loader').style.display = 'none';
}

const quotes = async () => {
    const category = document.getElementById("search").value 
    // Getting value of search input

    if (!category) {
        alert('Please enter a category!');
        return;  // Exit if no category is entered
    }

    const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
    showLoader();
    try {
        // Make the fetch request and wait for the response
        const response = await fetch(apiUrl, {
            method: 'GET',  // GET method for fetching data
            headers: {
                'X-Api-Key': apiKey,  // Add the API key to the headers
                'Content-Type': 'application/json',  // Optional for GET requests
            }
        });

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const data = await response.json();

        // Log the parsed data
        if(data.length > 0) {
            document.getElementById("quote").innerText = data[0].quote
            document.getElementById("author").innerText = data[0].author
        } else {
            document.getElementById('quote').innerText = 'No quotes found for this category.';
            document.getElementById('author').innerText = '';
        };  

    } catch (err) {
        console.log('Error:', err);  // Log the error if something goes wrong
    } finally {
        hideLoader();  // Hide loader once fetch is complete
    }
}

// Event listener for the button to fetch the quote when clicked
document.getElementById("btn").addEventListener('click', quotes)

// When the button is clicked, the quotes function is called, which fetches data from the API based on the category entered in the search bar.

// Add Enter into event listener
document.getElementById('search').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        quotes();  // Call the same function when Enter is pressed
    }
});


