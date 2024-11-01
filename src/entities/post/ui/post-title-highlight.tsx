import { useSearchQuery } from "@/features/post/model/use-search-query";

interface PostTitleHighlightProps {
  text: string;
}

export const PostTitleHighlight = ({ text }: PostTitleHighlightProps) => {
  const { searchQuery } = useSearchQuery();
  if (text === "") {
    return null;
  }
  if (searchQuery.keyword.trim() === "") {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${searchQuery.keyword})`, "gi");
  const title = text.split(regex);
  const isRegexPassed = (part: string) => {
    return regex.test(part);
  };

  return (
    <span>
      {title.map((part, i) => {
        return isRegexPassed(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>;
      })}
    </span>
  );
};
