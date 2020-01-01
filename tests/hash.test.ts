
import { newAlterIDs, uuidParse, NewID } from "../dist/id";
import { generateNewHashes, getUnixTime } from "../dist/hash";
import { User } from "../dist/user";

describe('v2ray hash', () => {
  it('generateNewHashes', async () => {
    let u = 'e9a4f695-63e9-4f6f-9bf1-610e9708f69c'
    let aid = await newAlterIDs(u, 16)
    let id = await NewID(uuidParse(u))
    let user: User = {
      ID: id,
      AlterID: aid,
      Email: 't@tt.t'
    }
    generateNewHashes(1570029233, user)
  })
})

