const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');

const site = 'https://cdn.adimo.co/clients/Adimo/test/index.html';

const scrapeSite = async () => {
    try {
        const {
            data
        } = await axios.get(site);
        const $ = cheerio.load(data);

        const cheeseCollection = $('.item');

        const cheeseItem = [];
       //loop to collect data from each items
        cheeseCollection.each((index, el) => {
            const cheese = {
                title: '',
                price: '',
                imageURL: '',
                oldPrice: ''
            };

            cheese.title = $(el).children('h1').text(); //get the text from the h1 element inside the item div
            cheese.price = parseFloat($(el).children('span.price').text().replace(/[^.0-9]/g, '')); //get the text inside the price span, remove the pound sing and turn it into a float
            cheese.oldPrice = $(el).children('span.oldPrice').text(); //get the text from the old price span inside the item div
            cheese.imageURL = $(el).children('img').attr('src'); //get the src from the img element inside the item dic

            cheeseItem.push(cheese); //push the information in the cheeseItem array
        })

        //calc total items in page and push to cheese.json
        const totalItems =  cheeseCollection.length;
        cheeseItem.push('Total items: ' + totalItems);

        //calc total price in page and push to cheese.json
        var totalPrice = 0;
        for (var i = 0; i < cheeseItem.length; i++){
            if(cheeseItem[i].price !== undefined){
                totalPrice += cheeseItem[i].price;
            }
        }
        //find the average using the total price and the amount of items
        const avgPrice = totalPrice / totalItems;
        cheeseItem.push('Average price: £' + avgPrice);

        //write the array's information into a JSON file called 'cheese'
        fs.writeFile('cheeses.json', JSON.stringify(cheeseItem, null, 2), (error) => {
            if (error) {
                console.log(error);
                return;
            }
            console.log('Website data has been scrapped.');
        })
    } catch (e) {
        console.error(e);
    }
}
//run function
scrapeSite();