import { AppState } from "../types";
import {
  sceneCoordsToViewportCoords,
  sceneWidthtoViewportWidth,
} from "../utils";
import { NonDeletedExcalidrawElement } from "./types";
import { getElementAbsoluteCoords } from ".";
import { useExcalidrawAppState } from "../components/App";

import "./ElementCanvasChatbot.scss";

const CONTAINER_PADDING = 5;

const getContainerCoords = (
  element: NonDeletedExcalidrawElement,
  appState: AppState,
) => {
  const [x1, y1] = getElementAbsoluteCoords(element);
  const { x: viewportX, y: viewportY } = sceneCoordsToViewportCoords(
    { sceneX: x1, sceneY: y1 + element.height },
    appState,
  );
  const x = viewportX - appState.offsetLeft;
  const y = viewportY - appState.offsetTop + 20;
  return { x, y };
};

export const ElementCanvasChatbot = ({
  children,
  element,
}: {
  children: React.ReactNode;
  element: NonDeletedExcalidrawElement;
}) => {
  const appState = useExcalidrawAppState();

  if (
    appState.contextMenu ||
    appState.draggingElement ||
    appState.resizingElement ||
    appState.isRotating ||
    appState.openMenu ||
    appState.viewModeEnabled
  ) {
    return null;
  }

  const { x, y } = getContainerCoords(element, appState);
  const width = sceneWidthtoViewportWidth(element.width, appState);

  return (
    <div
      id="chatbot-container"
      className="excalidraw-canvas-chatbot"
      style={{
        top: `${y}px`,
        left: `${x}px`,
        width,
        padding: CONTAINER_PADDING,
      }}
    >
      {children}
    </div>
  );
};
