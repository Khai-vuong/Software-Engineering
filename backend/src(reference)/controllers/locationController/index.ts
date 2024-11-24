import { Location } from '@prisma/client'
import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { HttpStatus } from '../../lib/statusCode'
import { createLocation, deleteLocation, getAllLocations, getLocationById, updateLocation } from '../../model/Location'

export const createLocationController = expressAsyncHandler(async (req: Request, res: Response) => {
  const location = await createLocation(req.body)
  res.status(HttpStatus.Created).json(location)
})

export const getLocationController = expressAsyncHandler(async (req: Request, res: Response) => {
  // Get location
  const locationId = req.params.id
  const location = await getLocationById(locationId)
  res.status(HttpStatus.OK).json(location)
})

export const getAllLocationsController = expressAsyncHandler(async (req: Request, res: Response) => {
  // Get all locations
  const locations = await getAllLocations()
  res.status(HttpStatus.OK).json(locations)
})

export const updateLocationController = expressAsyncHandler(async (req: Request, res: Response) => {
  // Update location
  const location: Location = await updateLocation(req.body.id, req.body)
  res.status(HttpStatus.OK).json(location)
})

export const deleteLocationController = expressAsyncHandler(async (req: Request, res: Response) => {
  // Delete location
  await deleteLocation(req.body.id)
  res.status(HttpStatus.NoContent).send()
})
