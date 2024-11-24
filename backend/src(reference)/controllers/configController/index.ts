import { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { HttpStatus } from '../../lib/statusCode'
import { createConfig, deleteConfig, getAllConfigs, updateConfig } from '../../model/Config'
import { createManyFileTypes, deleteAllFileTypes } from '../../model/FileType'

export const createConfigController = expressAsyncHandler(async (req: Request, res: Response) => {
  const config = await createConfig(req.body)
  res.status(HttpStatus.Created).json(config)
})

export const getConfigController = expressAsyncHandler(async (req: Request, res: Response) => {
  // Get config
  const config = await getAllConfigs()
  res.status(HttpStatus.OK).json(config[0])
})

export const updateConfigController = expressAsyncHandler(async (req: Request, res: Response) => {
  const { fileTypes, ...configData } = req.body
  const config = await updateConfig(req.body.id, configData)
  if (fileTypes) {
    await deleteAllFileTypes()
    const fileTypeResponse = await createManyFileTypes(req.body.fileTypes)
    res.status(HttpStatus.OK).json({ ...config, fileTypes: fileTypeResponse })
  } else res.status(HttpStatus.OK).json(config)
})

export const deleteConfigController = expressAsyncHandler(async (req: Request, res: Response) => {
  // Delete config
  await deleteConfig(req.body.id)
  res.status(HttpStatus.NoContent).send()
})
