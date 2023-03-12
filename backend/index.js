require("dotenv").config();
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("build"));

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connected to mongodb`);
  })
  .catch((error) => {
    console.log(`error connecting to mongodb ${error.message}`);
  });

const formSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: String,
  },
  email: {
    type: String,
  },
  contact: {
    type: String,
    minLength: 10,
    validate: {
      validator: function (v) {
        return v > 999999999;
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
});

formSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Form = mongoose.model("Form", formSchema);

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build/index.html"), function (err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

app.get("/allForms", (req, res) => {
  Form.find({}).then((form) => {
    res.json(form);
  });
});

app.post("/send_email", async (req, res) => {
  const { name, date, email, contact } = req.body;

  const formDetails = new Form({
    name,
    date,
    email,
    contact,
  });

  formDetails.save().then((result) => {
    console.log(`form saved`);
  });

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Thanks for Contacting",
    html: `<h2>Thanks for Contacting Ashish, ${name}</h2>
						<h4>Your Message has been received</h4>
            <h4>Your Email Address = ${email}</h4>
            <h4>Your Contact Number = ${contact}</h4>
            <h4>Your Date of Birth = ${date}</h4>
					`,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.status(200).end();
});

app.listen(process.env.PORT | 8080, () => console.log("app running"));
