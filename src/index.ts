import Application from './App/Application';

declare global {
  interface Window {
    app: Application;
  }
}

window.app = new Application({
  $canvas: document.getElementById('game') as HTMLCanvasElement,
  $menu: document.getElementById('menu') as HTMLElement,
});
