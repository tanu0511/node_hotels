const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
router.post("/", async (req, res) => {
  try {
    const data = req.body; // assuming the request body contains the person data

    //create new person document usong mongoose model
    const newPerson = new Person(data);

    //save the new person to the database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invaild work type" });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "Internal Server Error" });
  }
});

//UPDATE

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the idfrom url
    const updatedPersonData = req.body; //updated data for person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Return the updated document
        runValidators: true, //Run Mongoose Validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found..!" });
    }

    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error...!" });
  }
});

// router.delete("/:id", async (req, res) => {
//   try {
//     const personId = req.params.id;
//     // EXTRACT THE PERSON'S ID FFROM URL PARAMETER..!
//     console.log(Person);

//     const response = await personId.findByIdAndRemove(personId);

//     if (!response) {
//       return res.status(404).json({ error: "Person not found" });
//     }
//     console.log("data deleted..!");
//     res.status(200).json({ message: "person deleted successfully...!" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error...!" });
//   }
// });

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    // Check if the person exists and delete it
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data deleted..!");
    res.status(200).json({ message: "Person deleted successfully...!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error...!" });
  }
});

module.exports = router;
