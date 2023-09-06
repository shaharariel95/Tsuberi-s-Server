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
