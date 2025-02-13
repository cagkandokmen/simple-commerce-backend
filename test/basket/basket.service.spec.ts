import { Test, TestingModule } from '@nestjs/testing';
import { BasketService } from '../../src/basket/basket.service';
import { getModelToken } from '@nestjs/sequelize';
import { Basket } from '../../src/basket/basket.entity';
import { ProductService } from '../../src/product/product.service';
import { HttpException } from '@nestjs/common';

const mockBasketModel = {
  findAll: jest.fn(),
  create: jest.fn(),
  destroy: jest.fn(),
};

const mockProductService = {
  findById: jest.fn(),
};

describe('BasketService', () => {
  let basketService: BasketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BasketService,
        { provide: ProductService, useValue: mockProductService },
        { provide: getModelToken(Basket), useValue: mockBasketModel },
      ],
    }).compile();

    basketService = module.get<BasketService>(BasketService);
  });

  it('should be defined', () => {
    expect(basketService).toBeDefined();
  });

  describe('getBasket', () => {
    it('should return basket items', async () => {
      const mockBasket = [{ userid: 'user1', productid: 'product1' }];
      mockBasketModel.findAll.mockResolvedValue(mockBasket);

      const result = await basketService.getBasket('user1');
      expect(result).toEqual(mockBasket);
      expect(mockBasketModel.findAll).toHaveBeenCalledWith({ where: { userid: 'user1' } });
    });

    it('should throw an error when db fails', async () => {
      mockBasketModel.findAll.mockRejectedValue(new Error('DB Error'));
      await expect(basketService.getBasket('user1')).rejects.toThrow(Error);
    });
  });

  describe('addItemToBasket', () => {
    it('should add an item to the basket', async () => {
      mockProductService.findById.mockResolvedValue({ id: 'product1' });
      mockBasketModel.create.mockResolvedValue({ userid: 'user1', productid: 'product1' });

      const result = await basketService.addItemToBasket('user1', 'product1');
      expect(result).toEqual({ userid: 'user1', productid: 'product1' });
      expect(mockBasketModel.create).toHaveBeenCalledWith({ userid: 'user1', productid: 'product1' });
    });

    it('should throw an error if the product is not found', async () => {
      mockProductService.findById.mockResolvedValue(null);
      await expect(basketService.addItemToBasket('user1', 'invalidProduct'))
        .rejects.toThrow(HttpException);
    });
  });

  describe('deleteItem', () => {
    it('should delete an item from the basket', async () => {
      mockProductService.findById.mockResolvedValue({ id: 'product1' });
      mockBasketModel.destroy.mockResolvedValue(1);

      const result = await basketService.deleteItem('user1', 'product1');
      expect(result).toBe(1);
      expect(mockBasketModel.destroy).toHaveBeenCalledWith({ where: { userid: 'user1', productid: 'product1' } });
    });

    it('should throw an error if the product is not found', async () => {
      mockProductService.findById.mockResolvedValue(null);
      await expect(basketService.deleteItem('user1', 'invalidProduct'))
        .rejects.toThrow(HttpException);
    });
  });
});
