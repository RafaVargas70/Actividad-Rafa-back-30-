const logoutController = {};

logoutController.logout = async (req, res) => {

  res.clearCookie("authToken");

  res.json({ message: "Cerrado de sesion exitoso" });
};

export default logoutController;
