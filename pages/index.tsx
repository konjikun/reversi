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

    //すでに置かれている上には置けない
    let turnChange = turn
    const horizontal = [-1, 0, 1]
    const vercical = [-1, 0, 1]
    let end = 0

    for (let a = 0; a < 3 && end === 0; a++) {
      for (let s = 0; s < 3 && end === 0; s++) {
        //なんでiとboard[y + vercical[a]][x + horizontal[s] が同値にならない？
        if (y !== 0) {
          if (board[y + vercical[a]][x + horizontal[s]] === turnChange && board[y][x] === 0) {
            if (board[y][x] !== 0) {
              console.log()
              //意思が置いてあるところに置いた時の想定
            } else if (board[y][x] === 1 && turnChange === 2) {
              console.log(turnChange)
              turnChange -= 1
              end += 1
              newBoard[y][x] = turnChange //実際に表示される//
              setBoard(newBoard) //ボードに変更を保存
              setTurn(turnChange) //ターンを保存
              console.log(newBoard[y][x])
            } else if (board[y][x] === 2 && turnChange === 1) {
              console.log(turnChange)
              turnChange += 1
              end += 1
              newBoard[y][x] = turnChange
              setBoard(newBoard)
              setTurn(turnChange)
              console.log(newBoard[y][x])
              //ここから石が置かれていないところに置いた時の想定
            } else if (turnChange === 1) {
              console.log(y + vercical[a])
              turnChange += 1
              end += 1
              newBoard[y][x] = turnChange
              setBoard(newBoard)
              setTurn(turnChange)
              console.log(x + horizontal[s])
            } else if (turnChange == 2) {
              console.log(y + vercical[a])
              turnChange -= 1
              end += 1
              newBoard[y][x] = turnChange
              setBoard(newBoard)
              setTurn(turnChange)
              console.log(x + horizontal[s])
            }
            //周りに敵石がないときに置けなくする
          }
        }
      }
      //(y=0)一番上に駒を置いたとき。長くなるが今回はとりあえず上の操作をコピペ
    }
    for (let c = 1; c < 3 && end === 0; c++) {
      for (let d = 0; d < 3 && end === 0; d++) {
        if (y === 0) {
          if (board[y + c][x + d] === turnChange && board[y][x] === 0) {
            console.log(y + vercical[c])
            console.log(x + horizontal[d])

            if (board[y][x] !== 0) {
              //意思が置いてあるところに置いた時の想定
            } else if (board[y][x] === 1 && turnChange === 2) {
              console.log(turnChange)
              turnChange -= 1
              end += 1
              newBoard[y][x] = turnChange //実際に表示される//
              setBoard(newBoard) //ボードに変更を保存
              setTurn(turnChange) //ターンを保存
              console.log(newBoard[y][x])
            } else if (board[y][x] === 2 && turnChange === 1) {
              console.log(turnChange)
              turnChange += 1
              end += 1
              newBoard[y][x] = turnChange
              setBoard(newBoard)
              setTurn(turnChange)
              console.log(newBoard[y][x])
              //ここから石が置かれていないところに置いた時の想定
            } else if (turnChange === 1) {
              console.log(turnChange)
              turnChange += 1
              end += 1
              newBoard[y][x] = turnChange
              setBoard(newBoard)
              setTurn(turnChange)
              console.log(newBoard[y][x])
            } else if (turnChange == 2) {
              console.log(turnChange)
              turnChange -= 1
              end += 1
              newBoard[y][x] = turnChange
              setBoard(newBoard)
              setTurn(turnChange)
              console.log(newBoard[y][x])
            }
          }
        }
      }
    }
    //挟んだら色変わる
    for (let i = 0; i <= 7; i++) {
      //縦
      if (board[i][x] === turnChange && board[i][x] !== 0) {
        if (y < i) {
          console.log(i)
          for (let s = y; s !== i && board[s + 1][x] !== 0; s++) {
            console.log(s)
            newBoard[s][x] = turnChange
            setBoard(newBoard)
          }
        } else if (y > i) {
          console.log(y)
          for (let j = y; j !== i && board[j - 1][x] !== 0; j--) {
            newBoard[j][x] = turnChange
            setBoard(newBoard)
          }
        }
      }
      //横
      if (board[y][i] === turnChange && board[y][i] !== 0) {
        if (x < i) {
          for (let s = x; s !== i; s++) {
            newBoard[y][s] = turnChange
            setBoard(newBoard)
          }
        } else if (x > i) {
          for (let s = x; s !== i; s--) {
            newBoard[y][s] = turnChange
            setBoard(newBoard)
          }
        }
      } //斜め
      if (
        (board[y + i][x + i] === turnChange ||
          board[y - i][x - i] ||
          board[y + i][x - i] ||
          board[y - i][x + i]) &&
        board[y + i][x + i] !== 0
      ) {
        if (y < i && x < i) {
          for (let s = y, j = x; s !== i; s++, j++) {
            newBoard[s + 1][j + 1] = turnChange
            setBoard(newBoard)
          }
        } else if (y > i && x > i) {
          for (let s = y, j = x; s !== i; s--, j--) {
            newBoard[s - 1][j - 1] = turnChange
            setBoard(newBoard)
          }
        } else if (y > i && x < i) {
          for (let s = y, j = x; s !== i; s--, j++) {
            newBoard[s - 1][j + 1]
            setBoard(newBoard)
          }
        } else if (y < i && x > i) {
          for (let s = y, j = x; s !== i; s++, j--) {
            newBoard[s + 1][j - 1]
            setBoard(newBoard)
          }
        }
      }
    }
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
