import { gql } from "@gql/gql";
import { showNewTextBlock } from "@/flags";
import {
  ContentLinkWithLocale,
  InlineContentLinkWithLocale,
} from "@remkoj/optimizely-graph-client";

type TextBlockProps = {
  data: {
    center: boolean;
    headingSize: string;
    overline: string;
    heading: string;
    width?: string;
    className?: string;
    description?: {
      html: string;
    };
  };
  contentLink: ContentLinkWithLocale | InlineContentLinkWithLocale;
  inEditMode?: boolean;
};

async function TextBlock({ data, inEditMode }: TextBlockProps) {
  const {
    className = "",
    center = false,
    width = "full",
    headingSize = "medium",
    overline = "",
    heading = "",
    description = { html: "" },
  } = data;

  const additionalClasses: string[] = [];

  switch (width) {
    case "full":
      additionalClasses.push("w-full");
      break;
    case "small":
      additionalClasses.push("max-w-[400px] self-center");
      break;
    case "medium":
      additionalClasses.push("max-w-[700px] self-center");
      break;
    case "large":
      additionalClasses.push("max-w-[800px] self-center");
      break;
  }

  if (center) {
    additionalClasses.push("text-center justify-center");
  }

  if (className) {
    additionalClasses.push(className);
  }

  switch (headingSize) {
    case "small":
      additionalClasses.push(
        "prose-h2:text-[20px] prose-h2:my-[18px] prose-p:text-[20px]"
      );
      break;
    case "medium":
      additionalClasses.push(
        "prose-h2:text-[36px] lg:prose-h2:text-[48px] prose-h2:my-[24px] prose-p:text-[20px]"
      );
      break;
    case "large":
      additionalClasses.push(
        "prose-h2:text-[48px] lg:prose-h2:text-[96px] prose-h2:my-[24px] prose-p:text-[20px] prose-h3:text-[24px] prose-h3:font-semibold"
      );
      break;
    case "extraLarge":
      additionalClasses.push(
        "prose-h2:text-[96px] lg:prose-h2:text-[148px] prose-h2:my-[24px] prose-p:text-[36px] prose-p:mt-[24px] prose-p:mb-0"
      );
  }

  const showNewTextBlockFlag = await showNewTextBlock();

  return showNewTextBlockFlag ? (
    <section className={`${additionalClasses.join(" ")} flex`}>
      <div className="prose max-w-none dark:text-ghost-white flex flex-col justify-start items-start">
        {overline && (
          <span
            className="uppercase text-[12px] bg-vulcan text-white px-2 py-1 rounded-full inline-block"
            data-epi-edit={inEditMode ? "TextBlockOverline" : undefined}
            dangerouslySetInnerHTML={{ __html: overline }}
          ></span>
        )}
        {heading && (
          <h2
            className="border-b-4 border-azure"
            data-epi-edit={inEditMode ? "TextBlockHeading" : undefined}
            dangerouslySetInnerHTML={{ __html: heading }}
          ></h2>
        )}
        {description && description.html && (
          <span
            data-epi-edit={inEditMode ? "TextBlockDescription" : undefined}
            dangerouslySetInnerHTML={{ __html: description.html }}
          ></span>
        )}
      </div>
    </section>
  ) : (
    <section className={`${additionalClasses.join(" ")} flex`}>
      <div className="prose max-w-none dark:text-ghost-white">
        {overline && (
          <span
            className="uppercase text-[12px]"
            data-epi-edit={inEditMode ? "TextBlockOverline" : undefined}
            dangerouslySetInnerHTML={{ __html: overline }}
          ></span>
        )}
        {heading && (
          <h2
            data-epi-edit={inEditMode ? "TextBlockHeading" : undefined}
            dangerouslySetInnerHTML={{ __html: heading }}
          ></h2>
        )}
        {description && description.html && (
          <span
            data-epi-edit={inEditMode ? "TextBlockDescription" : undefined}
            dangerouslySetInnerHTML={{ __html: description.html }}
          ></span>
        )}
      </div>
    </section>
  );
}

TextBlock.displayName = "Text Block";
TextBlock.getDataFragment = () => ["TextBlockData", TextBlockData];
export default TextBlock;

const TextBlockData = gql(`
    fragment TextBlockData on TextBlock {
      overline: TextBlockOverline
      headingSize: TextBlockHeadingSize
      heading: TextBlockHeading
      description: TextBlockDescription {
        json
        html
      }
      center: TextCenter
      width: TextBlockWidth
      className: TextClassName
    }
  `);
