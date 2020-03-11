const express = require("express");
const router = express.Router();
const Joi = require("joi");

const posts = [
  { id: 1, name: "post1" },
  { id: 2, name: "post2" },
  { id: 3, name: "post3" }
];

router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", (req, res) => {
  posts.push({ id: posts.length + 1, name: `post${posts.length + 1}` });
  res.send(posts);
});

router.post("/:id", (req, res) => {
  let result = validatePost(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let post = {
    id: posts.length + 1,
    name: req.body.name // 取得傳送來的name
  };

  posts.push(post); //加入課程陣列
  res.send(posts);
});

router.put("/:id", (req, res) => {
  let post = posts.find(post => post.id === parseInt(req.params.id));
  if (!post) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }

  let result = validateCourse(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  console.log(result); //檢查用，可不加
  post.name = result.value.name;
  res.send(post);
});

router.delete("/:id", (req, res) => {
  let course = courses.find(courses => courses.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }
  let index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

router.get("/:id", (req, res) => {
  let post = posts.find(courses => courses.id === parseInt(req.params.id));
  if (!post) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }
  res.send(post);
});

function validatePost(post) {
  let schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(post, schema);
}

module.exports = router;
