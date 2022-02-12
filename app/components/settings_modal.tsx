import { SetStateAction, Dispatch } from "react";
import Modal, { ModalProps, useModalProps } from "~/components/modal";
import commit_hash from "~/commit_hash.json";
import { Link } from "remix";

type SettingsModalProps = {
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean>>;
};

export default function SettingsModal(props: SettingsModalProps) {
  return (
    <Modal {...useModalProps(props.flag, props.setFlag, "SETTINGS")}>
      <div className="flex items-center justify-center justify-between w-full h-[50px] border-b">
        <div>Feedback</div>
        <div>
          <a href="https://twitter.com/nz66zn" target="_blank">
            <p className="decoration-1">Twitter</p>
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center justify-between w-full h-[50px] border-b">
        <div>Repository</div>
        <div>
          <a href="https://github.com/nozo-moto/pridle" target="_blank">
            <p className="decoration-1">Github</p>
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center justify-between w-full h-[50px] border-b">
        <div>CommitHash</div>
        <div>
          <p className="decoration-1">{commit_hash.commit_hash}</p>
        </div>
      </div>
      <div className="flex items-center justify-center justify-between w-full h-[50px] border-b">
        <div>
          <Link to="/privacy_policy">Privacy Policy</Link>
        </div>
      </div>
    </Modal>
  );
}
