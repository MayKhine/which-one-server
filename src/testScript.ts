const callDb = async () => {
  //const result = await fetch("http://localhost:3300")
  const promises = new Array<Promise<any>>()
  for (let i = 0; i < 10; i++) {
    console.log("I is :", i)
    const pr = fetch("http://localhost:3300/register", {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        Referer: "http://localhost:5173/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: '{"nickname":"testtest","name":"testtest@gmail.com","picture":"https://s.gravatar.com/avatar/08d548687c7f52ee06dff7b2c4c8bb37?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fma.png","updated_at":"2024-01-05T19:44:17.519Z","email":"testtest@gmail.com","email_verified":true,"sub":"auth0|655275fa3e05dd89a158ad77"}',
      method: "PATCH",
    })
    promises.push(pr)
  }

  const resAll = await Promise.all(promises)
  console.log(
    "done",
    resAll.map((r) => r.body)
  )
}

callDb()
