# Node.js Web Scraper using Cheerio and Axios
This application is a simple node.js web scraper, which downloads the html of a page (in this case an imaginary cheese store page). The app will collect all the data and save them into a JSON file. 

The data includes:
1. Each product as its own object containing: 
    - title 
    - image URL
    - discounted price
    - original price
2. The total number of prices
3. The average price of all items

## How to start

In the project folder, run the terminal and type:
```
node app
```
This will create a new JSON file with all the data collected from the store page.

