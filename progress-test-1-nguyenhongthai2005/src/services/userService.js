import db from '../../db.json'

const USERS = db.users

export async function getUsers() {
  return Promise.resolve(USERS)
}

export async function getUserById(id) {
  const user = USERS.find(u => u.id === id)
  return Promise.resolve(user ?? null)
}

export async function findUserByCredentials(username, password) {
  if (!username || !password) return Promise.resolve(null)
  
  const user = USERS.find(u => u.username === username && u.password === password)
  
  if (!user || user.status !== 'active') return Promise.resolve(null)
  
  return Promise.resolve(user)
}
