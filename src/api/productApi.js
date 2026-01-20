// src/api/productApi.js


export async function fetchProductsFromApi() {

    // retrieve the data
    // GET
  const response = await fetch('https://fakestoreapi.com/products');


  // POST
//    const response = await fetch(url, {
//       method: 'POST', // *METHOD* is set to POST
//       headers: {
//         'Content-Type': 'application/json' // Indicates the body format
//       },
//       body: JSON.stringify(data) // Converts the JavaScript object to a JSON string
//     });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  // transform it into JSON
  const data = await response.json();


// Comparison with Axios

   // const response = await axios.get(url); -> Code on axios to GET and transform into JSON automatically
//    axios.post('/user', {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
// })

  // Normalize API → Local SQLite format
  // Transform the API from JSON into an Array of object
  // In TS we declare the Type of data retrieved using Interface

  // Return an Array of Object
  return data.map(item => ({
    id: item.id,
    name: item.title,
    price: item.price,
    updatedAt: Date.now(),
  }));
}
