import { Request, Response } from "express";
import { TradeService } from "../services/Trade.service";

export class TradeController {
    tradeService: TradeService
    constructor(tradeService: TradeService) {
        this.tradeService = tradeService;
    }

    create = async (req:Request,res:Response) => {
        console.log(req.body);
        
        try {
                const result = await this.tradeService.create(req.body)
                res.send(result)
            
        } catch (error) {
            console.log(error);
            
        }
    } 
}