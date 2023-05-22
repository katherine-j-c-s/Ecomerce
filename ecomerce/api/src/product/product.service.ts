import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
    products = []
    async getAllProducts() {
        return this.products;
      }
    
      async getProductById(id: string) {
        const product = this.products.find((product) => product.id === id);
    
        if (!product) {
          throw new NotFoundException();
        } else {
          return product;
        }
      }
    
      async getProductByName(productName: string) {
        const product = this.products.find((product) => product.name === productName);
    
        if (!product) {
          throw new NotFoundException();
        } else {
          return product;
        }
      }
    
      async deleteProduct(id: string) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
          this.products.splice(index, 1);
        }
    
        return { id };
      }
}
