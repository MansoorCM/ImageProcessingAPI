"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageResize_1 = __importDefault(require("../../utilities/imageResize"));
var images = express_1.default.Router();
// the images api which resizes the image using the sharp module. 
images.get('/', imageResize_1.default, function (req, res) {
    // all the work is done in the middleware.
});
exports.default = images;
