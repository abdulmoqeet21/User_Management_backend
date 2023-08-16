const loginUser = require("../models/loginUsers");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const key = process.env.JWT_SECRET;

const Registration = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const User = await loginUser.findOne({ email });
    if (User) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new loginUser({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await loginUser.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email " });
    }

    // Check password

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Create JWT token
    console.log(key);
    const token = jwt.sign({ userId: user._id }, key, {
      expiresIn: "1h",
    });

    console.log(token);

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const getSingleGroup = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const group = await UserGroup.findById(id);
//     if (!group) {
//       return res.status(404).send({ error: "group not found" });
//     }
//     res.send(group);
//     console.log("group sented:", group);
//   } catch (error) {
//     res.status(500).send({ error: "Failed to fetch user" });
//   }
// };

// const updateFormdata = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const group = await UserGroup.findOneAndUpdate(
//       { "formData._id": id },
//       { $set: { "formData.$": req.body } },
//       { new: true }
//     );

//     console.log("Group updated check :", group);
//     if (!group) {
//       return res.status(404).send({ error: "Group not found" });
//     }

//     res.send(group);
//     console.log("Group updated:", group);
//   } catch (error) {
//     res.status(500).send({ error: "Failed to update group" });
//   }
// };

// const deleteGroupform = async (req, res) => {
//   try {
//     const { arrayElement_id } = req.params;

//     const group = await UserGroup.findOneAndUpdate(
//       { "formData._id": arrayElement_id },
//       { $pull: { formData: { _id: arrayElement_id } } },
//       { new: true }
//     );

//     if (!group) {
//       return res.status(404).send({ error: "Group not found" });
//     }

//     res.send(group);
//     console.log("Form data deleted:", group);
//   } catch (error) {
//     res.status(500).send({ error: "Failed to delete form data" });
//   }
// };

module.exports = {
  Registration,
  Login,
};
