export const headerTitle = (title: string) => {
  switch (title) {
    case 'home':
      return 'Home page';
    case 'about':
      return 'About page';
    case 'form':
      return 'Form page';
    default:
      return 'Not found page';
  }
};
