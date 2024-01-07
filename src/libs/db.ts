import { Redis } from '@upstash/redis'

export const db = new Redis({
  url: "https://eu2-splendid-rhino-31234.upstash.io",
  token: 'AXoCACQgMDhjZjhmZmUtOGY3My00MzQ3LWJhZjctMTA0MDY2ZjgxN2ZkYTM3NTU2MzYyOTM4NGQ1ZWExM2Y1NTUzMTNhNDEyZDg=',
})
   
