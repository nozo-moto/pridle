import classNames from "classnames";
import { ImCross } from "react-icons/im";
import { IconContext } from "react-icons";
import { SetStateAction, Dispatch } from "react";

export function useModalProps(
  flag: boolean,
  setFlag: Dispatch<SetStateAction<boolean>>,
  title: string
): ModalProps {
  return {
    flag: flag,
    close: () => {
      setFlag(false);
    },
    title: title,
  };
}

export type ModalProps = {
  flag: boolean;
  close: () => void;
  title: string;
  children?: React.ReactNode;
};

export default function Modal(props: ModalProps) {
  return (
    <div
      className={classNames(
        "fixed top-0 max-w-[500px] w-full h-full outline-none overflow-x-hidden overflow-y-auto",
        props.flag ? "" : "hidden"
      )}
    >
      <div className="w-full h-full relative w-auto pointer-events-none">
        <div className="w-full h-full border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white">
          <div className="w-full h-full flex flex-shrink-0 items-center flex-col">
            <header className="w-full h-[50px] flex items-center justify-center">
              <div className="flex items-center justify-center font-bold tracking-wide my-[10px]">
                {props.title}
              </div>
              <button
                className="right-0 absolute my-[10px] mr-[10px]"
                onClick={props.close}
              >
                <ImCross />
              </button>
            </header>
            {props.children ? props.children : null}
          </div>
        </div>
      </div>
    </div>
  );
}
