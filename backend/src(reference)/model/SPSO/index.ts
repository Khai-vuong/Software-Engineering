/* eslint-disable @typescript-eslint/no-explicit-any */
import { SPSO } from '@prisma/client'
import prisma from '../../client'

export async function createSPSO(spso: SpsoCreateParams) {
  try {
    return await prisma.sPSO.create({
      data: spso
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('SPSO with this email already exists')
    }
    throw error
  }
}

export async function getSPSOById(id: string) {
  return await prisma.sPSO.findUnique({
    where: { id }
  })
}

export async function getSPSOByEmail(email: string) {
  return await prisma.sPSO.findUnique({
    where: { email }
  })
}

export async function updateSPSO(id: string, spso: SPSO) {
  return await prisma.sPSO.update({
    where: { id },
    data: spso
  })
}

export async function deleteSPSO(id: string) {
  return await prisma.sPSO.delete({
    where: { id }
  })
}
