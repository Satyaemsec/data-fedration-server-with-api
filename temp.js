const express = require('express');
const { runNmapWorker } = require('./nmap-Worker');

const app = express();
const port = 4000;

app.use(express.json());


app.post('/api/nmap', (req, res) => {
  const { target } = req.body;
  runNmapWorker(target, (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(result);
    }
  })
});


app.get('/api/nmap/:target', (req, res) => {
  const { target } = req.params;
  runNmapWorker(target, (err, resu) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
        res.send(resu);
      const insert = async () => {
        const db = await dbConnect();
        const result = await db.insertOne(resu);
        if (result.acknowledged) {
          console.log("data inserted");
        }
      };
      insert();
      res.send(result);
    }
  })
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
