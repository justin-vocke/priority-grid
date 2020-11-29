# priority-grid
A priority grid to stay focused (based on Eisenhower Matrix)


 I've added a /config folder that holds database information. To access your database using MongoDB (and use the project as normal) you will need to add a client
 folder in the main directory. This client folder contains keys.js, which only contains the following code:
 
 module.exports = {
  mongoURI: "your  mongoDB db URI"
}
