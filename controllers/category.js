const Category = require('../models/category');
const router = require('../routes/category');

exports.getCategoryById = (req, res, next, id) => {

    Category.findById(id)
        .then(categ => {
            req.category = categ
            next();
        })
        .catch(err => {
            return res.status(400).json({
                Error: "Category not found"
            })
        })
    
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save()
    .then(category => {
        res.json(category)
    })
    .catch(err => {
        return res.status(400).json({
            err: "Unable to save category" 
        })
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category)
}

exports.getAllCategories = (req, res) => {
    Category.find().exec((err, categories) =>{
        if(err){
            return res.status(400).json({
                error: "No category found"
            })
        }
        res.json(categories)
    })
}

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name

    category.save().exec((err, updatedCategory) => {
        if(err) {
            return res.status(400).json({
                error: "Failed to update category"
            })
        }
        res.json(updatedCategory);
    })
}

exports.removeCategory = (req, res) => {
    const category = req.category;
  
    category.remove((err, category) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this category"
        });
      }
      res.json({
        message: "Successfull deleted"
      });
    });
  };
  