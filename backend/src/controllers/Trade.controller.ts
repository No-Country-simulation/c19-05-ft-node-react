import { Request, Response, NextFunction } from "express";
import { TradeService } from "../services/Trade.service";
import { InternalServerError } from "../utils/errors/InternalServerError";

export class TradeController {
  tradeService: TradeService;
  constructor(tradeService: TradeService) {
    this.tradeService = tradeService;
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    // desestructurar de una
    let { members, duration } = req.body;
    duration = duration * 24 * 60 * 60 * 1000;

    try {
      const result = await this.tradeService.create(
        { members, duration },
        req.user!
      );
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  updateAccepted = async (req: Request, res: Response, next: NextFunction) => {
    const { tradeId } = req.params;
    const user = req.user!;

    try {
      const result = await this.tradeService.updateAccepted(user, tradeId);
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { tradeId } = req.params;
    const user = req.user!;
    try {
      const result = await this.tradeService.deleteTrade(user, tradeId);
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction) => {
    const { tradeId } = req.params;
    const user = req.user!;
    try {
      const result = await this.tradeService.findOne(user, tradeId);
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
      return next(new InternalServerError());
    }
  };

  findTrades = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;

    try {
      const result = await this.tradeService.findTrades(user._id);
      res.send(result);
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }

      return next(new InternalServerError());
    }
  };
}
