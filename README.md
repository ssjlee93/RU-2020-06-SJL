# RU-2020-06-SJL

## JS homework 06 Server-Side APIs

* Instructions: clear localStorage before running the page. 
*             If a city name does not work, try lowercase names. 
* Unsolved problem: Between 12am to 3am, the page will display same day twice. I wish I could fix this, but I could not think of a way. 

![Screenshot of the project](/screenshot.PNG)

Objective: make a 100% replica of the demo + some tweaks on my own. 

## The page features: 
* A search history bar with a preset search query. 
* A main card with current w information
* 5 cards with upcoming w information
* clear history button that clears/resets localStorage 
* localStorage of list of cities searched and the last city searched 
* cute background image

## Coding challenges: 
* Traversing the DOM. I used .find() to find all the DOM elements as an object. .eq() helped me traverse them with respective indices. 
* for looping AJAX resposne in different increments. One AJAX call loops in increments of 8 to extract desired objects from the response. Then I looped through .find().eq() to print the extracted response onto the HTML elements. 
* In order to make an AJAX call for the localStorage and for each list item you click, I had to make AJAX calls. 2 varialbes here: localStorage value and click event value. I resolved it by wrapping the AJAX call function in another one, defining different variables for the two wrapper functions. 
* Making 2 AJAX calls: I had to make the first AJAX call, extract some information (lon, lat info), then make the second AJAX call. The concept troubled me; the second AJAX must be inside the first AJAX call. 
* Clear button was a trouble. .empty() empties the entire ul, leaving no city to be clicked. So after emptying the ul, I re-appended the original array of items, restoring the preset array of cities displayed on the screen. 

## Notes 
* One of my classmate has used different api sets: Google geocoding and One Call API. Google geocoding API adjusts the city names with respect to the browser's language setting. 
* I could not find a way to tweak a for loop. 40 objects returned in AJAX resposne, and I wanted to print the object index [0, 8, 16, 24, 32, 39]. Everything is increments of 8 EXCEPT FOR the last one. So far, there's no way to prevent the loop to reach index 40 and jump out. As a unsatisfactory alternative, I decremented the counter i by 1 for each loop; the code block in the loop will be executed, then decrement the i by 1 and then move its increment by 8. 
