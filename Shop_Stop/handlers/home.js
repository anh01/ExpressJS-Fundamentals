/**
 * Created by Toni on 5/21/2017.
 */

const fs = require('fs')
const path = require('path')
const Product = require('../models/product')



module.exports.index = (req, res) => {

      let queryData = req.query

      Product.find().populate('category').then((products) => {
        if (queryData.query) {
          products = products.filter((p) => {
            return p.name.toLowerCase().includes(queryData.query.toLowerCase())
          })
        }

        let data = {products: products}

        if (req.query.error) {
            data.error = req.query.error
        } else if (req.query.success) {

            data.success = req.query.success
        }

       res.render('home/index', data)
      })

  }

