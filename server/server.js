const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')
app.use(cors())

const hostname = '127.0.0.1'
const port = 3000

const _products = JSON.parse(fs.readFileSync('product.json'))

let _cartProducts = JSON.parse(fs.readFileSync('cart.json'))

app.use(express.json())
app.get('/products', (req, res) => {
    res.status(200).json(_products)
})

app.get('/cartProducts', (req, res) => {
    res.status(200).json(_cartProducts)
})

function checkID(data) {
    console.log(data.id)
    let index = _cartProducts.findIndex(item => item.id === data.id)
    console.log(index)
    index >= 0 ? _cartProducts[index].count++ : _cartProducts.push({ ...data, count: 1 })
}

app.post('/updateCartProducts', (req, res) => {

    let data = req.body.product
    checkID(data)
    fs.writeFileSync('cart.json', JSON.stringify(_cartProducts))
    res.status(200).json(data)
})

app.post('/checkout', (req, res) => {

    res.status(200).json({
        success: Math.random() > 0.5
    })
})

app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`)
})