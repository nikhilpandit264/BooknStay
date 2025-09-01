const Listing = require("../models/listing")
module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  };


 module.exports.renderNewForm=(req, res) => {
  res.render("listings/new.ejs");
}

module.exports.showListing =async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
      path:"reviews",
    populate:{
      path:"author",
    },
    })
    .populate("owner");
    if(!listing){
          req.flash("error", "listing you requested that does not exist ")
        return   res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
  };
  
  // module.exports.createListing =async (req, res) => {
  //     let url =req.file.path;
  //     let filename =req.file.filename;
    
  //     const newListing = new Listing(req.body.listing);
  //     newListing.owner =req.user._id;
  //     newListing.image = {url,filename};
  //     await newListing.save();
  //     req.flash("success", "New Listing Created")
  //     res.redirect("/listings");
  //   }

  module.exports.createListing = async (req, res, next) => {
  try {
    const listing = new Listing(req.body.listing);

    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename
      };
    } else {
      console.warn("⚠️ No file uploaded (req.file undefined)");
    }

    listing.owner = req.user._id;
    await listing.save();

    req.flash("success", "New Listing Created!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    next(err); // send error to app.js logger
  }
};

    module.exports.renderEditForm = async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
              req.flash("error", "listing you requested that does not exist ")
            return   res.redirect("/listings");
        }
        let originalimageUrl= listing.image.url;
         originalimageUrl=  originalimageUrl.replace("/upload","/upload/w_250")
        res.render("listings/edit.ejs", { listing,   originalimageUrl });
      }

    module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // deconstruct krte hai individual value me
    if(typeof req.file != "undefined"){
    let url =req.file.path;
      let filename =req.file.filename;    
      listing.image ={url,filename};
      await listing.save();
      }
    req.flash("success", "Listing Updated")
    res.redirect(`/listings/${id}`);
  }

  module.exports.destroyListing=async (req, res) => {
      let { id } = req.params;
      let deletedListing = await Listing.findByIdAndDelete(id);
      // console.log(deletedListing);
          req.flash("success", " Listing Deleted")
  
      res.redirect("/listings");
    }