export type Tile = {
  value: string;
  state: TileState;
};

export enum TileState {
  Nulll = 0,
  Inputed,
  NotInput,
  JustMatch,
  Exists,
  NotExists,
}

export function UpdateTileMatrixColor(
  tileRow: Tile[],
  correctAnswer: number
): Tile[] {
  const correctAnswerStr = correctAnswer.toString();
  return tileRow.map((tile, index) => {
    if (tile.value == correctAnswerStr[index]) {
      return {
        value: tile.value,
        state: TileState.JustMatch,
      };
    }
    if (correctAnswerStr.includes(tile.value)) {
      return {
        value: tile.value,
        state: TileState.Exists,
      };
    }
    return {
      value: tile.value,
      state: TileState.NotExists,
    };
  });
}

export function GetTileStateColor(state: TileState): string {
  switch (state) {
    case TileState.Inputed: {
      return "bg-white";
    }
    case TileState.NotInput: {
      return "bg-white";
    }
    case TileState.JustMatch: {
      return "bg-green-300";
    }
    case TileState.Exists: {
      return "bg-yellow-300";
    }
    case TileState.NotExists: {
      return "bg-zinc-300";
    }
  }
  return "bg-white";
}

export function GetFontTileColor(state: TileState): string {
  switch (state) {
    case TileState.Inputed:
    case TileState.NotInput: {
      return "text-black";
    }
    case TileState.Exists:
    case TileState.NotExists:
    case TileState.JustMatch: {
      return "text-white";
    }
  }
  return "text-black";
}
