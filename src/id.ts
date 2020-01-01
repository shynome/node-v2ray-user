
import { createHash, Hash } from "crypto";
import { parse } from "uuid-parse";

export const uuidParse: typeof parse = (uuid: any) => Buffer.from(parse(uuid))

export class UUID extends Buffer { }

export interface ID {
  uuid: UUID
  cmdKey?: Buffer
}

export async function NewID(uuid: UUID): Promise<ID> {
  let id: ID = { uuid, }
  let h: Hash = createHash('md5')
  h = h.update(uuid)
  h.update("c48619fe-8f02-49e0-b9e9-edf763e17e21")
  id.cmdKey = h.digest()
  return id
}

export async function NextID(uuid: UUID): Promise<UUID> {
  let h: Hash = createHash('md5')
  h.update(uuid)
  h.update('16167dc8-16b6-4e6d-b8bb-65dd68113a81')
  let newid: UUID
  while (true) {
    newid = h.digest()
    if (!uuid.equals(newid)) {
      return newid
    }
    h.update('533eff8a-4113-4b10-b5ce-0f5d76b98cd2')
  }
}

export async function newAlterIDs(uuid: string, alterIDCount: number): Promise<Array<ID>> {

  let alterIDs = new Array<ID>(alterIDCount)

  let prevID = uuidParse(uuid)

  for (let i = 0; i < alterIDs.length; i++) {
    let newID = await NextID(prevID)
    alterIDs[i] = await NewID(newID)
    prevID = newID
  }

  return alterIDs
}

export async function newAlterUUIDs(uuid: string, alterIDCount: number): Promise<Array<UUID>> {

  let alterUUIDs = new Array<UUID>(alterIDCount + 1)

  let prevID = uuidParse(uuid)
  alterUUIDs[0] = prevID

  for (let i = 1; i < alterUUIDs.length; i++) {
    let newID = await NextID(prevID)
    alterUUIDs[i] = newID
    prevID = newID
  }

  return alterUUIDs
}

export const aidTransformer = {
  to(val: Buffer[]) {
    return Buffer.concat(val)
  },
  from(val: Buffer): Buffer[] {
    let arr: Buffer[] = []
    for (let i = 0, p = 0; i < val.length;) {
      i += 16
      arr.push(val.slice(p, i))
      p = i
    }
    return arr
  },
}
