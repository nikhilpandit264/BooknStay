const express =require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");




const validateListing = (req, res, next) => {
  let {error} = listingSchema.validate(req.body);
  if (error) {
    let errMsg =error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }
};

// Index Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

// New Routes 
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show Routs

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
          req.flash("error", "listing you requested that does not exist ")
        return   res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  })
);


// Create routes 

router.post(
  "/",validateListing,
  wrapAsync(async (req, res) => {
    // let result = listingSchema.validate(req.body);
    // console.log(result);
    // //  console.log("All Listings:", allListings);
    // // console.log("New Listing:", newListing);
    // if (result.error) {
    //   throw new ExpressError(400, result.error);
    // }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created")
    res.redirect("/listings");
  })
);

// Edit Routes 
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
          req.flash("error", "listing you requested that does not exist ")
        return   res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  })
);

//Update Routes
router.put(
  "/:id",validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // deconstruct krte hai individual value me
        req.flash("success", "Listing Updated")
    res.redirect(`/listings/${id}`);
  })
);

// Delete Routes

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
        req.flash("success", " Listing Deleted")

    res.redirect("/listings");
  })
);

module.exports=router;