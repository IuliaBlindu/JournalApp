var express = require("express");
var router = express.Router();
var faker = require("faker");
var admin = require("firebase-admin");

var serviceAccount = require("../firebaseConfig/journalapp-52f21-firebase-adminsdk-va5p8-3dfcdd75d8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore(); // imi stochez o referinta catre baza mea de date

const bcrypt = require("bcrypt");
const saltRounds = 13;

const jwt = require("jsonwebtoken");
const { date } = require("faker");
let secret = "hiddenSecret";

// MIDDLEWARE
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, secret, (err, decode) => {
      if (err) {
        res.sendStatus(401);
      } else {
        next(); // daca am trecut de verificarea lui, pot sa merg mai departe
      }
    });
  } else {
    res.sendStatus(401);
  }
}

/* login. */
router.post("/login", async (req, res) => {
  let response = { loginSuccessfull: "false" };
  console.log("Login attempt");
  const users = await db.collection("users");
  const userSnapshot = await users.get();
  if (userSnapshot.length === 0) {
    console.log("The database is empty");
    res.send(response);
  } else {
    let userData = req.body;
    let foundUser = null;
    let foundId = null;
    userSnapshot.forEach(doc => {
      let user = { ...doc.data() };
      if (user.email === userData.email) {
        console.log("User found");
        foundUser = user;
        foundId = doc.id;
      }
    });
    if (!foundUser) {
      console.log("No such user");
      res.send(response);
    } else {
      bcrypt
        .compare(userData.password, foundUser.password)
        .then(comparationResult => {
          if (comparationResult) {
            response.token = jwt.sign(foundUser.email, secret);
            response.loginSuccessfull = "true";
            response.id = foundId;
            response.name = foundUser.name;
            console.log(response);
            res.send(response);
          } else {
            console.log("Password mismatch");
            res.send(response);
          }
        });
    }
  }
});

/* register. */
router.post("/register", async (req, res) => {
  let response = { registerSuccessful: "false" };
  let userData = req.body; // ar trebui sa contina obiectul pe care l-am trimis
  let duplicate = false;
  const users = await db.collection("users");
  const userSnapshot = await users.get();
  userSnapshot.forEach(doc => {
    let user = { ...doc.data() };
    if (user.email == userData.email) {
      console.log("User already exists");
      duplicate = true;
    }
  });

  if (!duplicate) {
    bcrypt.hash(userData.password, saltRounds).then(async hash => {
      userData.password = hash;
      const doc = await db.collection("users").add(userData);
      response.registerSuccessful = "true";
      response.id = doc.id;
      res.send(response);
    });
  } else {
    res.send(response);
  }
});

