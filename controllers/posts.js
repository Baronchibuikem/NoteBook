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

export const getCategory = async (req, res, next) => {
  const { userId } = req.userData;
  try {
    const userCategories = await Category.find({ user: userId });
    return res.status(200).json({
      data: userCategories,
    });
  } catch (error) {
    return next({
      error: error,
    });
  }
};

// get a post by Id for the current logged in user
export const getUserPostbyId = async (req, res, next) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const post = await Post.findOne({ owner: userId })
      .populate({
        path: "category",
        select: { name: 1 },
      })
      .populate({
        path: "owner",
        select: { firstName: 1, lastName: 1 },
      });
    console.log(post);
    if (!post) {
      return res.status(500).json({
        message: "No post found",
      });
    }
    return res.status(200).json({
      data: post,
    });
  } catch (error) {
    return next({
      error: error,
    });
  }
};

export const deletePost = async (req, res, next) => {
  const { userId } = req.userData;
  const { id } = req.params;
  console.log(id);
  try {
    const post = await Post.findOne({ _id: id });
    if (!post) {
      return res.status(500).json({
        message: "No post found",
      });
    }
    if (post.owner.toString() !== userId) {
      res.status(401).json({ notauthourized: "user not authourized" });
    }
    post.remove();
    res.status(200).json({ success: true });
  } catch (error) {
    return next({
      error: error,
    });
  }
};
