const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

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
app.use(express.json());

// Get Product list
app.get('/produtos', (req, res) => {
    res.json(lista_produtos);
});

//Get Product ID
app.get('/produtos/:id', (req, res) => {
    let id = Number.parseInt(req.params.id);
    let idx = lista_produtos.produtos.findIndex((elem) => elem.id == id);
    if (idx > -1) {
        res.json(lista_produtos.produtos[idx]);
    } else {
        res.status(404).json({message: "Product not found"});
    }
});

// Add a new product
app.post('/produtos', (req, res) => {
    const productInfo = req.body;
    lista_produtos.produtos.push(productInfo);
    res.status(201).json({message:"New product added!", details: productInfo});
});

// Update Product details
app.put('/produtos/:id', (req, res) => {
    let id = Number.parseInt(req.params.id);
    let changes = req.body;
    let idx = lista_produtos.produtos.findIndex((elem) => elem.id == id);
    if (idx > -1) {
        lista_produtos.produtos[idx] = changes;
        res.status(200).json({message:"Product updated", details: lista_produtos.produtos[idx]});
    }
});


// Delete a Product
app.delete('/produtos/:id', (req, res) => {
    let id = Number.parseInt(req.params.id);
    let idx = lista_produtos.produtos.findIndex((elem) => elem.id == id);
    if (idx > -1) {
        let removeProduct = lista_produtos.produtos.splice(idx, 1);
        res.status(200).json({message:"Product deleted!", details: removeProduct});
    }
});


