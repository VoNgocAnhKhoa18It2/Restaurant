
module.exports = {

    home: (req, res) => {
        const status = req.session.status
        if (status != undefined) req.session.status = undefined
        console.log(res.locals.user);
        res.render('pageAdmin/home',{
            title: 'Admin | Home',
            status: status,
            user: res.locals.user
        })
    }
}