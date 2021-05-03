import Category from "../models/Category";
import Post from "../models/Post";

// for getting all the post the current logged in user created
export const getAllCurrentUserPost = async (req, res, next) => {
  const { userId } = req.userData;
  try {
    const getPosts = await Post.find({ owner: userId })
      .sort({ date: 1 })
      .populate({ path: "category", select: { name: 1 } })
      .populate({ path: "owner", select: { firstname: 1, lastname: 1 } });
    return res.status(200).json({
      message: "success",
      data: getPosts,
    });
  } catch (error) {
    return next({
      error: error,
    });
  }
};

// for adding a new post
export const addPost = async (req, res, next) => {
  const { text, name, category, owner } = req.body;

  try {
    const newPost = await Post.create({
      text: text,
      name: name,
      owner: owner,
      category: category,
    });
    return res.status(201).json({
      message: "successfully added new post",
      data: newPost,
    });
  } catch (error) {
    return next({
      error: error,
    });
  }
};

// for adding a new category
export const addCategory = async (req, res, next) => {
  const { name } = req.body;
  const { userId } = req.userData;

  try {
    const newCategory = await Category.create({
      user: userId,
      name: name,
    });
    return res.status(201).json({
      message: "successfully added new post",
      data: newCategory,
    });
  } catch (error) {
    return next({
      error: error,
    });
  }
};

// // For fetching post created by the logged in user
// router.get(
//   "/category",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const userId = req.user._id;
//     try {
//       response = await Category.find({ user: userId });
//       res.json(response);
//     } catch (error) {
//       res.status(404).json({
//         PostsNotFound: "Couldn't get all all category from the database",
//       });
//     }
//   }
// );

// // @route   GET api/posts/:id
// // @desc    Get single post post
// // @access  Public
// router.get(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Post.findOne({ owner: req.user.id })
//       // .then((post) => {
//       //   console.log(post);
//       // })
//       // for getting the name of the user from the list of comments posted
//       .populate({
//         path: "category",
//         select: { name: 1 },
//       })
//       .populate({
//         path: "owner",
//         select: { firstName: 1, lastName: 1 },
//       })
//       .then((post) => {
//         if (post) {
//           res.json(post);
//         } else {
//           res.status(404).json({ nopostfound: "No post found with that ID" });
//         }
//       })
//       .catch((err) =>
//         res
//           .status(404)
//           .json({ PostNotFound: "Couldn't get the requested post" })
//       );
//   }
// );

// // For deleting a post
// router.delete(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     // here we get the post by id created by the user
//     Post.findOne({ owner: req.user.id })
//       .then((post) => {
//         // We confirm that the post owner id is equal to the id of the user making the request
//         if (post.owner.toString() !== req.user.id) {
//           res.status(401).json({ notauthourized: "user not authourized" });
//         }
//         // We remove the post from the database
//         post.remove();
//         res.status(200).json({ success: true });
//       })
//       .catch((err) =>
//         res.status(404).json("Couldn't find the post on the server")
//       );
//   }
// );

// module.exports = router;
