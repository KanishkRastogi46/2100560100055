
const express = require("express");
const axios = require("axios");

const router = express.Router();

// a route for extracting top 10 products from a particular ecommerce website
router.get('/:companyname/category/:categoryname/products', async (req,res)=>{
    let {companyname , categoryname} = req.params;      // for getting the url parameters for dynamic routing
    let {top, minPrice, maxPrice} = req.query;          // for getting all the query strings after '/products?' in url

    // extracting the data from test server using axios
    try {
        let result = await axios.get(`http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`, 
        {
            headers: {
              Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        // checking whether data is extracted from test server or not
        if (result.data) {
            let productsArr = result.data;

            // sort the product array in decreasing order of their rating
            productsArr.sort((a, b) => b.rating - a.rating);

            res.json({
                message : `Top ${top} rated ${categoryname} on ${companyname} between price range ${minPrice} & ${maxPrice}`,
                data : productsArr
            });
        }
    } catch (error) {
        
    }
})

module.exports = router;