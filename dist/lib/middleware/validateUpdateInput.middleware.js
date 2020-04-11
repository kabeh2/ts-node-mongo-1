"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateUpdateInput = (allowedUpdateKeys, req, res, next) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = allowedUpdateKeys;
        const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
        if (!isValidUpdate) {
            return res.status(400).send({ error: "Invalid Update." });
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = validateUpdateInput;
