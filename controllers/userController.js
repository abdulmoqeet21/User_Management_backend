const UserGroup = require("../models/User");
const jwt = require("jsonwebtoken");
const createUsergroup = async (req, res) => {
  try {
    const { formData } = req.body;
    const Group = new UserGroup({ formData });
    await Group.save();
    console.log("group created:", Group);
    res.status(201).send(Group);
  } catch (error) {
    res.status(400).send({ error: "Failed to create Group" });
    console.error("Failed to create Group:", error);
  }
};

const getGroups = async (req, res) => {
  try {
    const groups = await UserGroup.find();
    res.send(groups);
    console.log("groups sented:", groups);

    console.log("token userID:", req.userID);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch groups" });
  }
};

const getSingleGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await UserGroup.findOne({ "formData._id": id });
    if (!group) {
      return res.status(404).send({ error: "group not found" });
    }
    res.send(group);
    console.log("group sented:", group);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch user" });
  }
};

const updateFormdata = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await UserGroup.findOneAndUpdate(
      { "formData._id": id },
      { $set: { "formData.$": req.body } },
      { new: true }
    );

    console.log("Group updated check :", group);
    if (!group) {
      return res.status(404).send({ error: "Group not found" });
    }

    res.send(group);
    console.log("Group updated:", group);
  } catch (error) {
    res.status(500).send({ error: "Failed to update group" });
  }
};

const deleteGroupform = async (req, res) => {
  try {
    const { arrayElement_id } = req.params;

    const group = await UserGroup.findOneAndUpdate(
      { "formData._id": arrayElement_id },
      { $pull: { formData: { _id: arrayElement_id } } },
      { new: true }
    );

    if (!group) {
      return res.status(404).send({ error: "Group not found" });
    }

    res.send(group);
    console.log("Form data deleted:", group);
  } catch (error) {
    res.status(500).send({ error: "Failed to delete form data" });
  }
};

module.exports = {
  createUsergroup,
  getGroups,
  getSingleGroup,
  updateFormdata,
  deleteGroupform,
};
