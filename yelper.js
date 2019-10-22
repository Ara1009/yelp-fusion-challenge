'use strict';

const yelp = require('yelp-fusion');
const client = yelp.client('uI2bvYscy3SBUAvAroR6rweaPGHUgCi9x8wI2Q6yIpZn0ABEW1gquLPnQNQOPJPIJ5FAfG_l4Dj5e3npuH_8tA9hf8IxxyUSs3T11yk8jRH7wsLnnYDpNO8Y4x6qXXYx');


client.search({
  term: 'Ice Cream',
  location: 'alpharetta, ga',
  limit: 5,
}).then(res => {
  
  const promises = [];
	for (var i=0; i<=4; i++) {
  	 promises.push(new Promise((resolve) => {
       const pos = i;
      client.reviews(res.jsonBody.businesses[pos].id).then(response => {
        resolve([
          res.jsonBody.businesses[pos].name,
          res.jsonBody.businesses[pos].location.address1,
          res.jsonBody.businesses[pos].location.city,
          response.jsonBody.reviews[0].text,
          response.jsonBody.reviews[0].user.name,
        ]);
      });
	 }));
  }
  //use promise.all for multiple requests
  Promise.all(promises).then(results => {
    results.forEach(result => {
      console.log(result);
    });
  })
}).catch(e => {
  console.log(e);
});
