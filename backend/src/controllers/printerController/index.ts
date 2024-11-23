import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { HttpStatus } from '../../lib/statusCode'
import { createPrinter, deletePrinter, getAllPrinters, getPrinterById, updatePrinter } from '../../model/Printer'

export const createPrinterController = expressAsyncHandler(async (req: Request, res: Response) => {
  const printer = await createPrinter(req.body)
  res.status(HttpStatus.Created).json(printer)
})

export const getPrinterController = expressAsyncHandler(async (req: Request, res: Response) => {
  // Get printer
  const printerId = req.params.id
  const printer = await getPrinterById(printerId)
  res.status(HttpStatus.OK).json(printer)
})

export const getAllPrintersController = expressAsyncHandler(async (req: Request, res: Response) => {
  // Get all printers
  const printers = await getAllPrinters()
  res.status(HttpStatus.OK).json(printers)
})

export const updatePrinterController = expressAsyncHandler(async (req: Request, res: Response) => {
  // Update printer
  const printer = await updatePrinter(req.body.id, req.body)
  res.status(HttpStatus.OK).json(printer)
})

export const deletePrinterController = expressAsyncHandler(async (req: Request, res: Response) => {
  // Delete printer
  await deletePrinter(req.body.id)
  res.status(HttpStatus.NoContent).send()
})
