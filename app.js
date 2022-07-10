const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Product list
const lista_produtos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
};


app.listen(port, () => console.info(`Listening on ${ port }`));

// Get Product list
app.get('/produtos', function(req, res) {
    res.json(lista_produtos);
});

//Get Product ID
app.get('/produtos/:id', function(req, res) {
    let id = Number.parseInt(req.params.id);
    let idx = lista_produtos.produtos.findIndex((elem) => elem.id == id);
    if (idx > -1) {
        res.json(lista_produtos.produtos[idx]);
    } else {
        res.status(404).json({message: "Produto não encontrado"});
    }
});

// Add a new product
app.post('/produtos', urlencodedParser, function(req, res) {
    if (!req.body){
        res.status(404);
        res.send('Error');
    } else {
        lista_produtos.produtos.push(req.body);
        res.send(`New product details: ${req.body}`);
    }
});

// Delete a Product


