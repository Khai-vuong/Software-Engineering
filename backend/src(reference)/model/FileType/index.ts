/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../client'

interface FileTypeCreateParams {
  type: string
  configId: string
}
export async function createFileType(fileType: FileTypeCreateParams) {
  try {
    return await prisma.fileType.create({
      data: fileType
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('FileType already exists')
    }
    throw error
  }
}

export async function createManyFileTypes(fileTypes: FileTypeCreateParams[]) {
  try {
    return await prisma.fileType.createMany({
      data: fileTypes
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('FileType already exists')
    }
    throw error
  }
}

export async function getFileTypeById(id: string) {
  return await prisma.fileType.findUnique({
    where: { id }
  })
}

export async function getAllFileTypes() {
  return await prisma.fileType.findMany()
}

export async function updateFileType(id: string, fileType: FileTypeCreateParams) {
  return await prisma.fileType.update({
    where: { id },
    data: fileType
  })
}

export async function deleteFileType(id: string) {
  return await prisma.fileType.delete({
    where: { id }
  })
}

export async function deleteAllFileTypes() {
  return await prisma.fileType.deleteMany({})
}
