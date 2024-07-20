import { Request, Response } from "express";
import { TradeService } from "../services/Trade.service";

export class TradeController {
  tradeService: TradeService;
  constructor(tradeService: TradeService) {
    this.tradeService = tradeService;
  }

  create = async (req: Request, res: Response) => {
    // desestructurar de una
    let { members, duration } = req.body;
    duration = duration * 24 * 60 * 60 * 1000;

    try {
      const result = await this.tradeService.create(
        { members, duration },
        req.user!
      );
      result.status === "success"
        ? res.send(result)
        : res.status(400).send(result);
    } catch (error) {
      console.log(error);
    }
  };

  updateAccepted = async (req: Request, res: Response) => {
    const { tradeId } = req.params;
    const user = req.user!;
    console.log(tradeId);

    try {
      const result = await this.tradeService.updateAccepted(user, tradeId);
      console.log(result);
      result.status === "success"
        ? res.send(result)
        : res.status(400).send(result);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("Error interno");
      }
    }
  };

  delete = async (req: Request, res: Response) => {
    const { tradeId } = req.params;
    const user = req.user!;

    try {
      const result = await this.tradeService.deleteTrade(user, tradeId);
      console.log("Eliminado", result);
      result.status === "success"
        ? res.send(result)
        : res.status(400).send(result);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("Error interno");
      }
    }
  };

  findOne = async (req: Request, res: Response) => {
    const { tradeId } = req.params;
    const user = req.user!;
    try {
      const result = await this.tradeService.findOne(user, tradeId);
      result.status === "success"
        ? res.send(result)
        : res.status(400).send(result);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("Error interno");
      }
    }
  };

  findTrades = async (req: Request, res: Response) => {
    const user = req.user!;

    try {
      const result = await this.tradeService.findTrades(user._id);
      result.status === "success"
        ? res.send(result)
        : res.status(400).send(result);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("Error interno");
      }
    }
  };
}
