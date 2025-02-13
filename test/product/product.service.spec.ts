import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../../src/product/product.service';
import { getModelToken } from '@nestjs/sequelize';
import { Product } from '../../src/product/product.entity';
import { HttpException } from '@nestjs/common';

const mockProduct = { id: '1', name: 'Test Product', type: 'Test Type' };

const mockProductModel = {
  findAll: jest.fn().mockResolvedValue([mockProduct]),
  create: jest.fn().mockResolvedValue(mockProduct),
  destroy: jest.fn().mockResolvedValue(1),
  findOne: jest.fn().mockResolvedValue(mockProduct),
};

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    await expect(service.getAllProducts()).resolves.toEqual([mockProduct]);
    expect(mockProductModel.findAll).toHaveBeenCalledTimes(1);
  });

  it('should add a product', async () => {
    await expect(service.addProduct(mockProduct)).resolves.toEqual(mockProduct);
    expect(mockProductModel.create).toHaveBeenCalledWith(mockProduct);
  });

  it('should delete a product', async () => {
    await expect(service.deleteProduct('1')).resolves.toBe(1);
    expect(mockProductModel.destroy).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should find a product by id', async () => {
    await expect(service.findById('1')).resolves.toEqual(mockProduct);
    expect(mockProductModel.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('should throw an error if database error occurs', async () => {
    mockProductModel.findAll.mockRejectedValue(new Error('DB Error'));
    await expect(service.getAllProducts()).rejects.toThrow(Error);
  });
});
