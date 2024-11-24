import express from 'express'
import {
  createLocationController,
  deleteLocationController,
  getAllLocationsController,
  getLocationController,
  updateLocationController
} from '../../../controllers/locationController'

export const locationRouter = express.Router()

locationRouter.get('/all', getAllLocationsController)
locationRouter.get('/:id', getLocationController)
locationRouter.post('/', createLocationController)
locationRouter.put('/', updateLocationController)
locationRouter.delete('/', deleteLocationController)
