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


app.post('/addCartProducts', (req, res) => {
    let index = checkID(req.body.product.id)
    let data = updateCartProducts(index, req.body.product)
    // console.log('data')
    // console.log(data)
    fs.writeFileSync('cart.json', JSON.stringify(_cartProducts))
    res.status(200).json(data)
})

app.post('/deleteCartProducts', (req, res) => {
    let index = checkID(req.body.id)
    _cartProducts.splice(index, 1)
    fs.writeFileSync('cart.json', JSON.stringify(_cartProducts))
    res.status(200).json({ index: index })
})

app.post('/updateCartProducts', (req, res) => {
    // console.log(req.body)
    let index = checkID(req.body.id)
    let result = { index: index, data: {} }
    if (req.body.type === 'count') {
        _cartProducts.splice(index, 1, { ..._cartProducts[index], count: req.body.count, totalPrice: fomatFloat(_cartProducts[index].price * req.body.count, 2) })
        result.data = _cartProducts[index]
    } else if (req.body.type === 'checked') {
        if (req.body.isAllProduct) {
            _cartProducts.forEach(item => {
                item.checked = req.body.checked
            })
            result.data = _cartProducts
        } else {
            _cartProducts.splice(index, 1, { ..._cartProducts[index], checked: req.body.checked })
            result.data = _cartProducts[index]
        }
    }
    fs.writeFileSync('cart.json', JSON.stringify(_cartProducts))
    res.status(200).json(result)
})




app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`)
})


function checkID(id) {
    let index = _cartProducts.findIndex(item => item.id === id)
    return index
}


function updateCartProducts(index, data) {
    index >= 0 ? _cartProducts[index].count++ : _cartProducts.push({ ...data, count: 1, checked: true })
    _cartProducts.forEach(item => item.totalPrice = fomatFloat(item.count * item.price, 2))
    return index >= 0 ? _cartProducts[index] : _cartProducts[_cartProducts.length - 1]
}

/**
 * 保留两位小数,浮点数四舍五入,位数不够不补0
 * @param {*} src 
 * @param {*} pos 
 */
function fomatFloat(src, pos) {
    return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}