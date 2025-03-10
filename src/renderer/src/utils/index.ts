export function createFormalName(name: string): string {
  const normalizedName = name.trim().split(' ')

  if (normalizedName.length < 3) return name
  let newName = ''
  newName = normalizedName[0]
  for (let i = 1; i < normalizedName.length - 1; i++) {
    newName += ' ' + normalizedName[i][0] + '. '
  }
  newName += normalizedName[normalizedName.length - 1]
  return newName
}

export function abreaviateName(name: string): string {
  const normalizedName = name.trim().split(' ')

  let abrevName = ''

  if (normalizedName.length < 4) return name
  abrevName = normalizedName[0][0] + '. '
  for (let i = 1; i < normalizedName.length - 1; i++) {
    abrevName += normalizedName[i][0] + '. '
  }
  abrevName += normalizedName[normalizedName.length - 1][0]
  return abrevName
}
