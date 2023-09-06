const admin = require('../firebase');
const db = admin.firestore();

exports.palletData = async (req, res) => {
    const trayData = req.body;
    
    try {
        // Add trayData to the 'pallets' collection in Firestore
        const docRef = await db.collection('pallets').add(trayData);
        
        console.log(`Pallet added with ID: ${docRef.id}`);
        res.status(200).send("Data received and stored!");
    } catch (error) {
        console.error("Error adding pallet data: ", error);
        res.status(500).send("Error storing data");
    }
}

exports.getPalet = async (req, res) => {
    const searchBy = req.body;

    let palletsRef = db.collection('pallets');
    let query = palletsRef;

    if (searchBy.farmer) {
        query = query.where('farmer', '==', searchBy.farmer);
    }

    if (searchBy.variety) {
        query = query.where('variety', '==', searchBy.variety);
    }
    if (typeof searchBy.weighOver === 'number') {
        query = query.where('weight', '>=', searchBy.weighOver);
    }
    if (typeof searchBy.weighUnder === 'number') {
        query = query.where('weight', '<=', searchBy.weighUnder);
    }
    
    
    console.log("MangoController line40: query: " + query.toString());

    // You can add more conditions based on other fields in the same way.

    try {
        const snapshot = await query.get();
        if (snapshot.empty) {
            res.status(404).send('No matching pallets found');
            return;
        } 

        let results = [];
        snapshot.forEach(doc => {
            results.push({ id: doc.id, ...doc.data() });
        });
        
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching pallets:', error);
        res.status(500).send('Internal Server Error');
    }
}
