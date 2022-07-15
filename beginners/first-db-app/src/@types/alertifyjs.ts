interface AlertifyMock {
  success: (message: string) => void;
  error: (message: string) => void;
}

declare var alertify: AlertifyMock;

export default alertify;
