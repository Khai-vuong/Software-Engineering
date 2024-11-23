import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { HttpStatus } from '../../lib/statusCode'
import { createFileType, deleteFileType, getAllFileTypes, updateFileType } from '../../model/FileType'

export const createFileTypeController = expressAsyncHandler(async (req: Request, res: Response) => {
  const fileType = await createFileType(req.body)
  res.status(HttpStatus.Created).json(fileType)
})

export const getFileTypeController = expressAsyncHandler(async (req: Request, res: Response) => {
  const fileTypeArray = await getAllFileTypes()
  const fileTypes = fileTypeArray.map((fileType) => fileType.type)
  res.status(HttpStatus.OK).json(fileTypes)
})

export const updateFileTypeController = expressAsyncHandler(async (req: Request, res: Response) => {
  const fileType = await updateFileType(req.body.id, req.body)
  res.status(HttpStatus.OK).json(fileType)
})

export const deleteFileTypeController = expressAsyncHandler(async (req: Request, res: Response) => {
  await deleteFileType(req.body.id)
  res.status(HttpStatus.NoContent).send()
})
