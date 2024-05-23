const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8088;

app.get("/", async (req, res) => {
    try {
        const data = await UserModel.find({});
        res.json({ success: true, data: data });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.post("/create", async (req, res) => {
    try {
        const data = new UserModel(req.body);
        await data.save();
        res.status(201).json({ success: true, message: "Data saved successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.put("/update", async (req, res) => {
     
        const { _id,...rest } = req.body;
        const data = await UserModel.updateOne({ _id: _id }, rest);
        res.json({ success: true, message: "Data updated successfully",data : data});

});

app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const data = await UserModel.deleteOne({ _id: _id });
        res.json({ success: true, message: "Data deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

mongoose.connect("mongodb://localhost:27017/crud")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((err) => console.error("MongoDB connection error:", err));




