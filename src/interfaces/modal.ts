export interface IModal {
  onClose: () => void;
  show: boolean;
  activeCardId: number | undefined;
}
