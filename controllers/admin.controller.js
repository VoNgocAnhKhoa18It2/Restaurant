const User = require('../models/user.model')
const Food = require('../models/food.model')

module.exports = {
    // Show doashboard
    index: (req, res) => {
        const status = req.session.status
        if (status != undefined) req.session.status = undefined
        console.log(res.locals.user);
        res.render('pageAdmin/home',{
            title: 'Admin | Home',
            status: status,
            user: res.locals.user
        })
    },

    // show user
    user: async (req, res) => {
        const status = req.session.status
        if (status != undefined) req.session.status = undefined
        const users = await User.find();
        res.render('pageAdmin/users',{
            title: 'Admin | User',
            status: status,
            user: res.locals.user,
            users: users
        })
    },

    //add user
    addUser: async (req, res) => {
        const userReq = req.body;
        var checkuser = await User.findOne({email: userReq.email});
        if (checkuser == null) {
			await new User(userReq).save()
            req.session.status = "Thêm Thành Công"
		} else {
            req.session.status = "Thêm Thất Bại. Email tồn tại"
		}

        res.redirect("/admin/users");
    },

    // edit user
    editUser: async (req, res) => {
        const filter = { _id: req.body.edit };
        const update = {
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
        };
        var checkuser = await User.findOne({email: req.body.email});
        
        if (checkuser == null) {
            let doc = await User.updateOne(filter, update);
            if (doc.ok == 1) {
                req.session.status = "Sửa Thành Công"
            } else {
                req.session.status = "Sửa Thất Bại."
            }
		} else {
            req.session.status = "Thêm Thất Bại. Email tồn tại"
		}

        res.redirect("/admin/users");
    },

    //delete user
    deleteUser: async (req, res) => {
        const _id = req.params.id;
        const doc = await User.deleteOne({ _id: _id });
        if (doc.ok == 1) {
            res.send(true);
        } else {
            res.send(false);
        }
    }, 

    //show food
    food: async (req, res) => {
        const status = req.session.status
        if (status != undefined) req.session.status = undefined
        const foods = await Food.find();
        res.render('pageAdmin/foods',{
            title: 'Admin | Food',
            status: status,
            user: res.locals.user,
            foods: foods
        })
    },

    //add food
    addFood: (req, res) => {
        let img = req.files.image
        img.mv("./public/images/"+img.name, async (err) =>{
            if (err) throw err;

            const food = {
                name: req.body.name,
                image: img.name,
                price: req.body.price,
            }

            await new Food(food).save()
            req.session.status = "Thêm Thành Công"
            res.redirect("/admin/foods")
        })
    },

    editFood: async (req, res) => {
        const filter = { _id: req.body.edit };
        var update = {}
        if (req.files == null) {
            update.name = req.body.name
            update.image = req.body.img,
                update.price = req.body.price
        } else {
            let img = req.files.image
            const err = await img.mv("./public/images/" + img.name)
            if (err) return err
            update.name = req.body.name
            update.image = img.name
            update.price = req.body.price
        }

        let doc = await Food.updateOne(filter, update);
        if (doc.ok == 1) {
            req.session.status = "Sửa Thành Công"
        } else {
            req.session.status = "Sửa Thất Bại."
        }
        res.redirect("/admin/foods")
    },

    //delete food
    deleteFood: async (req, res) => {
        const _id = req.params.id;
        const doc = await Food.deleteOne({ _id: _id });
        if (doc.ok == 1) {
            res.send(true);
        } else {
            res.send(false);
        }
    }
}