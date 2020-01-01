
import { User } from "./user";
import { ID, UUID } from "./id";
import { createHmac } from "crypto";
import Int64 from "node-int64";

export const cacheDurationSec = 120

export const getUnixTime = (d = Date.now()) => Math.floor(d / 1e3)

export interface TimeUser {
  Email: string
  Timer: number
}

export const generateNewHashes = (nowSec: number, user: User) => {
  const genStartSec = nowSec - cacheDurationSec
  const genEndSec = nowSec + cacheDurationSec
  let hashMap: { [k: string]: TimeUser } = {}
  const genHashForID = (id: UUID) => {
    const genHashValue = (val: Int64) => createHmac('md5', id).update(val.toBuffer()).digest()
    for (let i = genStartSec; i <= genEndSec; i++) {
      let hashValue = genHashValue(new Int64(i))
      hashMap[hashValue.toString('base64')] = {
        Email: user.Email,
        Timer: i,
      }
    }
  }
  genHashForID(user.ID.uuid)
  for (let id of user.AlterID) {
    genHashForID(id.uuid)
  }
  return hashMap
}

export const generateHash = (id: UUID) => {
  const genHashValue = (val: Int64) => createHmac('md5', id).update(val.toBuffer()).digest()
  return (nowSec: number) => {
    return genHashValue(new Int64(nowSec))
  }
}