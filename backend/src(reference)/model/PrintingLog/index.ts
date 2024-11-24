/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrintingLog } from '@prisma/client'
import prisma from '../../client'

interface PrintRequestParams {
  studentId: string
  printerId: string
  fileName: string
  pageSize: string
  numPages: number
  isDoubleSided: boolean
  copies: number
}

export async function createPrintingLog(printingLog: PrintRequestParams) {
  try {
    return await prisma.printingLog.create({
      data: {
        ...printingLog,
        startTime: new Date()
      }
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('PrintingLog already exists')
    }
    throw error
  }
}

export async function getPrintingLogById(id: string) {
  return await prisma.printingLog.findUnique({
    where: { id }
  })
}

export async function getAllPrintingLogs(id: string) {
  return await prisma.printingLog.findMany({
    where: {
      studentId: id
    },
    orderBy: {
      startTime: 'desc'
    }
  })
}

export async function updatePrintingLog(id: string, printingLog: PrintingLog) {
  return await prisma.printingLog.update({
    where: { id },
    data: printingLog
  })
}
export async function markPrintingLogAsPrinted(id: string) {
  return await prisma.printingLog.update({
    where: { id },
    data: {
      endTime: new Date()
    }
  })
}

export async function deletePrintingLog(id: string) {
  return await prisma.printingLog.delete({
    where: { id }
  })
}
