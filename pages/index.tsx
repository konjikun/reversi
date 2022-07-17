import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  min-height: 100vh;
  padding: 0 0.5rem;
  background-color: #e69f06;
`
const Backs = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  gap: 0;
  background-color: #07b81e;
  transform: translate(-50%, -50%);
`

const Grid = styled.div`
  padding: 0;
  border-collapse: collapse;
  border: solid 3px #080808;
`
const CircleBlack = styled.div`
  width: 54px;
  height: 54px;
  background-color: #000;
  border: solid 3px #080808;
  border-radius: 50%;
`
const CircleWhite = styled.div`
  width: 54px;
  height: 54px;
  background-color: #fffbfb;
  border: solid 3px #080808;
  border-radius: 50%;
`
const CircleClear = styled.div`
  width: 54px;
  height: 54px;
  background-color: #07b81e;
  border-radius: 50%;
`

const Home: NextPage = () => {
  //prettier-ignore
  const [board, setBoard] = useState ([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ])
  const [turn, setTurn] = useState(2)
  const hit = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board))

    let yUp = 0
    let yBt = 0
    let xUp = 0
    let xBt = 0
    let rB = 0
    let rU = 0
    let lB = 0
    const lU = 0
    let turnChange = turn

    //ターンを変える
    function change() {
      if (turnChange === 1) {
        turnChange = 2
      } else if (turnChange === 2) {
        turnChange = 1
      }
      setTurn(turnChange)
      return tapPoint()
    }

    //何も置いてない時だけclicした所の色を変える
    function tapPoint() {
      if (newBoard[y][x] === 0) {
        newBoard[y][x] = turnChange

        return UpDown()
      }
    }

    //下の内容のどこを通るか通らないか決める
    function UpDown() {
      if (y - 1 >= 0 && yUp === 0) {
        yUpper()
      }
      if (y + 1 <= 7 && yBt === 0) {
        yBottom()
      }
      rightLeft()
    }

    function rightLeft() {
      console.log(turnChange)
      if (x - 1 >= 0 && xUp === 0) {
        console.log(turnChange)
        xUpper()
      }
      if (x + 1 <= 7 && xBt === 0) {
        console.log(turnChange)
        xBottom()
      }
      console.log(turnChange)
      rightDiagonal()
      return setBoard(newBoard)
    }

    function rightDiagonal() {
      console.log(rB)
      if (rB === 0) {
        console.log(turnChange)
        rightBottom()
      }
      if (rU === 0) {
        rightUpper()
      }
      console.log(turnChange)
      leftDiagonal()
    }

    function leftDiagonal() {
      console.log(turnChange)
      if (lB === 0) {
        console.log(turnChange)
        leftBottom()
      }
      return setBoard(newBoard)
    }

    // yより位置が↑、↓、ｘより↑、↓、ｙより↑でｘより↑、ｙより↑でｘより↓、yより↓でxより↑、yより↓でxより↓、8通り

    // y > i、
    function yUpper() {
      yUp += 1
      let roop = y - 2
      console.log(turnChange)
      while (
        newBoard[y - 1][x] !== turnChange &&
        newBoard[y - 1][x] !== 0 &&
        roop >= 0 &&
        newBoard[roop][x] !== 0
      ) {
        //挟まったのを確認！roopはさかのぼる!
        if (newBoard[roop][x] === turnChange) {
          for (; roop <= y - 1; roop++) {
            newBoard[roop][x] = turnChange
          }
          break
        }
        roop -= 1
      }

      setBoard(newBoard)
      UpDown()
      return setBoard(newBoard)
    }
    //y < i
    function yBottom() {
      yBt += 1
      let roop = y + 2
      while (
        newBoard[y + 1][x] !== turnChange &&
        newBoard[y + 1][x] !== 0 &&
        roop <= 7 &&
        newBoard[roop][x] !== 0
      ) {
        if (newBoard[roop][x] === turnChange) {
          for (; roop >= y + 1; roop--) {
            newBoard[roop][x] = turnChange
          }
          break
        }
        roop += 1
      }
      setBoard(newBoard)
      UpDown()
      return setBoard(newBoard)
    }

    //x < i
    function xBottom() {
      console.log(turnChange)
      xBt += 1
      let roop = x + 2
      while (
        newBoard[y][x + 1] !== turnChange &&
        newBoard[y][x + 1] !== 0 &&
        roop <= 7 &&
        newBoard[y][roop] !== 0
      ) {
        if (newBoard[y][roop] === turnChange) {
          for (; roop >= x + 1; roop--) {
            newBoard[y][roop] = turnChange
          }
          break
        }
        roop += 1
      }

      setBoard(newBoard)
      rightLeft()
      return setBoard(newBoard)
    }
    //x > i
    function xUpper() {
      let roop = x - 2
      console.log(turnChange)
      xUp += 1
      while (
        newBoard[y][x - 1] !== turnChange &&
        newBoard[y][x - 1] !== 0 &&
        roop >= 0 &&
        newBoard[y][roop] !== 0
      ) {
        //挟まったのを確認！roopはさかのぼる!
        if (newBoard[y][roop] === turnChange) {
          for (; roop <= x - 1; roop++) {
            newBoard[y][roop] = turnChange
          }
          break
        }
        roop -= 1
      }

      console.log(turnChange)
      setBoard(newBoard)
      rightLeft()
      return setBoard(newBoard)
    }
    //斜め
    //y > i, x > i
    function rightBottom() {
      let roopVertical = y - 2
      let roopHorizontal = x - 2
      rB += 1
      while (
        newBoard[y - 1][x - 1] !== 0 &&
        newBoard[y - 1][x - 1] !== turnChange &&
        newBoard[roopVertical][roopHorizontal] !== 0
      ) {
        if (newBoard[roopVertical][roopHorizontal] === turnChange) {
          for (let i = roopVertical, j = roopHorizontal; j <= x - 1; i++, j++) {
            newBoard[i][j] = turnChange
          }
          break
        }

        roopHorizontal -= 1
        roopVertical -= 1
      }

      setBoard(newBoard)
      rightDiagonal()
      return setBoard(newBoard)
    }
    //y < i, x > i
    function rightUpper() {
      rU += 1
      let roopVertical = y + 2
      let roopHorizontal = x - 2

      while (
        newBoard[y + 1][x - 1] !== 0 &&
        newBoard[y + 1][x - 1] !== turnChange &&
        newBoard[roopVertical][roopHorizontal] !== 0
      ) {
        if (newBoard[roopVertical][roopHorizontal] === turnChange) {
          for (let i = roopVertical, j = roopHorizontal; j <= x - 1; i--, j++) {
            newBoard[i][j] = turnChange
          }
          break
        }

        roopHorizontal -= 1
        roopVertical += 1
      }

      setBoard(newBoard)
      rightDiagonal()
      return setBoard(newBoard)
    }
    //y > i, x < 1
    function leftBottom() {
      let roopVertical = y - 2
      let roopHorizontal = x + 2
      lB += 1
      console.log(turnChange)
      while (
        newBoard[y - 1][x + 1] !== 0 &&
        newBoard[y - 1][x + 1] !== turnChange &&
        newBoard[roopVertical][roopHorizontal] !== 0
      ) {
        if (newBoard[roopVertical][roopHorizontal] === turnChange) {
          for (let i = roopVertical, j = roopHorizontal; j >= x + 1; i++, j--) {
            console.log(j)
            newBoard[i][j] = turnChange
          }
          break
        }

        roopVertical -= 1
        roopHorizontal += 1
      }

      setBoard(newBoard)
      rightDiagonal()
      return setBoard(newBoard)
    }
    if (board[y][x] === 0) {
      change()
    }
    setBoard(newBoard)
  }
  return (
    <Container>
      <Head>
        <title>Create Next App</title>
      </Head>
      <Backs>
        <tbody>
          {board.map((row, y) => (
            <tr key={y}>
              {row.map((color, x) => (
                <th key={x}>
                  <Grid onClick={() => hit(x, y)}>
                    {color === 0 ? (
                      <CircleClear />
                    ) : color === 1 ? (
                      <CircleBlack />
                    ) : (
                      <CircleWhite />
                    )}
                  </Grid>
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </Backs>
    </Container>
  )
}

export default Home
