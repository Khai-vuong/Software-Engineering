/* eslint-disable @typescript-eslint/no-explicit-any */
import { Location } from '@prisma/client'
import prisma from '../../client'

interface LocationCreateParams {
  campusName: string
  buildingName: string
  roomNumber: string
}
export async function createLocation(location: LocationCreateParams) {
  try {
    return await prisma.location.create({
      data: location
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('Location already exists')
    }
    throw error
  }
}

export async function getLocationById(id: string) {
  return await prisma.location.findUnique({
    where: { id }
  })
}

export async function getAllLocations() {
  return await prisma.location.findMany()
}

export async function updateLocation(id: string, location: Location) {
  return await prisma.location.update({
    where: { id },
    data: location
  })
}

export async function deleteLocation(id: string) {
  return await prisma.location.delete({
    where: { id }
  })
}
