![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# LAB | TypeScript Weather App


<details>
  <summary>
    <h2>Learning Goals</h2>
  </summary>

  This exercise allows you to practice and apply the concepts and techniques taught in class. 

  Upon completion of this exercise, you will be able to:
  - Send HTTP requests to an external API using Axios and TypeScript
  - Create type aliases to describe responses from an API
  - Use type annotations for Promises
  - Use type assertions to interact with DOM elements
  <br>

</details>

<br>


## Introduction

<!-- @todo: add gif showing how the app will look like -->


In this lab, you will create a weather app that allows the user to type the name of a location and get the current weather for that specific location. 

For this application, we will use some APIs from [Open-Meteo](https://open-meteo.com/) and the axios library for HTTP requests.


In particular, we will interact with these two APIs from Open-Meteo:


**Geocoding API**: 
- This API will allow us to search for a specific location by name.
- For example, if we send a GET request to the URL [https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=3](https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=3), we would get a list of 3 locations that match the name "Berlin".
- It will return a list of locations matching that name and some information for each location (country, latitude, longitude, etc.)
- More info [here](https://open-meteo.com/en/docs/geocoding-api).


**Weather Forecast API**: 
- This API will allow us to get the current weather at a specific location, defined by the coordinates of that location (latitude and longitude)
- For example, if we want to get the current weather in Berlin, Germany (latitude 52.52437; longitude 13.41053), we would send a GET request to this URL: [https://api.open-meteo.com/v1/forecast?latitude=52.52437&longitude=13.41053&current_weather=true&models=icon_global](https://api.open-meteo.com/v1/forecast?latitude=52.52437&longitude=13.41053&current_weather=true&models=icon_global)
- It will return info about the current weather for that specific location (temperature, wind speed, wind direction, etc.)
- More info [here](https://open-meteo.com/en/docs).

<br>



## Initial setup


@todo (fork, clone, npm install, npm run dev, open in browser)



<!-- @todo (see lab-ts-i) -->


<!-- 

- fork, clone, open code

- npm install

- run with: npm run dev
- http://localhost:5173/


- explain vite (config provided + tsconfig.json)

- explain project structure
    - types.ts
    - utils.ts
    - main.ts

-->


<br>



## Submission

- Upon completion, run the following commands:

  ```shell
  git add .
  git commit -m "Completed lab"
  git push origin main
  ```

- Create a Pull Request and submit your assignment.

<br>



## Iteration 0 | Understanding the initial code

@todo

- Explain the initial code  (vite, html, css, types.ts, utils.ts)
- Explain that axios is already installed and has built-in types
- Explain how we organize our TS code (types.ts, utils.ts, main.ts)
- Can explain that the functionality currently doesn't work (ie. when the user submits, nothing happens)

<!-- @todo -->


<!-- 
utils.js

> Utility functions are generally small, reusable functions that perform a specific, well-defined task and are designed to be used across different parts of an application. 
 -->



<br>


## Iteration 1 | Functionality to get the weather in a specific location

### 1.1 - Create the type alias `WeatherResponse`

In `src/types.ts`, create a new type alias with the name `WeatherResponse`. This type alias should describe the structure that we get from the API when we send a request to get the weather for a specific location.

To get an example of a response, you can send a GET request to this URL: [https://api.open-meteo.com/v1/forecast?latitude=52.52437&longitude=13.41053&current_weather=true&models=icon_global](https://api.open-meteo.com/v1/forecast?latitude=52.52437&longitude=13.41053&current_weather=true&models=icon_global). Then, create a type alias that follows that pattern and export it, so that it can be used from other files.



<details>
  <summary><b>Tip 1</b></summary>
  <br>

  To see the response in a human-friendly format, you can use Postman:

  ![image](https://github.com/user-attachments/assets/966886a3-b497-4ad7-8879-300b1a2897bd)

  Once you can see the response in human-friendly format, it will be much easier to create the type alias.

</details>


<details>
  <summary><b>Tip 2</b></summary>
  <br>

  Another option, when you have to create a type alias for complex data is to use ChatGPT or a similar AI tool to generate the type alias for you:

  ![image](https://github.com/user-attachments/assets/b62ed3b7-74eb-4aff-9fd5-78a51e2fc52f)

  Note: there's some cases in which ChatGPT will not be able to give you the right answer. For example, if there's optional properties and they're not included in the example provided, or when some properties can have different types (i.e., union types).

</details>


<details>
  <summary><b>Solution</b></summary>
  <br>

  ```ts
  // src/types.ts

  // ...

  export type WeatherResponse = {
      latitude: number;
      longitude: number;
      generationtime_ms: number;
      utc_offset_seconds: number;
      timezone: string;
      timezone_abbreviation: string;
      elevation: number;
      current_weather_units: {
          time: string;
          interval: string;
          temperature: string;
          windspeed: string;
          winddirection: string;
          is_day: string;
          weathercode: string;
      };
      current_weather: {
          time: string;
          interval: number;
          temperature: number;
          windspeed: number;
          winddirection: number;
          is_day: number;
          weathercode: number;
      };
  };
  ```

  Note: don't forget to export it, so that you can use this type definition from other files.

</details>

<br>



### 1.2 - Create the signature for the function `getCurrentWeather()`

In this step, you will create the signature for the function `getCurrentWeather()`. This function will send a request to the Weather Forecast API and return the response from the API.

For now, define only the **signature of our function** (ie. we will declare the function, specifying which parameters it takes and what it returns but we will not implement the logic of the function).

Open the file `src/utils.ts` and declare a function with this signature:

- Name of the function: `getCurrentWeather()`
- Parameters:
    - `locationDetails` (an object of type `Location`)
- Return value: 
  - Our function should return a `Promise` that resolves to the type `WeatherResponse`
  - Example: `Promise<WeatherResponse>`
- Note: for now, don't worry about the code inside the function for now (we will do that in the next step)


<details>
  <summary><b>Solution</b></summary>
  <br>

  ```ts
  // src/utils.ts

  import { LocationResponse, Location, WeatherResponse } from "./types";

  // ...


  export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {
    // ...
  }

  ```

</details>

<br>


### 1.3 - Implement the function `getCurrentWeather()`

Next, you will implement the logic of the function `getCurrentWeather()`. Your function needs to do the following:

1. Send the API Request: 
  - Use axios to send a GET request to this URL: `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global` (where `locationDetails.latitude` and `locationDetails.longitude` are the coordinates that we get from the argument `locationDetails`).

2. Handle the Response: 
  - Return a promise that resolves with the data from the API response.
  - Note: you can use the .then() method to extract the data property from the response object.


<details>
  <summary><b>Solution</b></summary>

  ```ts
  // src/utils.ts

  import { LocationResponse, Location, WeatherResponse } from "./types";

  // ...

  export function getCurrentWeather(locationDetails: Location): Promise<WeatherResponse> {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${locationDetails.latitude}&longitude=${locationDetails.longitude}&current_weather=true&models=icon_global`;
      return axios.get(url).then((response) => response.data);
  }
  ```
</details>

<br>



## Iteration 2 | Functionality to display the location in the UI

### 2.1 - Create the signature for the function `displayLocation()` 

In this step, we will define a function that will receive the details of a location and display them in the user interface.

In `src/utils.ts`, create a function with this signature:

- Name of the function: `displayLocation()`
- Parameters:
    - `locationDetails` (an object of type `Location`)
- Return value: 
  - For this function, we're not interested in the return value.

<details>
  <summary><b>Solution</b></summary>

  ```ts
  export function displayLocation(locationDetails: Location) {
      // ...
  }
  ```

  Note: you can also explicitly state that we're not interested in the return value using `void`:

  ```ts
  export function displayLocation(locationDetails: Location): void {
      // ...
  }
  ```

</details>


<br>


### 2.2 - Implement the function `displayLocation()` 

Next, implement the logic for the function `displayLocation()`. This function should do some DOM manipulation to display in the user interface the details of a location that we receive as an argument. In particular, it should do the following:

1. In the HTML element with the id `location-name`, you should display the name of the location.
2. In the HTML element with the id `country`, you should display the country.

<details>
  <summary><b>Hint</b></summary>

  You can get a reference to an HTML elements using the method `getElementById()` and a type assertion. Once you have a reference, you can modify the content using `innerText`.
  
  Example:

  ```ts
  const myCoolHtmlElm = document.getElementById('my-cool-id') as HTMLElement;
  myCoolHtmlElm.innerText = "Hello World";
  ```

</details>



<details>
  <summary><b>Solution</b></summary>

  ```ts
  export function displayLocation(locationDetails: Location) {
      // display location name
      const locationNameElm = document.getElementById('location-name') as HTMLElement;
      locationNameElm.innerText = "" + locationDetails.name;

      // display country
      const countryElm = document.getElementById('country') as HTMLElement;
      countryElm.innerText = "(" + locationDetails.country + ")";
  }
  ```

</details>

<br>


## Iteration 3 | Functionality to display the weather info in the UI

### 3.1 - Create the signature for the function `displayWeatherData()` 

In this step, we will define a function that will receive the data about about the weather and display that info in the user interface.

In `src/utils.ts`, create a function with this signature:

- Name of the function: `displayWeatherData()`
- Parameters:
    - `obj` (an object of type `WeatherResponse`)
- Return value: 
  - For this function, we're not interested in the return value.


<details>
  <summary><b>Solution</b></summary>

  ```ts
  export function displayWeatherData(obj: WeatherResponse) {
    // ...
  }
  ```

  Note: you can also explicitly state that we're not interested in the return value using `void`:

  ```ts
  export function displayWeatherData(obj: WeatherResponse): void {
    // ...
  }
  ```

</details>


<br>


### 3.2 - Implement the function `displayWeatherData()` 

Next, implement the logic for the function `displayWeatherData()`. This function should do some DOM manipulation to display in the user interface the info about the weather. In particular, it should do the following:

1. In the HTML element with the id `temperature`, you should display the temperature, including the units (e.g. `20.6 °C`).
2. In the HTML element with the id `windspeed`, you should display the wind speed (e.g. `3.4 km/h`).
3. In the HTML element with the id `winddirection`, you should display the wind direction (e.g. `32 °`).


<details>
  <summary><b>Solution</b></summary>

  ```ts
  export function displayWeatherData(obj: WeatherResponse) {
      // display temperature  
      const temperatureElm = document.getElementById('temperature') as HTMLElement;
      const temperature = obj.current_weather.temperature;
      const temperatureUnits = obj.current_weather_units.temperature;
      temperatureElm.innerText = `Temperature: ${temperature} ${temperatureUnits}`;
      
      // display wind speed
      const windspeedElm = document.getElementById('windspeed') as HTMLElement;
      const windspeed = obj.current_weather.windspeed;
      const windspeedUnits = obj.current_weather_units.windspeed;
      windspeedElm.innerText = `Wind Speed: ${windspeed} ${windspeedUnits}`;

      // display wind direction
      const winddirectionElm = document.getElementById('winddirection') as HTMLElement;
      const winddirection = obj.current_weather.winddirection;
      const winddirectionUnits = obj.current_weather_units.winddirection;
      winddirectionElm.innerText = `Wind Direction: ${winddirection} ${winddirectionUnits}`;
  }
  ```

</details>

<br>



## Iteration 4 | Display weather from users' input

Now that we have all our type definitions and utility functions ready, we will implement the functionality so that, when the user types the name of a location, we can display the weather for that location.

<br>

### 4.1 - Implement Event Listener for Form Submission

In this step, we will add an event listener to detect when the user submits the form.


In `src/main.ts`, create the code to do the following:

1. Add an event listener to detect if the user submits the form (note: the form has the id `weather-form`).
2. Inside the code for that event listener, invoke the method [`event.preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault), so that the page does not reload when the user submits the form.
3. Also inside the event listener, do a `console.log()` with the message "The user has submitted the form".

Once you have completed these steps, when the user submits the form, you should see a message "The user has submitted the form" in the console.


<details>
  <summary><b>Solution</b></summary>

  ```ts
  // src/main.ts

  const form = document.getElementById("weather-form") as HTMLFormElement;

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("The user has submitted the form");
  });
  ```
</details>

<br>

### 4.2 - Get the name of the location provided by the user 

Next, modify the event listener you created in the previous step so that, when the user submits, you display in the console the name of the location that they have entered (example: "The user has submitted the form and is searching for a location with this name... [Berlin]").


<details>
  <summary><b>Solution</b></summary>

  ```ts
  // src/main.ts

  const form = document.getElementById("weather-form") as HTMLFormElement;

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const locationInput = document.getElementById("location") as HTMLInputElement;
    const locationName = locationInput.value;
    
    console.log(`The user has submitted the form and is searching for a location with this name... ${locationName} `);

    locationInput.value = ""; // Clear the form
  });

  ```
</details>


<br>

### 4.3 - Display weather when the user submits the form

Now, you will need to put all the pieces together! Modify the code in `src/main.ts` so that, when the user submits the form, we display info about the location and the current weather.

<details>
  <summary><b>Hints</b></summary>

  You will need to do the following:
  - When the user submits, invoke the function `getLocation()` to get the details of the desired location from the API. This function returns a promise, so you can handle the response with `.then().catch()`. 
  - Once you have the response from the API (i.e., inside the `.then()`), use the first result (the API returns an array, so you can get the element with index zero) and invoke the functions `displayLocation()` (to display those details in the UI) and `getCurrentWeather()` (to get the current weather for that location).
  - Once you have the info about the current weather, invoke the function `displayWeatherData()`

  These steps are more complex and we're putting many pieces together. Remember that you can add a `console.log()` to see what data you have (for example, you can add a `console.log()` to see what data you get from the API) :wink:

</details>



<details>
  <summary><b>Solution</b></summary>

  ```ts
  // src/main.ts

  import { getLocation, getCurrentWeather, displayLocation, displayWeatherData } from './utils';

  const form = document.getElementById("weather-form") as HTMLFormElement;

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const locationInput = document.getElementById("location") as HTMLInputElement;
    const locationName = locationInput.value;
    locationInput.value = ""; // Clear the form

    getLocation(locationName)
      .then((response) => {
        if(response.results){

          // Get the first result (the api may provide multiple results if there's multiple locations with the same or similar names, we will just use the first one for simplicity)
          const location = response.results[0];

          // Display info about the location
          displayLocation(location);

          // Get info about the weather for that location
          return getCurrentWeather(location);
        } else {
          // If there's no results, throw an error
          throw new Error('Location not found');
        }
      })
      .then((weatherData) => {

        // Display info about the weather
        displayWeatherData(weatherData);
        
      })
      .catch((error) => {
        console.log("Error getting weather data");
        console.log(error);
      });

  });

  ```

</details>

<br>
<hr>
<br>


## Bonus: Iteration 5 | Update background

@todo


<!--

Change the background image for the whole page, based on weathercode:
- 0, 1: sunny  (day/night)
- 2: partly cloudy  (day/night)
- 3: cloudy
- 45, 48: Foggy
- 5x: drizzle
- 6x: rain
- 7x: snow
- 8x: showers
- 9x: thunderstorm

- src/utils.ts
- src/main.ts 

-->


<br><br>


Happy coding! :heart:

<br>


## Acknowledgments

This project uses weather data from Open-Meteo, licensed under the Creative Commons Attribution 4.0 International License ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)).

<!-- @todo: Images: pixabay -->

<br>



## FAQs


<details>
  <summary>I am stuck and don't know how to solve the problem or where to start. What should I do?</summary>


  <br>

  If you are stuck in your code and don't know how to solve the problem or where to start, you should take a step back and try to form a clear question about the specific issue you are facing. This will help you narrow down the problem and come up with potential solutions.

  For example, is it a concept that you don't understand, or are you receiving an error message that you don't know how to fix? It is usually helpful to try to state the problem as clearly as possible, including any error messages you are receiving. This can help you communicate the issue to others and potentially get help from classmates or online resources. 

  Once you have a clear understanding of the problem, you will be able to start working toward the solution.

  <br>

  [Back to top](#faqs)

</details>


<details>
  <summary>Do I need to add type annotations to everything?</summary>


  <br>

  No. In many cases, TypeScript can infer the types from the context and using implicit types can make your code more clear and readable.


  For example:

  ```ts    
  function calcTotal(numberOfProducts: number, price: number): number {

      const total = numberOfProducts * price; // implicit (TypeScript can infer that "total" will be a number)

      return total;
  }
  ```


  <br>

  [Back to top](#faqs)

</details>


<details>
  <summary>I am unable to push changes to the repository. What should I do?</summary>


  <br>

  There are a couple of possible reasons why you may be unable to *push* changes to a Git repository:

1. **You have not committed your changes:** Before you can push your changes to the repository, you need to commit them using the `git commit` command. Make sure you have committed your changes and try pushing again. To do this, run the following terminal commands from the project folder:

   ```shell
   git add .
   git commit -m "Your commit message"
   git push
   ```

   <br>

   

  2. **You do not have permission to push to the repository:** If you have cloned the repository directly from the main Ironhack repository without making a *Fork* first, you do not have write access to the repository.
     To check which remote repository you have cloned, run the following terminal command from the project folder:
     
     ```shell
     git remote -v
     ```
     
     

  If the link shown is the same as the main Ironhack repository, you will need to fork the repository to your GitHub account first, and then clone your fork to your local machine to be able to push the changes.

  **Note:** You may want to make a copy of the code you have locally, to avoid losing it in the process.

  <br>

  [Back to top](#faqs)

</details>


<!-- 

@todo:


Other FAQs:
- problems running the app / vite running on a different port

-->



