const { request, response } = require('express');
const express = require('express');
const ProductService = require('./../service/productService');
const  validatorHandler = require('./../middlewares/validatorHandler');
const  {getProductSchema, updateProductSchema, createProductSchema } = require('./../schemas/productSchema');



const router = express.Router();
const service = new ProductService();



router.get('/', async(req, res)=>{
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res)=>{
  res.send('soy un filter')
});


router.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async(req,res, next) =>{
    try {
      const {id} = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema,'body'),
    async (req, res)=>{
        const body = req.body;
        const newProduct = await service.create(body);
        res.status(201).json(newProduct);
    }
);

router.patch('/:id',
  validatorHandler(getProductSchema,'params'),
    validatorHandler(updateProductSchema,'body'),
      async (req, res, next )=>{
        try {
          const {id} = req.params;
          const body = req.body;
          const product = await service.update(id,body);
          res.status(201).json(product);
        } catch (error) {
          next(error);
        }
      }
);
router.delete('/:id', async(req,res)=>{
  const {id} = req.params;
  const product = await service.delete(id);
    res.json(product);
});

module.exports = router;









