import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService:ProductService) {}

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  @Get('name')
  async getProductByName(@Query('name') name: string) {
    return await this.productService.getProductByName(name);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
}
