const Dog = require('../models/Dog');

// Checks to register a new dog
exports.registerDog = async (req, res) => {
    try {
        const { name, description } = req.body;
        const owner = req.user.id;
        const dog = new Dog({ name, description, owner });
        await dog.save();
        res.status(201).json({ message: 'Dog registered!', dog });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Checks if dog is avaliable for adoption and sets it
exports.adoptDog = async (req, res) => {
    try {
        const { dogId } = req.params;
        const userId = req.user.id;
        const dog = await Dog.findById(dogId);

        if (!dog) return res.status(404).json({ error: 'Dog not found' });

        if (dog.adoptedBy)
            return res.status(400).json({ error: 'Dog already adopted' });

        dog.adoptedBy = userId;
        dog.adoptedAt = new Date();

        await dog.save();
        res.json({ message: 'Dog adopted!', dog });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Removes dog only if the following applies
exports.removeDog = async (req, res) => {
    try {
        const { dogId } = req.params;
        const dog = await Dog.findById(dogId);

        if (!dog) return res.status(404).json({ error: 'Dog not found' });

        if (dog.adoptedBy)
            return res.status(400).json({ error: 'Cannot remove an adopted dog' });

        if (dog.owner.toString() !== req.user.id)
            return res.status(403).json({ error: 'Unauthorized' });

        await dog.remove();
        res.json({ message: 'Dog removed successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Lists dogs registered by user
exports.listRegisteredDogs = async (req, res) => {
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const dogs = await Dog.find({ owner: userId }).skip(skip).limit(limit);
        res.json({ dogs, page, limit });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Lists dogs adopted by owner
exports.listAdoptedDogs = async (req, res) => {
    try {
        const userId = req.user.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const dogs = await Dog.find({ adoptedBy: userId }).skip(skip).limit(limit);
        res.json({ dogs, page, limit });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};