const checkAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect("/dashboard")
    }
    next();
};

export default checkAuthenticated