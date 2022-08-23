const postService = require("..postService");

// 포스팅
const createPost = async (req, res) => {
  const { userID, contents, postImg_url } = req.body;

  // contents : null 가능 / postImg_url : not null
  if (!postImg_url) {
    res.status(400).json({ message: "picture" });
    return;
  }

  try {
    const result = await postService.createPost(userID, contents, postImg_url);
    res.status(201).json({ message: "postCreated" });
  } catch {
    res.status(500).json({ message: "create post error" });
  }
};

// get post-list
const getPost = async (req, res) => {
  try {
    const result = await postService.getPost();
    res.status(200).json({ data: result });
  } catch {
    res.status(500).json({ message: "get list error" });
  }
};

// get postList By userId
const getPostById = async (req, res) => {
  const { id } = req.body; 
  const result = await postService.getPostById(id);

  res.status(200).json({ data: result });
};

// post update
const updatePost = async (req, res) => {
  const { id, newContents } = req.body; // id = posts.id

  if (!id) {
    res.status(400).json({ message: "없는 post " });
  }

  if (!newContents) {
    res.status(400).json({ message: "no change" });
  }

  try {
    const updatedPostData = await postService.updatePost(id, newContents);
    res.status(200).json({ message: updatedPostData });
  } catch {
    res.status(500).json({ message: "update reject." });
  }
};

// delete post
const deletePost = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({ message: "존재하지 않는 post입니다." });
  }

  try {
    const result = await postService.deletePost(id);
    res.status(200).json({ message: "postingDeleted" });
  } catch {
    console.log(err);
    res.status(500).json({ message: "post delete error" });
  }
};

module.exports = {
  createPost,
  getPost,
  getPostById,
  updatePost,
  deletePost,
};