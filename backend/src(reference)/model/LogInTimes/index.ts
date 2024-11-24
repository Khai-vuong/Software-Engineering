import prisma from '../../client'

export async function getLogInTimesAll(studentId: string) {
  // Get all the log in times of a student
  return await prisma.logInTimes.findMany({
    where: {
      studentId
    }
  })
}

export async function getLogInTimes(studentId: string) {
  // Count the number of times a student has logged
  return await prisma.logInTimes.count({
    where: {
      studentId
    }
  })
}

export async function getLogInTimesToday(studentId: string) {
  // Get the start of today
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  return await prisma.logInTimes.count({
    where: {
      studentId,
      logInTime: {
        gte: startOfToday
      }
    }
  })
}

export async function getLogInTimesYesterday(studentId: string) {
  // Get the start of today and start of yesterday
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  const startOfYesterday = new Date(startOfToday)
  startOfYesterday.setDate(startOfYesterday.getDate() - 1)

  return await prisma.logInTimes.count({
    where: {
      studentId,
      logInTime: {
        gte: startOfYesterday,
        lt: startOfToday
      }
    }
  })
}

export async function createLogInTime(studentId: string) {
  return await prisma.logInTimes.create({
    data: {
      studentId
    }
  })
}
