import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, InternalServerErrorException, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/utils/guards/jwt-auth.guard';
import { AdminGuard } from 'src/utils/guards/admin.guard';
import { ResponseInterceptor } from 'src/utils/interceptor/response.interceptor';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('products')
@UseInterceptors(ResponseInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post("addProduct")
  @UseGuards(JwtAuthGuard, AdminGuard)
   @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product created successfully.' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
  async addProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const result = await this.productsService.createProduct(createProductDto);
      return { msg: "products added  successfully" };
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }

  }

  @Get("get")
  async getAllProducts(@Query() query: any) {
    try {
      const { page = 1, limit = 10 } = query;
      const result = await this.productsService.getAllProducts({ page, limit });
      return { msg: "products fetch  successfully", data: result };
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Something went wrong');
    }

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
