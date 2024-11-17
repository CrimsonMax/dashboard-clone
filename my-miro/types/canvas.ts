export type Color = {
  r: number
  g: number
  b: number
}

export type Camera = {
  x: number
  y: number
}

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
}

type Coordinates = {
  x: number
  y: number
}

type Size = {
  height: number
  width: number
}

type InnerStats = {
  fill: Color
  points?: number[][]
  value?: string
}

type PointsArr = {
  points?: number[][]
}

type BoardObject = Coordinates & Size & InnerStats

type RectangleObject = {
  type: LayerType.Rectangle
}

type EllipseObject = {
  type: LayerType.Ellipse
}

type PathObject = {
  type: LayerType.Path
}

type TextObject = {
  type: LayerType.Text
}

type NoteObject = {
  type: LayerType.Note
}

export type RectangleLayer = RectangleObject & BoardObject
export type EllipseLayer = EllipseObject & BoardObject
export type PathLayer = PathObject & BoardObject
export type TextLayer = TextObject & BoardObject & PointsArr
export type NoteLayer = NoteObject & BoardObject

export type Point = Coordinates

export type XYWH = Coordinates & Size

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8
}

export type CanvasState =
  | {
    mode: CanvasMode.None
  }
  | {
    mode: CanvasMode.Pressing
    origin: Point
  }
  | {
    mode: CanvasMode.SelectionNet
    origin: Point
    current?: Point
  }
  | {
    mode: CanvasMode.Translating
    current: Point
  }
  | {
    mode: CanvasMode.Inserting
    layerType: LayerType.Rectangle | LayerType.Ellipse | LayerType.Text | LayerType.Note
  }
  | {
    mode: CanvasMode.Resizing
    initialBounds: XYWH
    corner: Side
  }
  | {
    mode: CanvasMode.Pencil
  }

export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}

export type Layer = RectangleLayer | EllipseLayer | PathLayer | TextLayer | NoteLayer