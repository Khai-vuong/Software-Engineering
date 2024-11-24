/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../client'

interface ConfigCreateParams {
  defaultPageBalance: number
  semesterStartDate: Date
}
export async function createConfig(config: ConfigCreateParams) {
  try {
    return await prisma.config.create({
      data: config
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('Config already exists')
    }
    throw error
  }
}

export async function getConfigById(id: string) {
  return await prisma.config.findUnique({
    where: { id }
  })
}

export async function getAllConfigs() {
  return await prisma.config.findMany({
    include: { fileTypes: true }
  })
}

export async function updateConfig(id: string, config: ConfigCreateParams) {
  return await prisma.config.update({
    where: { id },
    data: config
  })
}

export async function deleteConfig(id: string) {
  return await prisma.config.delete({
    where: { id }
  })
}
