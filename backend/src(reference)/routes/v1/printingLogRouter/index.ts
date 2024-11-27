import express from 'express'
import {
  createPrintingLogController,
  deletePrintingLogController,
  getPrintingLogController,
  updatePrintingLogController
} from '../../../controllers/printingLogController'

export const printingLogRouter = express.Router()

printingLogRouter.get('/', getPrintingLogController)
printingLogRouter.post('/', createPrintingLogController)
printingLogRouter.put('/', updatePrintingLogController)
printingLogRouter.delete('/', deletePrintingLogController)
