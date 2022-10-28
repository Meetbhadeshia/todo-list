//jshint esversion:6
const express = require("express");
const { MongoClient } = require("mongodb");
require

//date variable is requiring a local made date.js library, whose logic isn't required in this file, so we made it in diff file. Now we can just use it's, wherever we need, by calling date()
const date = require(__dirname + "/date.js")
const app = express();
const port = 3000;

//url for mongo connection
//cluster's password and username here removing angular brackets 
// const uri = `mongodb+srv://<username>:<password>@cluster0.ic27o.mongodb.net/test`;
// const client = new MongoClient(uri);
// const db = client.db("node-ejs");
// const coll = db.collection("todoList");

//items array for viewing items
//we can use const for arrays and objects too. consts can be used for pushing values but not assigning it to a new array directly. for ex. const items=[1,2] , but not in further code we can do items=[3,4], we can only do items.push(3), items.push(4)
const items = [];
const workItems = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //we called date() from our local js file, exported with the help of module.exports, and initialized it, because functions need to be intialized
  const dateFormat = date.getDate()
  res.render("list", {
    listTitle: dateFormat,
    newListItems: items,
  });
  //below is mongo code to fetch all the values from table(collection)
  // run();
  // async function run() {
  //   try {
  //     await client.connect();
  //     const cursor = coll.find({});
  //     items = await cursor.toArray();
  //   } catch (e) {
  //     console.log("error: " + e);
  //   }
  // }
});

app.post("/", (req, res) => {
  const item = req.body.todoItem;
  console.log(req.body);

  //pushes the value into specific lists. if work then pushes into work otherwise...
  if (req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work");
  } else {
    items.push(item)
    res.redirect("/");
  }

  //below is a code to insert a new item in mongo
  // let item = req.body.todoItem;
  // if (item) insertItem();
  // async function insertItem() {
  //   try {
  //     insertedItem = await coll.insertOne({ todoItem: item });
  //     console.log(insertedItem);
  //   } catch (e) {
  //     console.log("error in inserting item. error: " + e);
  //   }
  // }

  //below is code to delete a item in mongo
  // itemToBeDeleted = req.body.deleteItem;
  // if (itemToBeDeleted) deleteItem();
  // async function deleteItem() {
  //   try {
  //     deletedItem = await coll.deleteOne({ todoItem: itemToBeDeleted });
  //     console.log(deletedItem);
  //   } catch (e) {
  //     console.log("error in deleting item. error: " + e);
  //   }
  // }
});

app.get("/work", (req, res) => {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems,
  });
});

app.get("/about", (req, res) => {
  res.render("about")
})

app.listen(process.env.port || port, () => {
  console.log("App is running on port no: " + port);
});
