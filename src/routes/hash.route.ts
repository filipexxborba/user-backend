import express, { Request, Response } from "express";
const router = express.Router();

// Models
import { HashModel } from "../models/hash.model";

// Util
import { formatDate } from "../utils/dateFormate";
import { generateNewHashcode } from "../utils/hashGen";
import { IHashDocument } from "../@types/hash.type";

router.get("/", (_, res: Response) => {
   HashModel.find({}, (error: Error, hash: IHashDocument[]) => {
      if (error) res.status(500).send(error);
      if (!error) res.status(200).send(hash[0]);
   });
});

// Route to create a new hashcode
router.get("/create", (_, res: Response) => {
   const newHash = new HashModel({
      hashcode: generateNewHashcode(),
      date: new Date(),
   });
   newHash
      .save()
      .then((hashcode) => res.status(200).send(hashcode))
      .catch((error) => res.status(500).send(error));
});

// Verify hashcode route
router.post("/verify", (req: Request, res: Response) => {
   const { verify, date } = req.body;
   const dateParse = new Date(date);
   console.log(verify, date, dateParse);
   HashModel.findOne({}, (error: Error, currently: IHashDocument) => {
      if (error) res.status(500).send(error);
      if (!error) {
         // If body date !== hashdate and the hashcode are the same of the previously date, gen new hashcode
         if (
            formatDate(dateParse) !== formatDate(currently.date) &&
            verify === currently.hashcode
         ) {
            const newHashcode = generateNewHashcode();
            currently.hashcode = newHashcode;
            currently.date = new Date();
            currently.save().then((hash) =>
               res.status(200).send(
                  JSON.stringify({
                     status: false,
                  })
               )
            );
         }

         //   If body date === today and the hashcode aren't the same
         if (
            formatDate(dateParse) === formatDate(currently.date) &&
            verify !== currently.hashcode
         )
            res.status(200).send(
               JSON.stringify({
                  status: false,
               })
            );

         // If are everyone ok
         if (
            formatDate(dateParse) === formatDate(currently.date) &&
            verify === currently.hashcode
         )
            res.status(200).send(
               JSON.stringify({
                  status: true,
               })
            );
      }
   });
});

export default router;
