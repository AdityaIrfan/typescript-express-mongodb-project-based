import express, { Application, Request, Response } from 'express'

const app: Application = express()

const port: Number = 4000

app.get('/health', (req: Request, res: Response) => {
  return res.status(200).json({
    message: "i'm healthy"
  })
})
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
