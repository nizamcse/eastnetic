import fakeNames from "./fake-users"

const random = (min, max) => {
  return Math.random() * (max - min) + min
}

export const generateUsers = (n) => {
  const mailExtensions = ["@gmail.com", "@yahoo.com", "@example.com"]
  const getRandomMailExtension = () => {
    return mailExtensions[Math.floor(random(1, 3)) - 1]
  }
  const generateMailFromName = (name) => {
    try {
      return name.toLowerCase() + getRandomMailExtension()
    } catch (err) {
      throw Error(err)
    }
  }
  const randomUniquePotatos = () => {
    const potatos = []
    for (let index = 0; index < n; index += 1) {
      let potato = Math.floor(random(1, 300))
      if (potatos.includes(potato)) {
        while (!potatos.includes(potato)) {
          potato = Math.floor(random(1, 300))
        }
        potatos.push(potato)
      } else {
        potatos.push(potato)
      }
    }
    return potatos
  }
  const randonNPotatos = randomUniquePotatos()
  const users = []
  for (let i = 0; i < n; i += 1) {
    const user = {
      name: fakeNames[i],
      email: generateMailFromName(fakeNames[i]),
      potatos: randonNPotatos[i],
    }
    users.push(user)
  }
  return users
}
