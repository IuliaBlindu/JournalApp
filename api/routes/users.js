var express = require("express");
var router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("../firebaseConfig/journalapp-52f21-firebase-adminsdk-va5p8-3dfcdd75d8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore(); // imi stochez o referinta catre baza mea de date

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/category", async (req, res) => {
  let data = req.body;
  const doc = await db.collection("categories").add(data);
  let response = {
    status: "success",
    id: doc.id
  };
  console.log(response.status);
  res.send(response);
});

router.get("/category/:id", async (req, res) => {
  const categories = db.collection("categories");
  let id = req.params.id;
  let response = { status: "failed" };
  const categoryRef = categories.doc(id);
  const category = await categoryRef.get();
  if (!category.exists) {
    console.log("No such document!");
  } else {
    response = { status: "success", data: todo.data() };
  }
  console.log(response);
  res.send(response);
});

router.get("/categories", async (req, res) => {
  const categories = db.collection("categories");
  let responseArray = [];
  const snapshot = await categories.get();
  snapshot.forEach(doc => {
    let category = { ...doc.data() };
    category.id = doc.id;
    // delete task.description;
    responseArray.push(category);
  });
  let response = { status: "success", data: responseArray };
  console.log(response);
  res.send(response);
});

router.put("/category", async (req, res) => {
  let data = req.body;
  console.log(data);
  const cateogry = db.collection("categories").doc(data.id);
  delete data.id;
  const updated = await cateogry.update(data);
  let response = { status: "success" };
  console.log(response.status);
  res.send(response);
});

router.delete("/category", async (req, res) => {
  let data = req.body;
  console.log(data);
  const cateogry = db.collection("categories").doc(data.id);
  delete data.id;
  const deleted = await cateogry.delete();
  let response = { status: "success" };
  console.log(response.status);
  res.send(response);
});

router.post("/entry", async (req, res) => {
  let data = req.body;
  const doc = await db.collection("entries").add(data);
  let response = {
    status: "success",
    id: doc.id
  };
  console.log(response.status);
  res.send(response);
});

router.get("/entry/:id", async (req, res) => {
  const entries = db.collection("entries");
  let id = req.params.id;
  let response = { status: "failed" };
  const entryRef = entries.doc(id);
  const entry = await entryRef.get();
  if (!entry.exists) {
    console.log("No such document!");
  } else {
    response = { status: "success", data: entry.data() };
  }
  console.log(response);
  res.send(response);
});

router.get("/entries", async (req, res) => {
  const entries = db.collection("entries");
  let responseArray = [];
  const snapshot = await entries.get();
  snapshot.forEach(doc => {
    let entry = { ...doc.data() };
    entry.id = doc.id;
    // delete task.description;
    responseArray.push(entry);
  });
  let response = { status: "success", data: responseArray };
  console.log(response);
  res.send(response);
});

router.put("/entry", async (req, res) => {
  let data = req.body;
  console.log(data);
  const entry = db.collection("entries").doc(data.id);
  delete data.id;
  const updated = await entry.update(data);
  let response = { status: "success" };
  console.log(response.status);
  res.send(response);
});

router.delete("/entry", async (req, res) => {
  let data = req.body;
  console.log(data);
  const entry = db.collection("entries").doc(data.id);
  delete data.id;
  const deleted = await entry.delete();
  let response = { status: "success" };
  console.log(response.status);
  res.send(response);
});

module.exports = router;
