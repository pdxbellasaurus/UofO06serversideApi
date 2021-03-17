# 06 Server-Side APIs: Weather Dashboard
### Weather Dashboard Homework

[Launch Weather Dashboard Application](https://pdxbellasaurus.github.io/UofO06serversideApi/)

## Overview
This week's homework challenge was to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS using the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities.

The following image shows the web application's appearance and functionality:

![The weather app includes a search option, a list of cities, and a five-day forecast and current weather conditions for Atlanta.](./assets/06-server-side-apis-homework-demo.png)

## Description
Weather-Dashboard is an application to find a weather condition of a given city both the current and 5-Days forecast at the same time. The server-side API used to get response data object is retrieved from the Open Weather API. 

The current weather section is including the following weather characters.
* City, Date, Icon-image
* Temperature
* Humidity
* Wind Speed
* UV index with a color that indicates whether the conditions are favorable, moderate, severe or extreme

The 5-days weather forecast also displays below the current weather conditions section and it includes the following information for each day:
* Date
* Icon image
* Temperature
* Humidity

The local storage is used to store the previous search city and display them to the user in the left side of the page under the list group. The user can also clear the search history by clicking the clear history button. If the user wants to see the past search city weather condition again, just click the list group item cities under the clear history button.