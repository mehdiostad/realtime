const upstashRedisRestUrl =
  "https://eu2-splendid-rhino-31234.upstash.io";
const authToken = "AXoCACQgMDhjZjhmZmUtOGY3My00MzQ3LWJhZjctMTA0MDY2ZjgxN2ZkYTM3NTU2MzYyOTM4NGQ1ZWExM2Y1NTUzMTNhNDEyZDg="

type Command = 'zrange' | 'sismember' | 'get' | 'smembers'

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    console.log(response.statusText)
    throw new Error(`Error executing Redis command: ${response.statusText, response.text}`)
  }

  const data = await response.json()
  return data.result
}
