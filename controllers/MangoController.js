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
    
    if(searchBy._id){
        query = query.where('_id','==', searchBy._id);
    }
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


exports.updatePalet = async (req, res) => {
    const updateData = req.body;
    const palletId = updateData._id;  // Extracting the _id from the request data

    if (!palletId) {
        return res.status(400).send('Pallet _id is required for update.');
    }

    // Remove the _id field from the updateData to avoid overwriting it
    delete updateData._id;

    try {
        // Reference to the specific pallet document to update
        const palletRef = db.collection('pallets').doc(palletId);

        // Update only the fields provided in updateData
        await palletRef.update(updateData);

        console.log(`Pallet with ID: ${palletId} updated successfully.`);
        res.status(200).send(`Pallet with ID: ${palletId} updated.`);
    } catch (error) {
        console.error('Error updating pallet:', error);
        res.status(500).send('Internal Server Error');
    }
}