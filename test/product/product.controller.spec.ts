import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../src/product/product.controller';
import { ProductService } from '../../src/product/product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  const mockProductService = {
    getAllProducts: jest.fn(() => [{ id: '1', name: 'Test Product' }]),
    addProduct: jest.fn(),
    deleteProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should return all products', () => {
    expect(controller.getAllProducts()).toEqual([{ id: '1', name: 'Test Product' }]);
    expect(productService.getAllProducts).toHaveBeenCalled();
  });

  it('should call addProduct with provided product', () => {
    const product = { name: 'New Product' };
    controller.addProduct(product);
    expect(productService.addProduct).toHaveBeenCalledWith(product);
  });

  it('should call deleteProduct with provided ID', () => {
    const productId = '1';
    controller.deleteProduct(productId);
    expect(productService.deleteProduct).toHaveBeenCalledWith(productId);
  });
});
