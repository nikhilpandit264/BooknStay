// const Listing = require("../models/listing")
// module.exports.index = async (req, res) => {
//   try {
//     const search = req.query.search || ""; // get search query

//     if (search) {
//       // Find all listings matching the location
//       const listings = await Listing.find({ location: search });

//       if (listings.length === 1) {
//         // Only one listing, redirect to its page
//         return res.redirect(`/listings/${listings[0]._id}`);
//       } else if (listings.length > 1) {
//         // Multiple listings, render filtered page
//         return res.render("listings/index.ejs", { allListings: listings, search });
//       } else {
//         // No listings found
//         req.flash("error", "No listings found for that location");
//         return res.redirect("/listings");
//       }
//     }

//     // If no search query, show all listings
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings, search });
//   } catch (err) {
//     console.error(err);
//     req.flash("error", "Something went wrong while fetching listings");
//     res.redirect("/listings");
//   }
// };




//  module.exports.renderNewForm=(req, res) => {
//   res.render("listings/new.ejs");
// }

// module.exports.showListing =async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id)
//     .populate({
//       path:"reviews",
//     populate:{
//       path:"author",
//     },
//     })
//     .populate("owner");
//     if(!listing){
//           req.flash("error", "listing you requested that does not exist ")
//         return   res.redirect("/listings");
//     }
//     console.log(listing);
//     res.render("listings/show.ejs", { listing });
//   };
  
//   // module.exports.createListing =async (req, res) => {
//   //     let url =req.file.path;
//   //     let filename =req.file.filename;
    
//   //     const newListing = new Listing(req.body.listing);
//   //     newListing.owner =req.user._id;
//   //     newListing.image = {url,filename};
//   //     await newListing.save();
//   //     req.flash("success", "New Listing Created")
//   //     res.redirect("/listings");
//   //   }

//   module.exports.createListing = async (req, res, next) => {
//   try {
//     const listing = new Listing(req.body.listing);

//     if (req.file) {
//       listing.image = {
//         url: req.file.path,
//         filename: req.file.filename
//       };
//     } else {
//       console.warn("⚠️ No file uploaded (req.file undefined)");
//     }

//     listing.owner = req.user._id;
//     await listing.save();

//     req.flash("success", "New Listing Created!");
//     res.redirect(`/listings/${listing._id}`);
//   } catch (err) {
//     next(err); // send error to app.js logger
//   }
// };

//     module.exports.renderEditForm = async (req, res) => {
//         let { id } = req.params;
//         const listing = await Listing.findById(id);
//         if(!listing){
//               req.flash("error", "listing you requested that does not exist ")
//             return   res.redirect("/listings");
//         }
//         let originalimageUrl= listing.image.url;
//          originalimageUrl=  originalimageUrl.replace("/upload","/upload/w_250")
//         res.render("listings/edit.ejs", { listing,   originalimageUrl });
//       }

//     module.exports.updateListing=async (req, res) => {
//     let { id } = req.params;
//     let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // deconstruct krte hai individual value me
//     if(typeof req.file != "undefined"){
//     let url =req.file.path;
//       let filename =req.file.filename;    
//       listing.image ={url,filename};
//       await listing.save();
//       }
//     req.flash("success", "Listing Updated")
//     res.redirect(`/listings/${id}`);
//   }

//   module.exports.destroyListing=async (req, res) => {
//       let { id } = req.params;
//       let deletedListing = await Listing.findByIdAndDelete(id);
//       // console.log(deletedListing);
//           req.flash("success", " Listing Deleted")
  
//       res.redirect("/listings");
//     }


const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  try {
    const search = req.query.search || ""; // search query
    const category = req.query.category || ""; // category query

    let filter = {};

    // If search is present, filter by location
    if (search) {
      filter.location = search;
    }

    // If category is present, filter by category
    if (category) {
      filter.category = category;
    }

    const listings = await Listing.find(filter);

    if (search && listings.length === 1) {
      // If searching and only one result → redirect to its page
      return res.redirect(`/listings/${listings[0]._id}`);
    }

    if (search && listings.length === 0) {
      req.flash("error", "No listings found for that location");
      return res.redirect("/listings");
    }

    // Render all filtered listings
    res.render("listings/index.ejs", { 
      allListings: listings, 
      search, 
      selectedCategory: category || null // ✅ pass to views for highlighting icons
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while fetching listings");
    res.redirect("/listings");
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  try {
    const listing = new Listing(req.body.listing);

    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    listing.owner = req.user._id;
    await listing.save();

    req.flash("success", "New Listing Created!");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    next(err);
  }
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested does not exist");
    return res.redirect("/listings");
  }

  let originalimageUrl = listing.image.url;
  originalimageUrl = originalimageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalimageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
