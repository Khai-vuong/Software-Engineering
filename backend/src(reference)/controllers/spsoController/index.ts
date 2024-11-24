import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { HttpStatus } from '../../lib/statusCode'
import { createSPSO, deleteSPSO, getSPSOById, updateSPSO } from '../../model/SPSO'

export const createSpsoController = expressAsyncHandler(async (req: Request, res: Response) => {
  const spso = await createSPSO(req.body)
  res.status(HttpStatus.Created).json(spso)
})

export const getSpsoController = expressAsyncHandler(async (req: Request, res: Response) => {
  // Get spso
  const spsoId = req.params.id
  const spso = await getSPSOById(spsoId)
  res.status(HttpStatus.OK).json(spso)
})

export const updateSpsoController = expressAsyncHandler(async (req: Request, res: Response) => {
  const spso = await updateSPSO(req.body.id, req.body)
  res.status(HttpStatus.OK).json(spso)
})

export const deleteSpsoController = expressAsyncHandler(async (req: Request, res: Response) => {
  // Delete spso
  await deleteSPSO(req.body.id)
  res.status(HttpStatus.NoContent).send()
})
