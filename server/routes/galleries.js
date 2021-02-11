var express = require('express');
var mongodb = require('mongodb');
var multer = require('multer');
var path = require('path');
var fs = require('fs')
var router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '/../../uploads/gallery/', `${req.params.uid}`);
        fs.exists(dir, exist => {
            if (!exist) {
                return fs.mkdir(dir, error => cb(error, dir))
            }
            return cb(null, dir)
        })
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });


// get gallery by id
router.get('/:id', async function (req, res, next) {
    const galleries = await loadconnection();
    res.send(await galleries.find({ _id: mongodb.ObjectID(req.params.id) }).toArray());
});

// update gallery name by id
// update more info
router.put('/:id', async function (req, res, next) {
    const galleries = await loadconnection();
    if (req.params.id == null) {
        return res.status(400).send('Id cannot be null.')
    }
    if (req.params.name == null) {
        return res.status(400).send('Name cannot be null.')
    }
    res.send(await galleries.updateOne({ _id: mongodb.ObjectID(req.params.id) }, { name: req.body.name })
        .toArray());
    return res.status(201).send("Updated successfully.");
});

// get galleries by user id
router.get('/user/:uid', async function (req, res, next) {
    const galleries = await loadconnection();
    res.send(await galleries.find({ userId: req.params.uid }).toArray());
});


// Upload single image to the user directory
// also saves image metadata in the DB
// TODO: find a way to subdivide galleries
router.post('/upload/:uid/', upload.array('pictures', 20), async function (req, res, next) {
    try {
        var newGallery = {
            userId: req.params.uid,
            name: req.body.name,
            createdAt: Date.now(),
            thumbnail: req.body.thumbnail,
        };

        const galleries = await loadconnection();
        galleries.insertOne(newGallery);
        return res.status(201).json({
            message: 'File uploded successfully',
        });
    } catch (error) {
        console.error(error);
    }
});

/* get all image names in a gallery */
router.get('/gallery/:id', (req, res) => {

    const path1 = path.join(__dirname, '/../../uploads/gallery', `${req.params.id}`)
    fs.readdir(path1, (err, files) => {
        if (err) {
            console.error(err)
            return
        }
        res.send(files);
    })
});

/* get image */
// gid - gallery id
// iid - image id
router.get('/:gid/image/:iid', (req, res) => {
    const path1 = path.join(__dirname, '/../../uploads/gallery', `${req.params.gid}`, `${req.params.iid}`)

    fs.readFile(path1, 'base64', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.send(data);
    })
});


// delete image
router.delete('/:uid/:gid/:iid', (res, req) => {
    const path = `/uploads/${uid}/${gid}/${iid}`
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err)
            return
        }

        res.status(200).send();
    })
});

/* delete a gallery */
router.delete('/:gid', async (req, res) => {
    const galleries = loadconnection();
    (await galleries).deleteOne({ _id: mongodb.ObjectID(req.params.gid) });
    res.status(200).send();

})

async function loadconnection(uid) {
    const client = await mongodb.MongoClient.connect('mongodb+srv://user1234:user1234@cluster0.g2jbm.mongodb.net/<dbname>?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return client.db('galleries').collection('gallery');
}


module.exports = router;
