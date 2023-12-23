import "./ToolIcon.scss";

import clsx from "clsx";
import { ToolButtonSize } from "./ToolButton";

const DEFAULT_SIZE: ToolButtonSize = "small";

export const ElementCanvasButtonWithText = (props: {
  title?: string;
  text: string;
  icon: JSX.Element;
  name?: string;
  checked: boolean;
  onChange?(): void;
  isMobile?: boolean;
}) => {
  return (
    <label
      className={clsx(
        "ToolIcon ToolIcon__MagicButton",
        `ToolIcon_size_${DEFAULT_SIZE}`,
        {
          "is-mobile": props.isMobile,
        },
      )}
      title={`${props.title}`}
    >
      <input
        className="ToolIcon_type_checkbox"
        type="checkbox"
        name={props.name}
        onChange={props.onChange}
        checked={props.checked}
        aria-label={props.title}
      />
      <div className="ToolIcon__icon_text">
        {props.icon}
        <div className="icon_text">{props.text}</div>
      </div>
    </label>
  );
};
