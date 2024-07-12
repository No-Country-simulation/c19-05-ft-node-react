import { Request, Response } from "express";
import { TradeService } from "../services/Trade.service";

export class TradeController {
    tradeService: TradeService
    constructor(tradeService: TradeService) {
        this.tradeService = tradeService;
    }

    create = async (req:Request,res:Response) => {
        // desestructurar de una
        let {members, duration} = req.body;
        duration = duration * 24 * 60 * 60 * 1000;

        try {
                const result = await this.tradeService.create({members, duration},req.user!);
                res.send(result)
            
        } catch (error) {
            console.log(error);
            
        }
    } 
}