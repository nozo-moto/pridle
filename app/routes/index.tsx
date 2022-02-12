import Header, { useHeaderProps } from "~/components/header";
import Game, { useGameProps } from "~/components/game";
import { useState } from "react";
import SettingsModal from "~/components/settings_modal";
import QuestionModal from "~/components/question_modal";

export default function Index() {
  const [openQuestionFlag, setQuestionFlag] = useState<boolean>(false);
  const [openSettingsFlag, setSettingsFlag] = useState<boolean>(false);

  return (
    <div className="h-full w-full max-w-[500px] mx-auto flex flex-col">
      <Header {...useHeaderProps(setQuestionFlag, setSettingsFlag)} />
      <Game {...useGameProps()} />
      <QuestionModal flag={openQuestionFlag} setFlag={setQuestionFlag} />
      <SettingsModal flag={openSettingsFlag} setFlag={setSettingsFlag} />
    </div>
  );
}
