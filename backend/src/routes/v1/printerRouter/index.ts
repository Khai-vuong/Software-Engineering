import express from 'express'
import {
  createPrinterController,
  deletePrinterController,
  getAllPrintersController,
  getPrinterController,
  updatePrinterController
} from '../../../controllers/printerController'

export const printerRouter = express.Router()

printerRouter.get('/all', getAllPrintersController)
printerRouter.get('/:id', getPrinterController)
printerRouter.post('/', createPrinterController)
printerRouter.put('/', updatePrinterController)
printerRouter.delete('/', deletePrinterController)
