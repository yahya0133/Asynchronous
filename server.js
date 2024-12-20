const express = require('express');
const db = require('./connect_db');
require('dotenv').config();

const app = express();
const port = process.env.PORT

app.use(express.json());


app.use(async (req, res) => {
    if (!mongoose.connection.readyState) {
        try {
            await db.connect();
        } catch (error) {
            return res.status(500).json({ error: 'Erreur de connexion à la base de données' });
        }
    }
});

app.get('/api/chain', async (req, res) => {
    try {
        
        await new Promise(resolve => setTimeout(() => {
            console.log('Étape 1: Vérification');
            resolve();
        }, 1000));

        
        await new Promise(resolve => setTimeout(() => {
            console.log('Étape 2: Traitement');
            resolve();
        }, 1000));

        
        await new Promise(resolve => setTimeout(() => {
            console.log('Étape 3: Finalisation');
            resolve();
        }, 1000));

        res.json({ message: 'Opérations terminées avec succès' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/concurrent', async (req, res) => {
    try {
        const promise1 = db.fetchDataFromCollection('collection1');
        const promise2 = db.fetchDataFromCollection('collection2');

        const [data1, data2] = await Promise.all([promise1, promise2]);
        res.json({ data1, data2 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/parallel', async (req, res) => {
    try {
        const collections = ['users', 'posts', 'comments'];
        const promises = collections.map(collection => 
            db.fetchDataFromCollection(collection)
        );

        const results = await Promise.all(promises);
        res.json({
            users: results[0],
            posts: results[1],
            comments: results[2]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/iterate/:collection', async (req, res) => {
    try {
        await db.iterateDocuments(req.params.collection);
        res.json({ message: 'Itération terminée' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.listen(port, () => {
    console.log(` Serveur démarré sur le port ${port}`);
});