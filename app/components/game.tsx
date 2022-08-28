import { Key, KeyState, UpdateKeyColor } from "~/utils/key";
import { getTodayPrimeNumber } from "~/utils/prime_number";
import { Tile, TileState, UpdateTileMatrixColor } from "~/utils/tile";
import { SetStateAction, Dispatch } from "react";
import { useState, useEffect, useRef } from "react";
import Board from "~/components/board";
import KeyBoard from "~/components/keyboard";
import ResultModal from "./result_modal";

const RESULT = getTodayPrimeNumber();
const DELETE_KEY = "Delete";
const ENTER_KEY = "Enter";

const MAXCOL = 5;
const MAXROW = 6;

function useNumKeys(
  tileMatrix: Tile[][],
  setTileMatrix: Dispatch<SetStateAction<Tile[][]>>,
  rowIndex: number,
  setRowIndex: Dispatch<SetStateAction<number>>,
  colIndex: number,
  setColIndex: Dispatch<SetStateAction<number>>,
  numKeyInput: string,
  setNumKeyInput: Dispatch<SetStateAction<string>>,
  numKeyboard: Key[],
  setNumKeyboard: Dispatch<SetStateAction<Key[]>>,
  won: boolean
): Key[] {
  useEffect(() => {
    let tmpTileMatrix = tileMatrix[rowIndex];
    if (numKeyInput == "" || rowIndex === MAXROW || won) {
      return;
    }
    if (colIndex < MAXCOL) {
      tmpTileMatrix[colIndex] = {
        value: numKeyInput,
        state: TileState.Inputed,
      };
      tileMatrix[rowIndex] = tmpTileMatrix;
      setTileMatrix(tileMatrix);
      setColIndex(colIndex + 1);
    }
    setNumKeyInput("");
  }, [numKeyInput]);

  return numKeyboard;
}

function useDeleteKey(
  tileMatrix: Tile[][],
  setTileMatrix: Dispatch<SetStateAction<Tile[][]>>,
  rowIndex: number,
  setRowIndex: Dispatch<SetStateAction<number>>,
  colIndex: number,
  setColIndex: Dispatch<SetStateAction<number>>
): Key {
  const [deleteKeyInput, setDeleteKeyInput] = useState<string>("");
  useEffect(() => {
    if (deleteKeyInput == "") {
      return;
    }
    let tmpTileMatrix = tileMatrix[rowIndex];
    if (colIndex > 0) {
      tmpTileMatrix[colIndex - 1] = { value: "", state: TileState.NotInput };
      tileMatrix[rowIndex] = tmpTileMatrix;
      setTileMatrix(tileMatrix);
      setColIndex(colIndex - 1);
    }
    setDeleteKeyInput("");
  }, [deleteKeyInput]);

  return {
    name: "delete",
    action: () => {
      setDeleteKeyInput("delete");
    },
    state: KeyState.Nulll,
  };
}

function useEnterKey(
  tileMatrix: Tile[][],
  setTileMatrix: Dispatch<SetStateAction<Tile[][]>>,
  rowIndex: number,
  setRowIndex: Dispatch<SetStateAction<number>>,
  colIndex: number,
  setColIndex: Dispatch<SetStateAction<number>>,
  numKeyboard: Key[],
  setNumKeyboard: Dispatch<SetStateAction<Key[]>>,
  setResultModal: Dispatch<SetStateAction<boolean>>,
  setWon: Dispatch<SetStateAction<boolean>>
): Key {
  const [enterKeyInput, setEnterKeyInput] = useState<string>("");
  useEffect(() => {
    if (enterKeyInput == "" || rowIndex === MAXROW) {
      return;
    }
    let tmpTileMatrix = tileMatrix[rowIndex];

    // confirm all columns have input
    if (colIndex == MAXCOL) {
      const inputNum = parseInt(
        tmpTileMatrix
          .map((tmpTile) => {
            return tmpTile.value;
          })
          .join("")
      );
      tmpTileMatrix = UpdateTileMatrixColor(tmpTileMatrix, RESULT);

      tileMatrix[rowIndex] = tmpTileMatrix;
      setTileMatrix(tileMatrix);
      setColIndex(0);
      setRowIndex(rowIndex + 1);

      // update keyboard
      const tmpNumKeyboard = UpdateKeyColor(numKeyboard, RESULT, tmpTileMatrix);
      setNumKeyboard(tmpNumKeyboard);

      // show result
      if (RESULT === inputNum) {
        setWon(true);
        setResultModal(true);
      } else if (rowIndex === MAXROW - 1) {
        setWon(false);
        setResultModal(true);
      }
    }
    setEnterKeyInput("");
  }, [enterKeyInput]);

  return {
    name: "enter",
    action: () => {
      setEnterKeyInput("enter");
    },
    state: KeyState.Nulll,
  };
}

export function useGameProps(): GameProps {
  const templateTileMatrix = new Array(MAXROW)
    .fill("")
    .map(() => new Array(MAXCOL).fill(""));

  const [tileMatrix, setTileMatrix] = useState<Tile[][]>(
    templateTileMatrix.map((tileRowStrings): Tile[] => {
      return tileRowStrings.map((tileString): Tile => {
        return {
          value: tileString,
          state: TileState.NotInput,
        };
      });
    })
  );

  const [numKeyInput, setNumKeyInput] = useState<string>("");
  const [numKeyboard, setNumKeyboard] = useState<Key[]>(
    [...Array(10).keys()].map((n) => {
      return {
        name: n.toString(),
        action: () => {
          setNumKeyInput(n.toString());
        },
        state: KeyState.NotInput,
      };
    })
  );

  const [rowIndex, setRowIndex] = useState<number>(0);
  const [colIndex, setColIndex] = useState<number>(0);

  const [resultModalFlag, setResultModal] = useState<boolean>(false);
  const [won, setWon] = useState<boolean>(false);

  return {
    numKeys: useNumKeys(
      tileMatrix,
      setTileMatrix,
      rowIndex,
      setRowIndex,
      colIndex,
      setColIndex,
      numKeyInput,
      setNumKeyInput,
      numKeyboard,
      setNumKeyboard,
      won
    ),
    deleteKey: useDeleteKey(
      tileMatrix,
      setTileMatrix,
      rowIndex,
      setRowIndex,
      colIndex,
      setColIndex
    ),
    enterKey: useEnterKey(
      tileMatrix,
      setTileMatrix,
      rowIndex,
      setRowIndex,
      colIndex,
      setColIndex,
      numKeyboard,
      setNumKeyboard,
      setResultModal,
      setWon
    ),
    tileMatrix: tileMatrix,
    resultModalflag: resultModalFlag,
    setResultModal: setResultModal,
    won: won,
    setWon: setWon,
  };
}

type GameProps = {
  numKeys: Key[];
  deleteKey: Key;
  enterKey: Key;
  tileMatrix: Tile[][];
  resultModalflag: boolean;
  setResultModal: Dispatch<SetStateAction<boolean>>;
  won: boolean;
  setWon: Dispatch<SetStateAction<boolean>>;
};

export default function Game(props: GameProps) {
  return (
    <div className="h-full w-full">
      <Board tileMatrix={props.tileMatrix} />
      <KeyBoard
        numKeys={props.numKeys}
        deleteKey={props.deleteKey}
        enterKey={props.enterKey}
      />
      <ResultModal
        flag={props.resultModalflag}
        setFlag={props.setResultModal}
        won={props.won}
        setWon={props.setWon}
        tileMatrix={props.tileMatrix}
      />
    </div>
  );
}
