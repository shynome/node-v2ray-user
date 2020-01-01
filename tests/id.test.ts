
import { newAlterIDs, newAlterUUIDs, aidTransformer } from "../dist/id";

describe('v2ray id', () => {
  it('id newAlterIDs', async () => {
    let a = await newAlterIDs('e9a4f695-63e9-4f6f-9bf1-610e9708f69c', 16)
    return
  })
  it('aid transformer', async () => {
    let a = await newAlterUUIDs('e9a4f695-63e9-4f6f-9bf1-610e9708f69c', 16)
    let b = aidTransformer.to(a)
    let c = aidTransformer.from(b)
    expect(c).toHaveLength(17)
    expect(a[0].equals(c[0]))
    expect(a[8].equals(c[8]))
    expect(a[16].equals(c[16]))
    return
  })
})

