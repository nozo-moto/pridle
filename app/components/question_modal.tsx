import { SetStateAction, Dispatch } from "react";
import Modal, { ModalProps, useModalProps } from "~/components/modal";

type QuesitonModalProps = {
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean>>;
};
export default function QuestionModal(props: QuesitonModalProps) {
  return (
    <Modal {...useModalProps(props.flag, props.setFlag, "HOW TO PLAY")}>
      <div className="flex w-full flex-col border-b">
        <p>This game was inspired by Wordle.</p>
      </div>
      <div className="flex w-full flex-col border-b">
        <p>Guess the 5 digits prime number in six tries.</p>
        <p>
          Each guess must be a valid 5 digits number. Hit the enter button to
          submit.
        </p>
        <p>
          After each guess, the color of the tiles will change to show how close
          your guess was to the word.
        </p>
      </div>
      <div className="flex w-full flex-col border-b">
        <p>A new prime number will be available each day!</p>
      </div>
    </Modal>
  );
}
