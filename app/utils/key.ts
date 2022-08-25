import { SetStateAction, Ref, Dispatch, useEffect, useState } from "react";
import { Tile } from "./tile";

export type Key = {
  name: string;
  value?: HTMLElement;
  action: () => void;
  disable?: boolean;
  state: KeyState;
};

export enum KeyState {
  Nulll = 0,
  NotInput,
  JustMatch,
  Exists,
  NotExists,
}

export function UpdateKeyColor(
  keys: Key[],
  correctAnswer: number,
  inputedTileRow: Tile[]
): Key[] {
  const correctAnswerStr = correctAnswer.toString();
  inputedTileRow.map((tile, index) => {
    let tmpKey = keys[parseInt(tile.value)];
    if (tile.value == correctAnswerStr[index]) {
      tmpKey.state = KeyState.JustMatch;
    } else if (tmpKey.state != KeyState.JustMatch) {
      if (correctAnswerStr.includes(tile.value)) {
        tmpKey.state = KeyState.Exists;
      } else if (tmpKey.state != KeyState.Exists) {
        tmpKey.state = KeyState.NotExists;
      }
    }
    keys[parseInt(tile.value)] = tmpKey;
  });
  return keys;
}

function uniq(arr: string[][]): string[] {
  return Array.from(new Set(arr.flat()));
}

export function CheckKeyState(key: string, inputed: string[][]): KeyState {
  uniq(inputed).forEach((str: string) => {
    if (str == key) {
      return KeyState.Exists;
    }
  });
  return KeyState.NotExists;
}

export function GetKeyStateColor(state: KeyState): string {
  switch (state) {
    case KeyState.Exists: {
      return "bg-yellow-300";
    }
    case KeyState.NotInput: {
      return "bg-slate-300";
    }
    case KeyState.NotExists: {
      return "bg-zinc-300";
    }
    case KeyState.JustMatch: {
      return "bg-green-300";
    }
  }
  return "bg-slate-300";
}

export function GetFontKeyColor(state: KeyState): string {
  switch (state) {
    case KeyState.NotInput: {
      return "text-black";
    }
    case KeyState.Exists:
    case KeyState.NotExists:
    case KeyState.JustMatch: {
      return "text-white";
    }
  }
  return "text-black";
}
