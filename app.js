/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
PORT = 28765;


// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector');
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public')); // this is needed to allow for the form to use the ccs style sheet



// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/
app.get('/', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.character_name === undefined)
    {
        query1 = "SELECT * FROM Characters;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Characters WHERE character_name LIKE "${req.query.character_name}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Characters;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let people = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let planets = rows;

            return res.render('index', {data: people, planets: planets});
        })
    })
});    

app.get('/characters', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.character_name === undefined)
    {
        query1 = "SELECT * FROM Characters;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Characters WHERE character_name LIKE "${req.query.character_name}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Characters;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let people = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let planets = rows;

            return res.render('characters', {data: people, planets: planets});
        })
    })
}); 

app.get('/pets', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.pet_name === undefined)
    {
        query1 = "SELECT * FROM Pets;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Pets WHERE pet_name LIKE "${req.query.pet_name}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Pets;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let people = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let planets = rows;

            return res.render('pets', {data: people, planets: planets});
        })
    })
});    

app.get('/armors', function(req, res)
    {  
        let query1 = "SELECT * FROM Armors;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('armors', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query         

app.get('/weapons', function(req, res)
    {  
        let query1 = "SELECT * FROM Weapons;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('weapons', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                  


app.post('/add-character-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        
            // Capture NULL values
        // Create the query and run it on the database
        query1 = `INSERT INTO Characters (character_name, character_speed, creation_age) VALUES ('${data.character_name}', '${data.character_speed}', '${data.creation_age}')`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on bsg_people
                query2 = `SELECT * FROM Characters;`;
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

app.post('/add-pet-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        
            // Capture NULL values
        // Create the query and run it on the database
        query1 = `INSERT INTO Pets (pet_name, character_ID, pet_age) VALUES ('${data.pet_name}', '${data.character_id}', '${data.pet_age}')`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on bsg_people
                query2 = `SELECT * FROM Pets;`;
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

app.post('/add-weapon-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        
            // Capture NULL values
        // Create the query and run it on the database
        query1 = `INSERT INTO Weapons (improvement_id, weapon_name, weapon_damage, weapon_weight, speed_change) VALUES ('${data.improvement_id}', '${data.weapon_name}', '${data.weapon_damage}', '${data.weapon_weight}', '${data.speed_change}')`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                // If there was no error, perform a SELECT * on bsg_people
                query2 = `SELECT * FROM Weapons;`;
                db.pool.query(query2, function(error, rows, fields){
    
                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

app.delete('/delete-pet-ajax/', function(req,res,next){                                                                
        let data = req.body;
        let petID = parseInt(data.id);
        let deletePet = `DELETE FROM Pets WHERE pet_id = ${petID}`;
        // Run the second query
        db.pool.query(deletePet, [petID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.sendStatus(204);
                }
})});

app.delete('/delete-weapon-ajax/', function(req,res,next){                                                                
    let data = req.body;
    let weaponID = parseInt(data.id);
    let deleteWeapon = `DELETE FROM Weapons WHERE weapon_id = ${weaponID}`;
    // Run the second query
    db.pool.query(deleteWeapon, [weaponID], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
            }
})});

app.delete('/delete-character-ajax/', function(req,res,next){                                                                
        let data = req.body;
        let characterID = parseInt(data.id);
        let deletePet = `DELETE FROM Pets WHERE character_id = ${characterID}`;
        let deleteCharacter= `DELETE FROM Characters WHERE character_id = ${characterID}`;
        // Run the second query
        db.pool.query(deletePet, [characterID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteCharacter, [characterID], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
})});

app.put('/put-character-ajax', function(req,res,next){
    let data = req.body;
  
    let characterSpeed = parseInt(data.character_speed);
    let character = parseInt(data.character_name);
  
    let queryCharacterSpeed = `UPDATE Characters SET character_speed = ${characterSpeed} WHERE Characters.character_id = ${character}`;
  
          // Run the 1st query
        db.pool.query(queryCharacterSpeed, [characterSpeed, character], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error); 
              res.sendStatus(400);
              }
    
})});

app.put('/put-pet-ajax', function(req,res,next){
    let data = req.body;
  
    let petAge = parseInt(data.pet_age);
    let pet = parseInt(data.pet_name);
  
    let queryPetAge = `UPDATE Pets SET pet_age = ${petAge} WHERE Pets.pet_id = ${pet}`;
  
          // Run the 1st query
        db.pool.query(queryPetAge, [petAge, pet], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error); 
              res.sendStatus(400);
              }
    
})});

app.put('/put-weapon-ajax', function(req,res,next){
    let data = req.body;
  
    let weapon = parseInt(data.weapon_name);
    let weaponDamage = parseInt(data.weapon_damage);
    let weaponWeight = parseInt(data.weapon_weight);
    let speedChange = parseInt(data.speed_change);

    let queryWeaponStats = `UPDATE Weapons SET weapon_damage = ${weaponDamage}, weapon_weight = ${weaponWeight}, speed_change = ${speedChange} WHERE Weapons.weapon_id = ${weapon}`;
  
          // Run the 1st query
        db.pool.query(queryWeaponStats, [weaponDamage, weaponWeight, speedChange, weapon], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error); 
              res.sendStatus(400);
              }
    
})});
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});