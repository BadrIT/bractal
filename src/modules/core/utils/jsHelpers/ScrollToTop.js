export function scrollToContainerTop(className) {
  document.getElementsByClassName(className)[0].scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  });
}

export function scrollHtmltoTop() {
  document.getElementsByTagName('html')[0].scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  });
}

