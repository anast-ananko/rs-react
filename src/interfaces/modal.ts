export interface IModal {
  onClose: () => void;
  showModal: boolean;
  activeCardId: number | undefined;
}
