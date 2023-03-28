export const getHeaderTitle = (path: string) => {
  switch (path) {
    case '/':
      return 'Home page';
    case '/about':
      return 'About page';
    case '/form':
      return 'Form page';
    default:
      return 'Not found page';
  }
};
