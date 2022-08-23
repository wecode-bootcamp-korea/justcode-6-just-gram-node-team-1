const userService = require("..userService");

// signUp
const createUser = async (req, res) => {
  const { nickname, email, password, profile_image } = req.body;

  // 유효성 검사
  if (!(nickname && email && password)) {
    res.status(400).json({ message: "input error" });
    return;
  }

  try {
    const result = await userService.createUser(
      nickname,
      email,
      password,
      profile_image
    );
    res.status(201).json({ message: "userCreated" });
  } catch {
    res.status(500).json({ message: "user create Error" });
  }
};

// logIn
const logInUser = async (req, res) => {
  const { email, password } = req.body;

  // email, password 유효성 검증
  if (!(email && password)) {
    res.status(400).json({ message: "please check your email and password." });
  }

  try {
    const result = await userService.logInUser(email, password);

    if (result == 0) {
      // users 테이블에 email이 없음
      res.status(400).json({ message: "your not our member" });
    } else if (result == 1) {
      // email이 있으나 password가 틀림
      res.status(400).json({ message: "please check your passoword" });
    } else {
      // 정상적으로 login
      res.status(201).json({ Token: result });
    }
  } catch {
    // console.log(err);
    res.status(400).json({ message: "please check your email" });
  }
};

module.exports = {
  createUser,
  logInUser,
};