const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getAllProducts() {
    let products = await fs.promises.readFile(this.path, `utf-8`);
    let productsParse = JSON.parse(products);
    console.log(productsParse);
  }

  async deleteProduct(id) {
    let products = await fs.promises.readFile(this.path, `utf-8`);
    let productsParse = JSON.parse(products);

    const newArray = productsParse.filter((field) => {
      return field.id !== id;
    });
    //console.log(newArray);

    await fs.promises.writeFile(
      `./productos.json`,
      JSON.stringify(newArray, null, 2),
      `utf-8`
    );
    console.log("Producto eliminado");
  }

  async updateProduct(id, nuevaInfo) {
    let products = await fs.promises.readFile(this.path, `utf-8`);
    let productsParse = JSON.parse(products);

    let arrayUpdate = productsParse.map((field) => {
      if (field.id == id) {
        return { ...field, stock: nuevaInfo.stock };
      } else {
        return field;
      }
    });

    await fs.promises.writeFile(
      `./productos.json`,
      JSON.stringify(arrayUpdate, null, 2),
      `utf-8`
    );
    console.log("Producto actualizado");
  }
}

let nuevoProducto = new ProductManager(`./productos.json`);

nuevoProducto.deleteProduct(3);

nuevoProducto.updateProduct(1, { stock: 100 });

//nuevoProducto.updateProduct(2, { price: 1000 });

//nuevoProducto.updateProduct(3, { title: "Test Product 3 bis" });

nuevoProducto.getAllProducts();


