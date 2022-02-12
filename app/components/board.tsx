import classNames from "classnames";
import { GetTileStateColor, Tile, GetFontTileColor } from "~/utils/Tile";

type BoardProps = {
  tileMatrix: Tile[][];
};

export default function Board(props: BoardProps) {
  return (
    <div className="w-full h-[calc(100%-200px)] flex justify-center items-center p-[10px]">
      <div className="w-[350px] h-[420px] grid grid-rows-6 gap-[5px]">
        {props.tileMatrix.map((tileRow) => {
          return <TileRow tileRow={tileRow} />;
        })}
      </div>
    </div>
  );
}

type TileRowProps = {
  tileRow: Tile[];
};

function TileRow(props: TileRowProps) {
  return (
    <div className="grid grid-cols-5 gap-[5px]">
      {props.tileRow.map((tile) => {
        const keyColor = GetTileStateColor(tile.state);
        const fontColor = GetFontTileColor(tile.state);
        return (
          <div
            className={classNames(
              "w-full h-full flex justify-center items-center border-2 box-border font-bold text-[36px]",
              keyColor,
              fontColor
            )}
          >
            {tile.value}
          </div>
        );
      })}
    </div>
  );
}
