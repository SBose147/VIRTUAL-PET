var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);

  fedTime = database.ref("fedTime");
  fedTime.on("value", function(data){
  fedTime = data.val();
  });
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  //create feed the dog button here

  feed=createButton("Feed the Dog");
  feed.position(1000,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  textSize(20);
  fill(0);
  text("Food Left: " + foodS, 30, 40);
      
   //write code to display text lastFed time here
  if(fedTime >= 12) {
    text("Last Fed: " + fedTime%12 + " PM", 350, 30);
  }
  else if(fedTime === 0) {
    text("Last Fed: 12 AM", 350, 30);
  }
  else{
    text("Last Fed: " + fedTime + " AM", 350, 30);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  foodS--;
  database.ref('/').update ({
    food: foodS,
    fedTime: hour()
  })
}

//function to add food in stock
function addFoods()
{
  foodS++;
  database.ref('/').update({
  food:foodS
  })
}

function showError(){
  console.log("Error in writing in the database");
}