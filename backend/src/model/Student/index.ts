/* eslint-disable @typescript-eslint/no-explicit-any */
import { Student } from '@prisma/client'
import prisma from '../../client'

export async function createStudent(student: StudentCreateParams) {
  try {
    return await prisma.student.create({
      data: student
    })
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw new Error('Student already exists')
    }
    throw error
  }
}

export async function getStudentById(id: string) {
  return await prisma.student.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      printBalance: true,
      name: true
    }
  })
}

export async function getStudentByUsername(username: string) {
  return await prisma.student.findUnique({
    where: { username }
  })
}

export async function updateStudent(id: string, student: Student) {
  return await prisma.student.update({
    where: { id },
    data: student
  })
}

export async function updateStudentPrintBalance(id: string, printBalance: number) {
  return await prisma.student.update({
    where: { id },
    data: { printBalance },
    select: {
      printBalance: true
    }
  })
}

export async function deleteStudent(id: string) {
  return await prisma.student.delete({
    where: { id }
  })
}
