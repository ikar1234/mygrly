var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await loadconnection();
  res.send(await users.find({}).toArray());
});

/* GET users listing. */
router.get('/:name', async function (req, res, next) {
  const users = await loadconnection();
  res.send(await users.find({}, {name:req.params.name, _id: 0}).toArray());
});

router.post('/', async (req, res) => {
  const users = await loadconnection();
  const newUser = {
    name: req.body.name,
    password: req.body.password,
    accountType: req.body.accountType,
    createdAt: new Date()
  };
  if (!newUser.name || newUser.name === "") {
    res.status(400).send('Username cannot be null!');
  }

  if (!newUser.password || newUser.password === "") {
    res.status(400).send('User password cannot be null!');
  }

  if (!newUser.accountType || newUser.accountType === "") {
    res.status(400).send('Account type cannot be null!');
  }
  await users.insertOne(newUser);
  res.status(201).send();
})


/* delete all users */
router.delete('/all', async (req, res) => {
  try {
    const users = await loadconnection();

    users.deleteMany({});
    res.status(200).send();    
  }
  catch (e) {
    console.log(e);
    res.status(403).send();
  }

})

router.delete('/:id', async (req, res) => {
  const users = await loadconnection();
  users.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
})


async function loadconnection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://user1234:user1234@cluster0.g2jbm.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  return client.db('galleries').collection('users');
}


module.exports = router;
