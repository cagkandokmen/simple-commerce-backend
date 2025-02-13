import { Test, TestingModule } from '@nestjs/testing';
import { BasketController } from '../../src/basket/basket.controller';
import { BasketService } from '../../src/basket/basket.service';
import { ProductService } from '../../src/product/product.service';

describe('BasketController', () => {
  let basketController: BasketController;
  let basketService: BasketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasketController],
      providers: [
        {
          provide: BasketService,
          useValue: {
            getBasket: jest.fn().mockResolvedValue([]),
            addItemToBasket: jest.fn().mockResolvedValue({}),
            deleteItem: jest.fn().mockResolvedValue(1),
          },
        },
        {
          provide: ProductService,
          useValue: {},
        },
      ],
    }).compile();

    basketController = module.get<BasketController>(BasketController);
    basketService = module.get<BasketService>(BasketService);
  });

  it('should be defined', () => {
    expect(basketController).toBeDefined();
  });

  describe('getBasket', () => {
    it('should return a basket for a given userId', async () => {
      await expect(basketController.getBasket('123')).resolves.toEqual([]);
      expect(basketService.getBasket).toHaveBeenCalledWith('123');
    });
  });

  describe('addItemToBasket', () => {
    it('should add an item to the basket', async () => {
      await expect(
        basketController.addItemToBasket('123', { productId: '456' })
      ).resolves.toEqual({});
      expect(basketService.addItemToBasket).toHaveBeenCalledWith('123', '456');
    });
  });

  describe('deleteProduct', () => {
    it('should delete an item from the basket', async () => {
      await expect(
        basketController.deleteProduct('123', '456')
      ).resolves.toBeUndefined();
      expect(basketService.deleteItem).toHaveBeenCalledWith('123', '456');
    });
  });
});