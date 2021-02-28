import { ReactElement, useState } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import styled from "styled-components";

const ReactMdeWrapper = styled.div`
  .react-mde {
    border-color: #2f3336;
  }

  .mde-header {
    border-bottom: 1px solid #2f3336;
    border-radius: 2px 2px 0 0;
    background: #161c23;

    .mde-tabs {
      button {
        color: #fff;
        outline: none;
      }

      button.selected {
        border-color: #2f3336;
      }
    }

    .mde-header-group .mde-header-item button {
      color: #fff;
    }
  }

  .mde-text {
    display: block;
    width: 100%;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #fff;
    background-color: #000;
    background-clip: padding-box;
    border: 1px solid #2f3336;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    :focus {
      color: #fff;
      background-color: #000;
      border-color: #86b7fe;
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
    }
  }
`;

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function Editor({ value, onChange }: Props): ReactElement {
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");

  return (
    <ReactMdeWrapper>
      <ReactMde
        value={value}
        onChange={onChange}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </ReactMdeWrapper>
  );
}

export default Editor;
