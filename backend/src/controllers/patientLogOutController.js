const logOutController = {};

logOutController.logout = async (req, res) =>{
    res.clearCookie("authToken");
    return res.status(200).json({message: "LogOut Exitoso"})
}

export default logOutController;