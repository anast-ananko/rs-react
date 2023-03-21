export const headerTitle = () => {
  const activePage = window.location.pathname === '/' ? 'home' : window.location.pathname.slice(1);

  switch (activePage) {
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
