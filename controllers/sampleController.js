const SampleModel = require('../models/sampleModel');

exports.getSampleData = (req, res) => {
    const data = SampleModel.fetchData();
    res.render('sampleView', { data: data });
};

exports.getDemo1 = (req, res) => {
    res.send("Demo route 1");
};

exports.getDemo2 = (req, res) => {
    res.send("Demo route 2");
};
