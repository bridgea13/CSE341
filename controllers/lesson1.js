const helloRoute = (req, res) => {
    res.send("Hello Hey Alice B");
};

const ogRoute = (req, res) => {
    res.send("Hello Alice B");
};

module.exports = {
    helloRoute,
    ogRoute,
};