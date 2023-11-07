const Organization = require("../model/orgmodel.js");
const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { OrgName, Address, ContactNo } = req.body;

    const newOrganization = new Organization({ OrgName, Address, ContactNo });
    const savedOrganization = await newOrganization.save();

    res.status(201).json(savedOrganization);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while registering the organization" });
  }
});
const controller = require("../controller/controller.js");
router.route("/Organization").get(controller.index);

router
  .route("/name/:OrgName")
  .get(controller.view)
  .patch(controller.update)
  .put(controller.update)
  .delete(controller.Delete);
module.exports = router;

module.exports = router;