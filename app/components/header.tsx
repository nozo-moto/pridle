import { IconContext } from "react-icons";
import { BsQuestionCircle } from "react-icons/bs";
import { MdSettings } from "react-icons/md";
import { SetStateAction, Dispatch } from "react";

export function useHeaderProps(
  setQuestionFlag: Dispatch<SetStateAction<boolean>>,
  setSettingsFlag: Dispatch<SetStateAction<boolean>>
): HeaderProps {
  return {
    onClickQuestion: () => {
      setQuestionFlag(true);
    },
    onClickSettings: () => {
      setSettingsFlag(true);
    },
  };
}

export type HeaderProps = {
  onClickQuestion: () => void;
  onClickSettings: () => void;
};

export default function Header(props: HeaderProps) {
  return (
    <div className="flex flex-row justify-between items-center border-b h-[50px]">
      <div>
        <button className="pl-[10px]" onClick={props.onClickQuestion}>
          <IconContext.Provider value={{ size: "20px" }}>
            <BsQuestionCircle />
          </IconContext.Provider>
        </button>
      </div>
      <div className="font-bold text-[36px] tracking-widest">PRIDLE</div>
      <div>
        <button className="pr-[10px]" onClick={props.onClickSettings}>
          <IconContext.Provider value={{ size: "20px" }}>
            <MdSettings />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
}
