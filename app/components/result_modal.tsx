import Modal, { ModalProps, useModalProps } from "~/components/modal";
import { ComponentProps, SetStateAction, Dispatch, forwardRef } from "react";
import { GetTileEmoji, Tile } from "~/utils/tile";

type ResultModalProps = {
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean>>;
  won: boolean;
  tileMatrix: Tile[][];
};

export default function ResultModal(props: ResultModalProps) {
  if (props.flag === false) {
    return <div></div>;
  }
  return (
    <Modal {...useModalProps(props.flag, props.setFlag, "RESULT")}>
      <p>{props.won ? "SUCCESS" : "FAILED"}</p>
      <TwitterLinkTweet
        text={generateTweetText(props.won, props.tileMatrix)}
        url="https://pridle.nozomoto.me"
      >
        share result
      </TwitterLinkTweet>
    </Modal>
  );
}

const generateTweetText = (result: boolean, tileMatrix: Tile[][]): string => {
  let text = "PRIDLE 5x5\n";
  tileMatrix.forEach((tileArray) => {
    tileArray.forEach((tile) => {
      text += GetTileEmoji(tile.state);
    });
    text += "\n";
  });
  return text;
};

type TwitterLinkTweetProps = {
  text?: string;
  url?: string;
  related?: string[];
  in_reply_to?: string;
} & Omit<ComponentProps<"a">, "href" | "target" | "rel">;

export const TwitterLinkTweet = forwardRef<
  HTMLAnchorElement,
  TwitterLinkTweetProps
>(({ text, url, related, in_reply_to, ...intrinsicProps }, forwardedRef) => {
  const _url = new URL("https://twitter.com/intent/tweet");
  if (text !== undefined) _url.searchParams.set("text", text);
  if (url !== undefined) _url.searchParams.set("url", url);
  return (
    <a
      ref={forwardedRef}
      href={_url.toString()}
      target="_blank"
      rel="noopener noreferrer"
      {...intrinsicProps}
    />
  );
});