router.post("/category", verifyToken, (req, res) => {
  jwt.verify(req.token, secret, async (err, decoded) => {

    if (err) {
      if (err.expiredAt) {
        //if token expired, the err object will have an 'expiredAt' key
        res.send(({ message: 'Your token has expired. Please re-authenticate' }))
      } else {
        res.send({ message: 'You are NOT authorized to access this resource' })
      }
    } else {
      let data = req.body;

      const doc = await db.collection("categories").add(data);
      let response = {
        status: "success",
        id: doc.id
      };
      console.log(response.status);
      res.send(response);
    }
  })

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
    response = { status: "success", data: category.data() };
  }
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

router.put("/category", verifyToken, (req, res) => {
  jwt.verify(req.token, secret, async (err, decoded) => {

    if (err) {
      if (err.expiredAt) {
        //if token expired, the err object will have an 'expiredAt' key
        res.send(({ message: 'Your token has expired. Please re-authenticate' }))
      } else {
        res.send({ message: 'You are NOT authorized to access this resource' })
      }
    } else {
      let data = req.body;
      console.log(data);
      const cateogry = db.collection("categories").doc(data.id);
      delete data.id;
      const updated = await cateogry.update(data);
      let response = { status: "success" };
      console.log(response.status);
      res.send(response);
    }

  })
});

router.delete("/category", verifyToken, (req, res) => {
  jwt.verify(req.token, secret, async (err, decoded) => {

    if (err) {
      if (err.expiredAt) {
        //if token expired, the err object will have an 'expiredAt' key
        res.send(({ message: 'Your token has expired. Please re-authenticate' }))
      } else {
        res.send({ message: 'You are NOT authorized to access this resource' })
      }
    } else {
      let data = req.body;
      console.log(data);
      const cateogry = db.collection("categories").doc(data.id);
      delete data.id;
      const deleted = await cateogry.delete();
      let response = { status: "success" };
      console.log(response.status);
      res.send(response);
    }
  })
});

router.post("/entry", verifyToken, (req, res) => {

  jwt.verify(req.token, secret, async (err, decoded) => {

    if (err) {
      if (err.expiredAt) {
        //if token expired, the err object will have an 'expiredAt' key
        res.send(({ message: 'Your token has expired. Please re-authenticate' }))
      } else {
        res.send({ message: 'You are NOT authorized to access this resource' })
      }
    } else {
      let data = req.body;
      const doc = await db.collection("entries").add(data);
      let response = {
        status: "success",
        id: doc.id
      };
      console.log(response.status);
      res.send(response);
    }
  })
});

router.get("/entry/:id", async (req, res) => {
  console.log("id");
  const entries = db.collection("entries");
  let id = req.params.id;
  let response = { status: "failed" };
  const entryRef = entries.doc(id);
  const entry = await entryRef.get();
  if (!entry.exists) {
    console.log("No such document!");
  } else {
    response = { status: "success", data: entry.data() };
    console.log(response.data)
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

router.put("/entry", verifyToken, (req, res) => {
  jwt.verify(req.token, secret, async (err, decoded) => {

    if (err) {
      if (err.expiredAt) {
        //if token expired, the err object will have an 'expiredAt' key
        res.send(({ message: 'Your token has expired. Please re-authenticate' }))
      } else {
        res.send({ message: 'You are NOT authorized to access this resource' })
      }
    } else {
      let data = req.body;
      console.log(data);
      const entry = db.collection("entries").doc(data.id);
      delete data.id;
      const updated = await entry.update(data);
      let response = { status: "success" };
      console.log(response.status);
      res.send(response);
    }
  })
});

router.delete("/entry", verifyToken, (req, res) => {
  jwt.verify(req.token, secret, async (err, decoded) => {
    if (err) {
      if (err.expiredAt) {
        //if token expired, the err object will have an 'expiredAt' key
        res.send(({ message: 'Your token has expired. Please re-authenticate' }))
      } else {
        res.send({ message: 'You are NOT authorized to access this resource' })
      }
    } else {
      let data = req.body;
      console.log(data);
      const entry = db.collection("entries").doc(data.id);
      delete data.id;
      const deleted = await entry.delete();
      let response = { status: "success" };
      console.log(response.status);
      res.send(response);
    }
  })
});

router.post("/generate", async (req, res) => {
  categoryIds = ["yRiIqK3JDn2B4FxMbw7l", "OWbVDQlE0WJ7yWTlDDRb"];
  feelings = ["sad", "happy", "angry", "neutral"];

  for (let i = 0; i < 50; i++) {
    let cId = Math.floor(Math.random() * Math.floor(2));
    let fId = Math.floor(Math.random() * Math.floor(4));
    let date = faker.date.future();
    date = date.toString();
    console.log(date);
    date = date.split(" ");
    let data = {
      userId: "yRzPED1S3RrL7g4GDY9e",
      categoryId: categoryIds[cId],
      feeling: feelings[fId],
      date: date[3] + "-" + date[1] + "-" + date[2],
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph()
    }
    const doc = await db.collection("entries").add(data);
  }

  res.send("success");

});

module.exports = router;
