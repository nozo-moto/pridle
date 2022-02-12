import classNames from "classnames";
import { SetStateAction, Ref, Dispatch, useEffect, useState } from "react";
import {
  Key,
  KeyState,
  CheckKeyState,
  GetKeyStateColor,
  GetFontKeyColor,
} from "~/utils/key";

export type KeyBoardProps = {
  numKeys: Key[];
  deleteKey: Key;
  enterKey: Key;
};

export default function KeyBoard(props: KeyBoardProps) {
  function update() {}

  return (
    <div className="mx-[8px] h-[200px] max-w-full flex justify-center flex-row">
      <div className="flex flex-row w-full m-auto justify-center flex flex-row">
        <div className="w-full basis-1/6 flex justify-center mr-[6px] items-end">
          <Key
            name={props.enterKey.name}
            action={props.enterKey.action}
            state={props.enterKey.state}
          />
        </div>
        <div className="w-full grid grid-cols-5 gap-1 items-center m-auto">
          {props.numKeys.map((key) => (
            <Key name={key.name} action={key.action} state={key.state} />
          ))}
        </div>
        <div className="w-full basis-1/6 flex justify-center ml-[6px] items-end">
          <Key
            name={props.deleteKey.name}
            action={props.deleteKey.action}
            state={props.deleteKey.state}
          />
        </div>
      </div>
    </div>
  );
}

type KeyProps = {
  name: string;
  action: () => void;
  state: KeyState;
};

function Key(props: KeyProps) {
  const keyColor = GetKeyStateColor(props.state);
  const fontColor = GetFontKeyColor(props.state);

  return (
    <button
      className={classNames(
        "font-medium h-[58px] w-full flex justify-center items-center rounded px-px ",
        keyColor,
        fontColor
      )}
      onClick={() => {
        props.action();
      }}
    >
      {props.name}
    </button>
  );
}
