var express = require('express');
var router = express.Router();
var grocery_model=require('../models/query')

// GET Homepage
router.get('/', async(req, res) => {
  let groceries = await grocery_model.get_all_grocery()
  let price = await grocery_model.get_grocery_count()
  if(groceries) {
    res.render('index', {
      title: "Grocery List",
      groceries: groceries,
      price: price
    })
  } else {
    res.render('404')
  }
});

// GET Posts
router.get('/groceries', async (req, res) => {
  res.redirect('/')
})


router.get('/delete/:id',async(req,res)=>{
  let id=req.params.id
  let result= await grocery_model.delete_grocery_by_id(id)
  if(result){
    res.redirect('/')
  }else{
    res.send({msg:"Something went wrong."})
  }
})

router.post('/add',async(req,res)=>{
  let name=req.body.name
  let imgUrl=req.body.imgUrl
  let quantity=req.body.quantity
  let cost=req.body.cost

  let added=await grocery_model.add_grocery(name,imgUrl,quantity,cost);
  if(added){
    res.redirect('/')
  }else{
    res.send({ msg: "ERROR: Please refill form."})
  }
})

module.exports = router;



