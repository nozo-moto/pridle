import Modal, { ModalProps, useModalProps } from "~/components/modal";
import { ComponentProps, SetStateAction, Dispatch, forwardRef } from "react";
import { GetTileEmoji, Tile } from "~/utils/tile";

type ResultModalProps = {
  flag: boolean;
  setFlag: Dispatch<SetStateAction<boolean>>;
  won: boolean;
  setWon: Dispatch<SetStateAction<boolean>>;
  tileMatrix: Tile[][];
};

export default function ResultModal(props: ResultModalProps) {
  if (props.flag === false) {
    return <div></div>;
  }
  return (
    <Modal {...useModalProps(props.flag, props.setFlag, "RESULT")}>
      <div className="text-lg">{props.won ? "SUCCESS" : "FAILED"}</div>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <TwitterLinkTweet
            text={generateTweetText(props.won, props.tileMatrix)}
            url="https://pridle.nozomoto.me"
            hashtags={["pridle"]}
          >
            share result
          </TwitterLinkTweet>
        </button>
      </div>
    </Modal>
  );
}

const generateTweetText = (result: boolean, tileMatrix: Tile[][]): string => {
  let text = "PRIDLE\n";
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
  hashtags?: string[];
} & Omit<ComponentProps<"a">, "href" | "target" | "rel">;

export const TwitterLinkTweet = forwardRef<
  HTMLAnchorElement,
  TwitterLinkTweetProps
>(({ text, url, related, hashtags, ...intrinsicProps }, forwardedRef) => {
  const _url = new URL("https://twitter.com/intent/tweet");
  if (text !== undefined) _url.searchParams.set("text", text);
  if (url !== undefined) _url.searchParams.set("url", url);
  if (hashtags !== undefined)
    _url.searchParams.set("hashtags", hashtags.join(","));
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
