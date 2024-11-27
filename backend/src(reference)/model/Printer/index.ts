/* eslint-disable @typescript-eslint/no-explicit-any */
import { Printer } from '@prisma/client'
import prisma from '../../client'

interface PrinterCreateParams {
  brand: string
  model: string
  description: string
  locationId: string
  enabled: boolean
}
export async function createPrinter(printer: PrinterCreateParams) {
  try {
    return await prisma.printer.create({
      data: printer
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('Printer already exists')
    }
    throw error
  }
}

export async function getPrinterById(id: string) {
  return await prisma.printer.findUnique({
    where: { id },
    include: { location: true }
  })
}

export async function getAllPrinters() {
  return await prisma.printer.findMany({
    include: { location: true }
  })
}

export async function updatePrinter(id: string, printer: Printer) {
  return await prisma.printer.update({
    where: { id },
    data: printer
  })
}

export async function deletePrinter(id: string) {
  return await prisma.printer.delete({
    where: { id }
  })
}
